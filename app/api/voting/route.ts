import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Vote from '../../../models/Vote';
import Charity from '../../../models/Charity';
import User from '../../../models/User';

export async function GET() {
  try {
    await dbConnect();

    
    const votes = await Vote.find({})
      .populate('charityId', 'name') 
      .populate('userId', 'email');  

    return NextResponse.json({ success: true, data: votes }, { status: 200 });
  } catch (error) {
    console.error('Fetch Votes Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();


    const { charityId, userId, vote } = data;

    if (!charityId || !userId || !vote) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    if (vote !== 'upvote' && vote !== 'downvote') {
      return NextResponse.json({ success: false, message: 'Invalid vote type' }, { status: 400 });
    }

    const charityExists = await Charity.findById(charityId);
    if (!charityExists) {
      return NextResponse.json({ success: false, message: 'Charity not found' }, { status: 404 });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

  
    const existingVote = await Vote.findOne({ charityId, userId });
    if (existingVote) {
      return NextResponse.json({ success: false, message: 'User has already voted for this charity' }, { status: 409 });
    }

    const newVote = new Vote({ charityId, userId, vote });
    await newVote.save();

    return NextResponse.json({ success: true, message: 'Vote submitted successfully', data: newVote }, { status: 201 });
  } catch (error) {
    console.error('Vote Submission Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
