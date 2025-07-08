interface LeaseCalculationData {
  make: string;
  model: string;
  year: number;
  trim?: string;
  licensePlate?: string;
  state?: string;
  zipCode?: string;
  currentMileage: number;
  annualMileageAllowance: number;
  monthsRemaining: number;
  leaseTerm: number;
}

interface OpenAILeaseAnalysis {
  estimatedMarketValue: number;
  estimatedRetailPrice?: number;
  estimatedResidualValue?: number;
  estimatedPayoffAmount: number;
  monthlyDepreciation?: number;
  remainingDepreciation?: number;
  estimatedEquity: number;
  isPositiveEquity: boolean;
  dealerInterest: "High" | "Medium" | "Low";
  nextSteps: string[];
  analysisReasoning: string;
}

interface LeaseEquityError {
  error: true;
  message: string;
  fallbackUsed?: boolean;
}

export const openaiService = {
  async calculateLeaseEquity(data: LeaseCalculationData): Promise<OpenAILeaseAnalysis | LeaseEquityError> {
    try {
      const response = await fetch('/api/calculateLeaseEquity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned a non-JSON response (likely HTML error page)');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Unexpected error from lease equity API');
      }

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('❌ Lease Equity Fetch Error:', message);

      return {
        error: true,
        message: `OpenAI API Error: ${message}`,
        fallbackUsed: true,
      };
    }
  }
};

export default openaiService;
