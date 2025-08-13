import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('🚀 Home Quote API called');
  
  try {
    const body = await request.text();
    console.log('📝 Raw request body:', body);
    
    const { pestTypes, phone, streetAddress, name } = JSON.parse(body);
    
    console.log('📧 Home quote form submission received:', { 
      pestTypes, 
      phone, 
      streetAddress, 
      name 
    });

    // Validate required fields
    if (!pestTypes || pestTypes.length === 0 || !phone || !streetAddress) {
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



    // Format pest types for email
    const pestTypesText = pestTypes.join(', ');

    // Create email content
    const emailContent = `
🔥 NEW HOME QUOTE REQUEST - PRIORITY

PRIORITY INFORMATION:
• Name: ${name || 'Not provided'}
• Phone: ${phone}
• Service Type: ${pestTypesText}

PROPERTY DETAILS:
• Street Address: ${streetAddress}

SUBMISSION TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

⚡ ACTION REQUIRED: Contact customer within 2 hours for quote.
    `.trim();

    console.log('📧 Email content prepared:', emailContent);

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured. Form data:', { 
        pestTypes, phone, streetAddress, name 
      });
      // For now, just log the data and return success
      return NextResponse.json({
        message: 'Quote request received (email not configured)'
      });
    }

    // Create transporter with email configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
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
          New Home Quote Request
        </h2>
        
        <div style="background-color: #e8f5e8; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2d5a27;">
          <h3 style="color: #2d5a27; margin-top: 0; margin-bottom: 15px;">🔥 Priority Information</h3>
          ${name ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>` : '<p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> <span style="color: #666;">Not provided</span></p>'}
          <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <span style="color: #2d5a27; font-weight: bold;">${phone}</span></p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Service Type:</strong> <span style="color: #2d5a27; font-weight: bold;">${pestTypesText}</span></p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">📍 Property Details</h3>
          <p><strong>Street Address:</strong> ${streetAddress}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    `;

    // Try to send email
    try {
      // Send notification email to business
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your own email
        subject: `🔥 URGENT: New Quote Request - ${name || 'Customer'} - ${phone} - ${pestTypesText}`,
        html: htmlContent,
      });

      // Note: Customer confirmation email removed since email field is no longer collected

      console.log('✅ Home quote emails sent successfully');

      return NextResponse.json(
        { 
          message: 'Quote request submitted successfully! We will contact you soon.',
          data: {
            pestTypes: pestTypesText,
            phone,
            streetAddress,
            name: name || 'Not provided'
          }
        },
        { status: 200 }
      );
    } catch (emailError) {
      // If email fails, log the data and still return success for user experience
      console.log('Email failed, but logging home quote request:', { 
        pestTypes, phone, streetAddress, name 
      });
      console.error('Email error:', emailError);

      return NextResponse.json({
        message: 'Quote request received (email delivery pending)'
      });
    }
    
  } catch (error) {
    console.error('❌ Home quote form error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    );
  }
}