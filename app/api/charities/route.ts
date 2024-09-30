import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Charity from '../../../models/Charity';

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const charities = await Charity.find({ isActive: true });
    return NextResponse.json({ success: true, data: charities });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const newCharity = await Charity.create(body);
    return NextResponse.json({ success: true, data: newCharity }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 400 });
  }
}
