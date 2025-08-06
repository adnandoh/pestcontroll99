import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

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

    // Create transporter with better Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">
          New Pest Control Quote Request
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">Contact Information</h3>
          <p><strong>Phone:</strong> ${formData.phone}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">Property Details</h3>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Property Type:</strong> ${formData.propertyType}</p>
          <p><strong>Property Size:</strong> ${formData.propertySize}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #2d5a27; margin-top: 0;">Pest Information</h3>
          <p><strong>Pest Types:</strong> ${
            formData.pestTypes && formData.pestTypes.length > 0 
              ? formData.pestTypes.map((type: string) => {
                  const pestLabels: { [key: string]: string } = {
                    'ants': 'Ants',
                    'cockroaches': 'Cockroaches',
                    'termites': 'Termites',
                    'rodents': 'Rodents (Mice/Rats)',
                    'spiders': 'Spiders',
                    'wasps': 'Wasps/Bees',
                    'bedbugs': 'Bed Bugs',
                    'fleas': 'Fleas',
                    'other': 'Other',
                    'prevention': 'General Prevention'
                  };
                  return pestLabels[type] || type;
                }).join(', ')
              : 'Not specified'
          }</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Try to send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'martech@driveronhire.com',
        subject: `New Quote Request - ${formData.phone}`,
        html: htmlContent,
      });

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