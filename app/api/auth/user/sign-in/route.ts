import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    
    await dbConnect();
    
  
    const { email, password } = await request.json();

   
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

 
    if (user.password !== password) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return NextResponse.json({ success: false, message: 'Internal Server Error: JWT_SECRET not defined' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
      expiresIn: '1h',
    });

   
    return NextResponse.json({ success: true, message: 'Sign-in successful', token }, { status: 200 });
  } catch (error) {
    
    if (error instanceof Error) {
      console.error('User Sign-In Error:', error.message);
      return NextResponse.json({ success: false, message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      console.error('User Sign-In Error:', error);
      return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
