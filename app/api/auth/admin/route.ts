import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Adjust the path according to your file structure
import Admin from '../../../../models/Admin';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: data.email });
    if (existingAdmin) {
      return NextResponse.json({ success: false, message: 'Admin already exists' }, { status: 409 });
    }
    
    // Create new admin
    const newAdmin = new Admin(data);
    await newAdmin.save();

    return NextResponse.json({ success: true, message: 'Admin created successfully', data: newAdmin }, { status: 201 });
  } catch (error) {
    console.error('Admin Sign-Up Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }, { status: 500 });
  }
}
