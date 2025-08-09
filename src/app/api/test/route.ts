import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Test POST received:', body);
    
    return NextResponse.json({ 
      message: 'Test POST successful',
      received: body 
    });
  } catch (error) {
    console.error('Test POST error:', error);
    return NextResponse.json(
      { error: 'Test POST failed' },
      { status: 500 }
    );
  }
}