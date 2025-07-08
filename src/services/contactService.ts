// /services/contactService.ts
import { emailService } from './emailService';

// Function to generate HTML email in table format
function generateHtmlEmail(data: {
  name: string;
  email: string;
  vehicle: string;
  licensePlate: string;
  state: string;
  zipCode: string;
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
      <tr><td>Zip Code</td><td>${data.zipCode}</td></tr>

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

// Function to generate customer auto-reply email
function generateAutoReplyEmail(customerName: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">OverLeased</h1>
        <p style="color: #64748b; margin: 5px 0 0 0;">Your Lease Equity Experts</p>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
        <h2 style="color: #1e293b; margin-top: 0;">Thank you for contacting OverLeased!</h2>
        <p style="color: #475569; line-height: 1.6;">
          Hi ${customerName},
        </p>
        <p style="color: #475569; line-height: 1.6;">
          Thank you for submitting your lease information through our calculator. We've received your request and a team member will be in touch with you shortly to discuss your lease options.
        </p>
        <p style="color: #475569; line-height: 1.6;">
          In the meantime, if you have any urgent questions, feel free to reply to this email.
        </p>
        <p style="color: #475569; line-height: 1.6;">
          Best regards,<br>
          <strong>The OverLeased Team</strong>
        </p>
      </div>
    </div>
  `;
}

export const contactService = {
  async submitContactRequest({ name, email, message }: { name: string; email: string; message: string; }) {
    try {
      const result = await emailService.sendEmail({
        to: "dan@overleased.com",
        subject: `New Contact Request from ${name}`,
        body: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `
      });

      if (!result.success) {
        throw new Error(`Email send failed: ${result.message || 'Unknown error'}`);
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
    zipCode: string;
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

      // Send notification email to Dan
      console.log("Sending notification email to dan@overleased.com");
      const notificationResult = await emailService.sendEmail({
        to: "dan@overleased.com",
        subject: `New Contact Request from ${formData.name}`,
        body: emailHtml
      });

      if (!notificationResult.success) {
        throw new Error(`Notification email send failed: ${notificationResult.message || 'Unknown error'}`);
      }

      // Send auto-reply email to customer from support@overleased.com
      const autoReplyHtml = generateAutoReplyEmail(formData.name);
      
      console.log("Sending auto-reply email from support@overleased.com to:", formData.email);
      
      const autoReplyResult = await emailService.sendEmail({
        to: formData.email,
        subject: "Thank you for contacting OverLeased",
        body: autoReplyHtml,
        from: "support@overleased.com"
      });

      // Note: We don't throw an error if auto-reply fails, as the main notification is more important
      if (!autoReplyResult.success) {
        console.error("Auto-reply email failed to send:", autoReplyResult.message);
        console.warn("Auto-reply email failed to send, but notification was successful");
      } else {
        console.log("Auto-reply email sent successfully to customer from support@overleased.com");
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending lease calculation request:", error);
      throw error;
    }
  }
};
