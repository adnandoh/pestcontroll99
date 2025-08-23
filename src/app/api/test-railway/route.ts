import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Determine which backend to test based on environment
    let backendUrl: string;
    let backendName: string;
    
    if (process.env.NEXT_PUBLIC_CRM_API_URL) {
      backendUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
      backendName = 'Custom API URL';
    } else if (process.env.NODE_ENV === 'development') {
      backendUrl = 'http://localhost:8000';
      backendName = 'Local Development Backend';
    } else {
      backendUrl = 'https://pestcontrol-backend-production.up.railway.app';
      backendName = 'Railway Production Backend';
    }
    
    console.log(`🚀 Testing ${backendName} connection: ${backendUrl}`);
    
    // Test the base URL first
    const baseResponse = await fetch(backendUrl);
    if (!baseResponse.ok) {
      throw new Error(`${backendName} not accessible: ${baseResponse.status}`);
    }
    
    console.log(`✅ ${backendName} is accessible`);
    
    // Test the inquiries endpoint
    const testInquiry = {
      name: 'Test User',
      mobile: '9876543210',
      email: 'test@example.com',
      city: 'Mumbai',
      service_interest: 'General Pest Control',
      message: 'This is a test inquiry from the frontend'
    };
    
    const inquiryResponse = await fetch(`${backendUrl}/api/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testInquiry),
    });
    
    const result = await inquiryResponse.json();
    
    return NextResponse.json({
      success: true,
      message: `${backendName} connection test completed`,
      backendName: backendName,
      backendUrl: backendUrl,
      backendStatus: 'Running',
      inquiryTest: inquiryResponse.ok ? 'Success' : 'Failed',
      response: result
    });
    
  } catch (error) {
    console.error('❌ Backend test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Backend connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
