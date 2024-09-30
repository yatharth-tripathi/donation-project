import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Donation from '../../../../models/Donation';

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();
  const { charityId } = params;

  try {
    const donations = await Donation.find({ charityId });
    return NextResponse.json({ success: true, data: donations });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}
