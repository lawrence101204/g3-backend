const nodemailer = require('nodemailer');

function isConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.MAIL_FROM &&
      process.env.MAIL_TO
  );
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function sendNewInquiryNotification(inquiry) {
  if (!isConfigured()) return { skipped: true };

  const transporter = createTransport();
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `New inquiry #${inquiry.id} from ${inquiry.name}`,
    text: `New inquiry received:
ID: ${inquiry.id}
Name: ${inquiry.name}
Email: ${inquiry.email}
Status: ${inquiry.status}

Message:
${inquiry.message}
`,
  });

  return { skipped: false };
}

module.exports = { sendNewInquiryNotification, isConfigured };
