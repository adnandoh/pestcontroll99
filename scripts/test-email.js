const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('Email User:', process.env.EMAIL_USER);
  console.log('Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials not configured in .env.local');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email - PestControl99',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify your email configuration is working correctly.</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `
    });

    console.log('✅ Test email sent successfully');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication failed. Please check:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. Enable 2-factor authentication on your Gmail account');
      console.log('3. Generate an App Password at: https://myaccount.google.com/apppasswords');
    }
  }
}

testEmail();