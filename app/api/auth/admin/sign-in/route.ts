// api/auth/admin/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Admin from '../../../../../models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    
    await dbConnect();

    
    const { email, password } = await request.json();

    
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }


    if (admin.password !== password) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return NextResponse.json({ success: false, message: 'Internal Server Error: JWT_SECRET not defined' }, { status: 500 });
    }

    
    const token = jwt.sign({ adminId: admin._id, email: admin.email }, secret, {
      expiresIn: '1h',
    });

    
    return NextResponse.json({ success: true, message: 'Admin sign-in successful', token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Admin Sign-In Error:', error.message);
      return NextResponse.json({ success: false, message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      console.error('Admin Sign-In Error:', error);
      return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
