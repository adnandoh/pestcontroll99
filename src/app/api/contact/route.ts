import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { crmApi } from '@/services/crmApi';

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API called');
  
  try {
    const body = await request.text();
    console.log('📝 Raw request body:', body);
    
    const { name, email, phone, service, message } = JSON.parse(body);
    
    console.log('📧 Contact form submission received:', { name, email, phone, service });

    // Validate required fields
    if (!name || !email || !phone || !message) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      console.log('❌ Invalid phone number');
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email address');
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Submit to CRM
    console.log('📊 Submitting to CRM...');
    const crmData = {
      name: name,
      mobile: cleanPhone,
      email: email,
      city: 'Mumbai', // Default city for contact form
      service_interest: service || 'General Inquiry',
      message: message
    };

    const crmResponse = await crmApi.submitInquiry(crmData);
    
    if (crmResponse.success) {
      console.log('✅ CRM submission successful:', crmResponse.data);
    } else {
      console.log('⚠️ CRM submission failed:', crmResponse.error);
      // Continue with email even if CRM fails
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured. Form data:', { name, email, phone, service, message });
      return NextResponse.json({
        message: 'Contact form submitted successfully (email not configured)',
        crmSuccess: crmResponse.success
      });
    }

    // Create transporter with email configuration
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

    // Format the HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">
          New Contact Form Inquiry
        </h2>
        
        <div style="background-color: #e8f5e8; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2d5a27;">
          <h3 style="color: #2d5a27; margin-top: 0; margin-bottom: 15px;">🔥 Contact Information</h3>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <span style="color: #2d5a27; font-weight: bold;">${phone}</span></p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <span style="color: #2d5a27; font-weight: bold;">${email}</span></p>
          ${service ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Service Interest:</strong> <span style="color: #2d5a27; font-weight: bold;">${service}</span></p>` : ''}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">💬 Customer Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p style="margin: 5px 0 0 0; color: #666;">CRM Status: ${crmResponse.success ? '✅ Submitted' : '❌ Failed'}</p>
        </div>
      </div>
    `;

    // Try to send email
    try {
      // Send notification email to business
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `📧 New Contact Inquiry - ${name} - ${phone} - ${service || 'General'}`,
        html: htmlContent,
      });

      console.log('✅ Contact form emails sent successfully');

      return NextResponse.json(
        { 
          message: 'Contact form submitted successfully! We will get back to you soon.',
          crmSuccess: crmResponse.success
        },
        { status: 200 }
      );
    } catch (emailError) {
      // If email fails, log the data and still return success for user experience
      console.log('Email failed, but logging contact form submission:', { name, email, phone, service, message });
      console.error('Email error:', emailError);

      return NextResponse.json({
        message: 'Contact form submitted successfully (email delivery pending)',
        crmSuccess: crmResponse.success
      });
    }
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}