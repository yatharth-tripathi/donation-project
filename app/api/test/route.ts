
import { NextResponse } from 'next/server';


export async function GET() {
  
  console.log('Test route is being hit');

  try {
    
    return NextResponse.json({ success: true, message: 'Test route is working!' }, { status: 200 });
  } catch (error) {
    
    console.error('Error occurred in test route:', error);

  
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}
