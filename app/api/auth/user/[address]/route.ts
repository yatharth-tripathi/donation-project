
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
   
    await dbConnect();
    
    const { address } = params;

    const user = await User.findOne({ address });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
