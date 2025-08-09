import { NextRequest, NextResponse } from 'next/server';

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

    // For now, let's just return success without sending email
    console.log('✅ Contact form validation passed - returning success');

    return NextResponse.json(
      { message: 'Contact form submitted successfully (test mode)' },
      { status: 200 }
    );
    
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