import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Donation from '../../../models/Donation';

export async function GET() {
  try {
    await dbConnect();
    const donations = await Donation.find({});
    return NextResponse.json({ success: true, data: donations });
  } catch (error) {
    console.error('Error fetching all donations:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}


