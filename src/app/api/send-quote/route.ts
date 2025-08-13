import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured. Form data:', formData);
      // For now, just log the data and return success
      // In production, you should configure proper email credentials
      return NextResponse.json({
        success: true,
        message: 'Quote request received (email not configured)'
      });
    }

    // Create transporter with flexible email configuration
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

    // Format pest types for display
    const formatPestTypes = (pestTypes: string[] | string) => {
      if (Array.isArray(pestTypes)) {
        return pestTypes.join(', ');
      }
      if (typeof pestTypes === 'string') {
        const pestLabels: { [key: string]: string } = {
          'ants': 'Ants',
          'cockroaches': 'Cockroaches',
          'termites': 'Termites',
          'rodents': 'Rodents (Mice/Rats)',
          'spiders': 'Spiders',
          'wasps': 'Wasps/Bees',
          'bedbugs': 'Bed Bugs',
          'fleas': 'Fleas',
          'mosquitoes': 'Mosquitoes',
          'flies': 'House Flies',
          'other': 'Other',
          'prevention': 'General Prevention'
        };
        return pestLabels[pestTypes] || pestTypes;
      }
      return 'Not specified';
    };

    const pestTypesDisplay = formData.pestTypes ? formatPestTypes(formData.pestTypes) : 
                            formData.pestType ? formatPestTypes(formData.pestType) : 'Not specified';

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">
          New Pest Control Quote Request
        </h2>
        
        <div style="background-color: #e8f5e8; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2d5a27;">
          <h3 style="color: #2d5a27; margin-top: 0; margin-bottom: 15px;">🔥 Priority Information</h3>
          ${formData.name ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${formData.name}</p>` : '<p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> <span style="color: #666;">Not provided</span></p>'}
          <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <span style="color: #2d5a27; font-weight: bold;">${formData.phone}</span></p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Service Type:</strong> <span style="color: #2d5a27; font-weight: bold;">${pestTypesDisplay}</span></p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">📍 Property Details</h3>
          <p><strong>Address:</strong> ${formData.address || formData.streetAddress || 'Not provided'}</p>
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
        subject: `🔥 URGENT: New Quote Request - ${formData.name || 'Customer'} - ${formData.phone} - ${pestTypesDisplay}`,
        html: htmlContent,
      });

      // Note: Customer confirmation email removed since email field is no longer collected

      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (emailError) {
      // If email fails, log the data and still return success for user experience
      console.log('Email failed, but logging quote request:', formData);
      console.error('Email error:', emailError);

      return NextResponse.json({
        success: true,
        message: 'Quote request received (email delivery pending)'
      });
    }
  } catch (error) {
    console.error('Email sending failed:', error);

    // Log the specific error details
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}