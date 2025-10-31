import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCertificateEmail(
  to: string,
  certificateId: string,
  recipientName: string,
  certificateType: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'CertiChain <noreply@certichain.app>',
      to,
      subject: `Your ${certificateType} Certificate`,
      html: `
        <div>
          <h1>Congratulations, ${recipientName}!</h1>
          <p>You have received a new certificate: <strong>${certificateType}</strong></p>
          <p>View your certificate: <a href="${process.env.NEXT_PUBLIC_APP_URL}/certificate/${certificateId}">View Certificate</a></p>
        </div>
      `,
    });
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
