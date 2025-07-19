
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, phone, message, _gotcha, package: selectedPackage } = req.body;

  // Honeypot field for spam prevention
  if (_gotcha) {
    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  }

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Please fill all required fields.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT || '587', 10),
    secure: (process.env.MAILER_PORT || '587') === '465', // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  const mailOptions = {
    from: `"appli Website" <${process.env.MAILER_USER}>`,
    to: 'info@appli.co.il',
    subject: `פנייה חדשה מאתר appli - ${name}`,
    html: `
      <h2>פנייה חדשה התקבלה מאתר appli</h2>
      <p><strong>שם:</strong> ${name}</p>
      <p><strong>אימייל:</strong> ${email}</p>
      <p><strong>טלפון:</strong> ${phone}</p>
      ${selectedPackage ? `<p><strong>חבילה שנבחרה:</strong> ${selectedPackage}</p>` : ''}
      <h3>הודעה:</h3>
      <p>${message ? message.replace(/\n/g, '<br>') : 'אין הודעה'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
