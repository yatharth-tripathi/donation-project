import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Report from '../../../models/Report';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const newReport = await Report.create(body);
    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 400 });
  }
}
