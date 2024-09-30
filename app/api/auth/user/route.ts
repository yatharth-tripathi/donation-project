// api/auth/user/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Adjust the path according to your file structure
import User from '../../../../models/User';

// The main POST function that handles user sign-up
export async function POST(request: Request) {
  try {
    // Establish a connection to the database
    await dbConnect();
    console.log('Database connected successfully for user signup.');

    // Parse JSON data from the request
    const data = await request.json();
    console.log('Request data received:', data);

    // Destructure and validate the required fields from the incoming data
    const { name, email, address, password } = data;
    if (!name || !email || !address || !password) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
    }

    // Create and save the new user
    const newUser = new User({ name, email, address, password });
    await newUser.save();

    console.log('New user created:', newUser);

    // Make sure to remove sensitive data such as the password before sending the response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    return NextResponse.json({ success: true, message: 'User created successfully', data: userResponse }, { status: 201 });
  } catch (error) {
    console.error('User Sign-Up Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
