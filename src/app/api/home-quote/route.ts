import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { crmApi } from '@/services/crmApi';

export async function POST(request: NextRequest) {
  console.log('🚀 Home Quote API called');
  
  try {
    const body = await request.text();
    console.log('📝 Raw request body:', body);
    
    const formData = JSON.parse(body);
    const { pestTypes, phone, streetAddress, name, premiseType, premiseSize, serviceType, estimatedPrice } = formData;

    // Resolve service_frequency the same way crmApi does
    const oneTimeOnlyPests = ['rodent', 'bedbugs', 'termite', 'mosquito'];
    const forcedOneTime = pestTypes?.some((p: string) => oneTimeOnlyPests.includes(p));
    const serviceFrequency: string = forcedOneTime ? 'one-time' : (serviceType || 'one-time');
    const serviceFrequencyLabel = serviceFrequency === 'amc' ? 'AMC 3 SERVICES' : 'ONE-TIME SERVICE';
    
    console.log('📧 Home quote form submission received:', { 
      pestTypes, 
      phone, 
      streetAddress, 
      name,
      premiseType,
      premiseSize,
      serviceType,
      serviceFrequency,
      estimatedPrice
    });

    // Validate required fields (street address optional)
    if (!pestTypes || pestTypes.length === 0 || !phone) {
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

    // --- CRM API INTEGRATION ---
    try {
      console.log('📤 Submitting to CRM API...');
      const inquiryData = crmApi.mapFormDataToInquiry(formData, 'home');
      console.log('📋 CRM payload service_frequency:', inquiryData.service_frequency);
      const crmResult = await crmApi.submitInquiry(inquiryData);
      
      if (crmResult.success) {
        console.log('✅ CRM submission successful, ID:', crmResult.data?.id, '| service_frequency:', inquiryData.service_frequency);
      } else {
        console.warn('⚠️ CRM submission failed (will continue with email):', crmResult.error);
      }
    } catch (crmError) {
      console.error('❌ CRM API Critical Error:', crmError);
      // We continue even if CRM fails, to ensure email is sent
    }

    // Format pest types for email
    const pestTypesText = pestTypes.join(', ');

    // Format the HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #00C950; border-bottom: 2px solid #00C950; padding-bottom: 10px;">
          🔥 New Home Quote Request
        </h2>
        
        <div style="background-color: #f0fdf4; padding: 20px; margin: 20px 0; border-radius: 12px; border-left: 5px solid #00C950;">
          <h3 style="color: #00C950; margin-top: 0; margin-bottom: 15px;">👤 Customer Details</h3>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #00C950; font-weight: bold; text-decoration: none;">${phone}</a></p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>Pests:</strong> ${pestTypesText}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 12px; border: 1px solid #e5e7eb;">
          <h3 style="color: #4b5563; margin-top: 0;">🏠 Property & Quote Info</h3>
          <p><strong>Premise Type:</strong> <span style="text-transform: uppercase; font-weight: bold;">${premiseType || 'Residential'}</span></p>
          <p><strong>Premise Size:</strong> <span style="text-transform: uppercase; font-weight: bold;">${premiseSize || 'N/A'}</span></p>
          <p><strong>Service Frequency:</strong> <span style="text-transform: uppercase; font-weight: bold; color: #00C950;">${serviceFrequencyLabel}</span></p>
          <p><strong>Street Address:</strong> ${streetAddress}</p>
          <div style="margin-top: 15px; padding: 10px; background-color: #fff; border-radius: 8px; border: 1px dashed #00C950;">
            <p style="margin: 0; font-size: 18px;"><strong>Estimated Price:</strong> <span style="color: #00C950; font-weight: 800;">${estimatedPrice > 0 ? `₹${estimatedPrice}` : 'INSPECTION REQUIRED'}</span></p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0;">Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p>Sent via PestControl99 Website</p>
        </div>
      </div>
    `;

    // Try to send email
    try {
      // Create transporter (Matching Zoho configuration in contact route)
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.zoho.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Send notification email to business
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your own email
        subject: `🔥 URGENT: New Quote Request - ${name || 'Customer'} - ${phone} - ${pestTypesText}`,
        html: htmlContent,
      });

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
    
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    );
  }
}