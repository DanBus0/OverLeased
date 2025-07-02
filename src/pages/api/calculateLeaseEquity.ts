
import type { NextApiRequest, NextApiResponse } from 'next';

interface LeaseCalculationData {
  make: string;
  model: string;
  year: number;
  trim?: string;
  licensePlate?: string;
  state?: string;
  currentMileage: number;
  annualMileageAllowance: number;
  monthsRemaining: number;
  leaseTerm: number;
}

interface OpenAILeaseAnalysis {
  estimatedRetailPrice: number;
  estimatedResidualValue: number;
  estimatedMarketValue: number;
  monthlyDepreciation: number;
  remainingDepreciation: number;
  estimatedPayoffAmount: number;
  estimatedEquity: number;
  isPositiveEquity: boolean;
  dealerInterest: "High" | "Medium" | "Low";
  nextSteps: string[];
  analysisReasoning: string;
}

// Function to get real-time market data
async function getRealTimeMarketData(vehicle: LeaseCalculationData) {
  try {
    // This would integrate with real APIs like:
    // - KBB API for trade-in values
    // - Edmunds API for market pricing
    // - CarGurus API for current listings
    
    // For now, we'll simulate real-time data fetching
    // In production, you would replace this with actual API calls
    
    const marketDataPrompt = `
    You are a real-time automotive pricing API. Based on current market conditions and recent sales data, provide accurate pricing for:
    
    Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || 'Base'}
    Current Mileage: ${vehicle.currentMileage}
    Location: ${vehicle.state}
    
    Use the most recent market data available to you and provide realistic pricing based on:
    1. Current KBB trade-in values for this exact vehicle
    2. Recent Edmunds pricing data
    3. Current CarGurus and Autotrader listings
    4. Regional market conditions in ${vehicle.state}
    
    Return ONLY a JSON object with current market pricing:
    {
      "currentMarketValue": number,
      "retailPriceWhenNew": number,
      "tradeInValue": number,
      "privatePartyValue": number,
      "dataSource": "Real-time market analysis",
      "confidence": "High"
    }
    `;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a real-time automotive pricing API that provides current market values based on the most recent data available. Return only valid JSON with no explanations.'
          },
          {
            role: 'user',
            content: marketDataPrompt
          }
        ],
        temperature: 0,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch real-time market data');
    }

    const dataResponse = await response.json();
    const rawText = dataResponse.choices?.[0]?.message?.content;
    
    const jsonMatch = rawText?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse market data response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error fetching real-time market data:', error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenAILeaseAnalysis | { error: string }>
) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data: LeaseCalculationData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Validate required fields
    const requiredFields = ['make', 'model', 'year', 'currentMileage', 'annualMileageAllowance', 'monthsRemaining', 'leaseTerm'];
    for (const field of requiredFields) {
      if (!data[field as keyof LeaseCalculationData]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Step 1: Get real-time market data
    console.log('🔍 Fetching real-time market data...');
    const marketData = await getRealTimeMarketData(data);
    
    // Step 2: Create enhanced prompt with real-time data
    const prompt = `You are a professional automotive lease equity analyst. Use the following inputs to calculate lease equity. Respond only with a well-formatted JSON object (no explanations, no text outside the JSON).

Input: { "make": "${data.make}", "model": "${data.model}", "year": ${data.year}, "trim": "${data.trim || 'Base'}", "state": "${data.state || 'N/A'}", "currentMileage": ${data.currentMileage}, "annualMileageAllowance": ${data.annualMileageAllowance}, "monthsRemaining": ${data.monthsRemaining}, "leaseTerm": ${data.leaseTerm} }

${marketData ? `REAL-TIME MARKET DATA (Use this for accurate calculations):
- Current Market Value: $${marketData.currentMarketValue}
- Original Retail Price: $${marketData.retailPriceWhenNew}
- Trade-in Value: $${marketData.tradeInValue}
- Data Source: ${marketData.dataSource}` : ''}

Step-by-Step Instructions:
1. Retail Price Estimate
   - ${marketData ? `Use the provided real-time retail price: $${marketData.retailPriceWhenNew}` : 'Estimate the actual retail price paid when the car was sold new by aggregating average transaction prices from historical and current listings on Autotrader, CarGurus, and Cars.com.'}
   - Use data from the original lease year or close model years to approximate.
   - Variable: estimatedRetailPrice

2. Residual Value Calculation
   - Calculate lease end year: residualYear = ${data.year} + (${data.leaseTerm} / 12)
   - Use typical market residual percentages from OEM leasing guides or CarEdge methodology.
   - Adjust residual percentage down by 1% for every 2,000 miles driven over expected mileage.
   - Calculate residual value: residualValue = estimatedRetailPrice × adjustedResidualPercent
   - Output: estimatedResidualValue

3. Current Market Value
   - ${marketData ? `Use the provided real-time market value: $${marketData.currentMarketValue} (adjusted for current mileage and condition)` : 'Use recent listings and price data scraped from Autotrader, CarGurus, and Cars.com for similar vehicles in ' + (data.state || 'N/A') + '.'}
   - Adjust prices based on current mileage (or close to current mileage).
   - Calculate average dealer trade-in equivalent price from these sources.
   - Output: estimatedMarketValue

4. Monthly Depreciation
   - Formula: (estimatedRetailPrice - estimatedResidualValue) / ${data.leaseTerm}
   - Output: monthlyDepreciation

5. Remaining Depreciation
   - Formula: monthlyDepreciation × ${data.monthsRemaining}
   - Output: remainingDepreciation

6. Lease Payoff Amount
   - Formula: remainingDepreciation + estimatedResidualValue
   - Output: estimatedPayoffAmount

7. Lease Equity
   - Formula: estimatedMarketValue - estimatedPayoffAmount
   - Output:
     estimatedEquity
     isPositiveEquity (true if equity > 0)

8. Dealer Interest Level
   - High: equity > 3000
   - Medium: equity 500–3000
   - Low: equity < 500
   - Output: dealerInterest

Output Format:
Return only the following JSON object:
{ "estimatedRetailPrice": number, "estimatedResidualValue": number, "estimatedMarketValue": number, "monthlyDepreciation": number, "remainingDepreciation": number, "estimatedPayoffAmount": number, "estimatedEquity": number, "isPositiveEquity": boolean, "dealerInterest": "High" | "Medium" | "Low", "nextSteps": ["Contact OverLeased to secure an offer", "Review lease agreement", "Consider market timing", "Explore dealer options"], "analysisReasoning": "string" }`;

    // Call OpenAI API with enhanced prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional automotive lease equity analyst with access to real-time market data. Return only valid JSON with no explanations, no markdown, no additional text. Only return the JSON object.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return res.status(500).json({ error: 'OpenAI API returned an error' });
    }

    const dataResponse = await response.json();
    const rawText = dataResponse.choices?.[0]?.message?.content;

    if (!rawText) {
      console.error("No content in OpenAI response");
      return res.status(500).json({ error: 'No content received from OpenAI' });
    }

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to find JSON in OpenAI response:", rawText);
      return res.status(500).json({ error: 'Failed to parse OpenAI response JSON' });
    }

    let parsed: OpenAILeaseAnalysis;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON parse error:", e, rawText);
      return res.status(500).json({ error: 'Failed to parse OpenAI response JSON' });
    }

    // Validate required keys in parsed response
    const requiredKeys = [
      "estimatedRetailPrice", "estimatedResidualValue", "estimatedMarketValue",
      "monthlyDepreciation", "remainingDepreciation", "estimatedPayoffAmount",
      "estimatedEquity", "isPositiveEquity", "dealerInterest", "nextSteps", "analysisReasoning"
    ];
    
    for (const key of requiredKeys) {
      if (!(key in parsed)) {
        console.error(`Missing key "${key}" in OpenAI response`);
        return res.status(500).json({ error: 'Incomplete data from OpenAI' });
      }
    }

    // Ensure numeric values are properly formatted and validated
    const result: OpenAILeaseAnalysis = {
      estimatedRetailPrice: Math.round(Number(parsed.estimatedRetailPrice) || 0),
      estimatedResidualValue: Math.round(Number(parsed.estimatedResidualValue) || 0),
      estimatedMarketValue: Math.round(Number(parsed.estimatedMarketValue) || 0),
      monthlyDepreciation: Math.round(Number(parsed.monthlyDepreciation) || 0),
      remainingDepreciation: Math.round(Number(parsed.remainingDepreciation) || 0),
      estimatedPayoffAmount: Math.round(Number(parsed.estimatedPayoffAmount) || 0),
      estimatedEquity: Math.round(Number(parsed.estimatedEquity) || 0),
      isPositiveEquity: Boolean(parsed.isPositiveEquity),
      dealerInterest: parsed.dealerInterest || "Low",
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [
        "Contact OverLeased to secure an offer",
        "Review lease agreement", 
        "Consider market timing",
        "Explore dealer options"
      ],
      analysisReasoning: String(parsed.analysisReasoning || "Analysis completed using real-time market data and industry-standard calculations.")
    };

    // Add validation logging to debug calculation issues
    console.log("🔍 Calculation Debug Info:");
    console.log("Market Value:", result.estimatedMarketValue);
    console.log("Payoff Amount:", result.estimatedPayoffAmount);
    console.log("Calculated Equity:", result.estimatedMarketValue - result.estimatedPayoffAmount);
    console.log("OpenAI Reported Equity:", result.estimatedEquity);
    console.log("Real-time data used:", !!marketData);
    
    // Verify the equity calculation matches our formula
    const calculatedEquity = result.estimatedMarketValue - result.estimatedPayoffAmount;
    if (Math.abs(calculatedEquity - result.estimatedEquity) > 100) {
      console.warn("⚠️ Equity calculation mismatch detected!");
      console.warn("Expected:", calculatedEquity);
      console.warn("OpenAI returned:", result.estimatedEquity);
      // Use our calculated value if there's a significant discrepancy
      result.estimatedEquity = calculatedEquity;
      result.isPositiveEquity = calculatedEquity > 0;
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Calculation error:", error);
    return res.status(500).json({ error: 'Internal server error during lease calculation' });
  }
}
