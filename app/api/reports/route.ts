import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Report from '../../../models/Report';

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch all reports
    const reports = await Report.find({});
    return NextResponse.json({ success: true, data: reports }, { status: 200 });
  } catch (error) {
    console.error('Fetch Reports Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();


    const { id, charityId, reporter, reason } = data;

    
    if (!id || !charityId || !reporter || !reason) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

  
    const timestamp = Date.now();
    const newReport = new Report({ id, charityId, reporter, reason, timestamp });
    await newReport.save();

    return NextResponse.json({ success: true, message: 'Report created successfully', data: newReport }, { status: 201 });
  } catch (error) {
    console.error('Report Creation Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
