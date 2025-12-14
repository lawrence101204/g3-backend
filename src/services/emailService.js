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