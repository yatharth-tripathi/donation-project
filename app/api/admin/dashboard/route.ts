import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Charity from '../../../../models/Charity';
import Donation from '../../../../models/Donation';

export async function GET() {
  try {
    await dbConnect();
    const charityCount = await Charity.countDocuments({});
    const donationTotal = await Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    return NextResponse.json({ success: true, data: { charityCount, totalDonations: donationTotal[0]?.total || 0 } });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
