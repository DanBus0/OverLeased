// /services/contactService.ts

// Function to generate HTML email in table format
function generateHtmlEmail(data: {
  name: string;
  email: string;
  vehicle: string;
  licensePlate: string;
  state: string;
  currentMileage: string;
  annualMileage: string;
  leaseTerm: string;
  monthsRemaining: string;
  marketValue: string;
  payoffAmount: string;
  equity: string;
  dealerInterest: string;
}) {
  return `
    <h2>New Contact Request</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; width: 600px; max-width: 100%;">
      <tr><th colspan="2" style="text-align:left; background:#f2f2f2;">Contact Info</th></tr>
      <tr><td>Name</td><td>${data.name}</td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>

      <tr><th colspan="2" style="text-align:left; background:#f2f2f2;">Vehicle Info</th></tr>
      <tr><td>Vehicle</td><td>${data.vehicle}</td></tr>
      <tr><td>License Plate</td><td>${data.licensePlate}</td></tr>
      <tr><td>State</td><td>${data.state}</td></tr>

      <tr><th colspan="2" style="text-align:left; background:#f2f2f2;">Lease Details</th></tr>
      <tr><td>Current Mileage</td><td>${data.currentMileage}</td></tr>
      <tr><td>Annual Mileage Allowance</td><td>${data.annualMileage}</td></tr>
      <tr><td>Lease Term</td><td>${data.leaseTerm}</td></tr>
      <tr><td>Months Remaining</td><td>${data.monthsRemaining}</td></tr>

      <tr><th colspan="2" style="text-align:left; background:#f2f2f2;">Calculation Results</th></tr>
      <tr><td>Market Value</td><td>${data.marketValue}</td></tr>
      <tr><td>Payoff Amount</td><td>${data.payoffAmount}</td></tr>
      <tr><td>Estimated Equity</td><td>${data.equity}</td></tr>
      <tr><td>Dealer Interest</td><td>${data.dealerInterest}</td></tr>
    </table>
  `;
}

export const contactService = {
  async submitContactRequest({ name, email, message }: { name: string; email: string; message: string; }) {
    try {
      const response = await fetch("https://nbxdfscgwnpqxigocgck.supabase.co/functions/v1/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to: "dan@overleased.com",
          subject: `New Contact Request from ${name}`,
          html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Email send failed: ${error.message || response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending contact request:", error);
      throw error;
    }
  },

  // New method for lease calculation emails with HTML table format
  async submitLeaseCalculationRequest(formData: {
    name: string;
    email: string;
    vehicle: string;
    licensePlate: string;
    state: string;
    currentMileage: string;
    annualMileage: string;
    leaseTerm: string;
    monthsRemaining: string;
    marketValue: string;
    payoffAmount: string;
    equity: string;
    dealerInterest: string;
  }) {
    try {
      const emailHtml = generateHtmlEmail(formData);

      const response = await fetch("https://nbxdfscgwnpqxigocgck.supabase.co/functions/v1/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to: "dan@overleased.com",
          subject: `New Contact Request from ${formData.name}`,
          html: emailHtml
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Email send failed: ${error.message || response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending lease calculation request:", error);
      throw error;
    }
  }
};
