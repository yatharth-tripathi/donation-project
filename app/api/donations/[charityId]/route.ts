import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Donation from '../../../../models/Donation';

export async function GET(request: Request, { params }: { params: { charityId: string } }) {
  try {
    await dbConnect();
    const { charityId } = params;
    const donations = await Donation.find({ charityId });
    return NextResponse.json({ success: true, data: donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { charityId: string } }) {
  try {
    await dbConnect();
    const { charityId } = params;
    const data = await request.json();
    const newDonation = new Donation({ ...data, charityId });
    await newDonation.save();
    return NextResponse.json({ success: true, data: newDonation }, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
