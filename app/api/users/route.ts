import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    console.log("Attempting to connect to the database...");
    await dbConnect();
    console.log("Database connected successfully.");

    
    const { address, name, email } = await request.json();
    console.log("Received sign-up data:", { address, name, email });


    if (!address || !name || !email) {
      console.error("Validation error: All fields are required.");
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }


    const existingUser = await User.findOne({ address });
    if (existingUser) {
      console.error(`User with address ${address} already exists.`);
      return NextResponse.json({ success: false, error: 'User already exists with this address' }, { status: 400 });
    }

    
    const newUser = new User({
      address,
      name,
      email,
    });

  
    await newUser.save();
    console.log("New user created successfully:", newUser);
    
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("An error occurred during sign-up:", error.message || error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
