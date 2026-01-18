import nodemailer from 'nodemailer';

export async function sendEmailVerification(receiverEmail: string, otpCode: string) {
  const config = useRuntimeConfig();
  const mailConfig = config.nodemailer;

  // --- DEBUG START ---
  // Look at your VS Code terminal (not the browser) to see this output
  console.log('--- Mail Debugger ---');
  console.log('Host:', mailConfig.host);
  console.log('Port:', mailConfig.port);
  console.log('Secure:', false);
  console.log('User:', mailConfig.auth.user);
  console.log('Pass:', mailConfig.auth.pass ? 'FOUND (Hidden)' : 'NOT FOUND');
  // --- DEBUG END ---

  if (!mailConfig.auth.user || !mailConfig.auth.pass) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error: Email credentials are not configured in .env",
    });
  }

  const transporter = nodemailer.createTransport({
    from: mailConfig.mailFrom,
    host: mailConfig.host,
    port: Number(mailConfig.port),
    secure: false, // Use false for Mailtrap (port 2525)
    auth: {
      user: mailConfig.auth.user,
      pass: mailConfig.auth.pass,
    },
    debug: true, // Enable debug logging
    logger: true, // Enable logger
  });

  // Test the connection
  try {
    await transporter.verify();
    console.log('✅ Mail server connection successful');
  } catch (verifyError: any) {
    console.error('❌ Mail server connection failed:', verifyError.message);
    throw createError({
      statusCode: 500,
      statusMessage: `Mail Connection Error: ${verifyError.message}`,
    });
  }

  try {
    await transporter.sendMail({
      from: config.mailFrom,
      to: receiverEmail,
      subject: 'Email Verification',
      text: `Your OTP code is ${otpCode}`,
      html: `<b>Your OTP code is ${otpCode}</b>`
    });
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Mail Error: ${error.message}`,
    });
  }
}