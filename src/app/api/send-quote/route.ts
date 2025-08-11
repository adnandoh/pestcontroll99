import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.phone || !formData.address || !formData.propertyType || !formData.propertySize) {
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
          <p><strong>Pest Type:</strong> ${
            formData.pestType ? (() => {
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
              return pestLabels[formData.pestType] || formData.pestType;
            })() : 'Not specified'
          }</p>
          ${formData.additionalDetails ? `<p><strong>Additional Details:</strong> ${formData.additionalDetails}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Try to send email
    try {
      // Send notification email to business
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your own email
        subject: `New Quote Request - ${formData.phone}`,
        html: htmlContent,
      });

      // Send confirmation email to customer (if they provided email)
      if (formData.email) {
        const customerConfirmation = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">Thank You for Your Quote Request!</h2>
            <p>Dear Customer,</p>
            <p>We have received your pest control quote request and our team will contact you within 24 hours.</p>
            <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <h3>Your Request Details:</h3>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Address:</strong> ${formData.address}</p>
              <p><strong>Property Type:</strong> ${formData.propertyType}</p>
              <p><strong>Property Size:</strong> ${formData.propertySize}</p>
              ${formData.pestType ? `<p><strong>Pest Type:</strong> ${formData.pestType}</p>` : ''}
              ${formData.additionalDetails ? `<p><strong>Additional Details:</strong> ${formData.additionalDetails}</p>` : ''}
            </div>
            <p>Best regards,<br>PestControl99 Team</p>
            <p style="color: #666; font-size: 12px;">Contact us: +91 95949 66921 | info@pestcontrol99.com</p>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: formData.email,
          subject: 'Quote Request Confirmation - PestControl99',
          html: customerConfirmation,
        });
      }

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