import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Charity from '../../../models/Charity';

export async function GET() {
  try {
    await dbConnect();
    const charities = await Charity.find({});
    return NextResponse.json({ success: true, data: charities });
  } catch (error) {
    console.error('Error fetching charities:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const newCharity = new Charity(data);
    await newCharity.save();
    return NextResponse.json({ success: true, data: newCharity }, { status: 201 });
  } catch (error) {
    console.error('Error creating charity:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
