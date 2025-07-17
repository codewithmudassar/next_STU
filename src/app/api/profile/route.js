import dbConnect from '@/backend/dbConnect';
import { JWTVerify } from '@/helper/jwt';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.cookies.get('AccessToken')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'No token' }, { status: 401 });
    }

    const payload = await JWTVerify(token);

    // console.log('Decoded payload:', payload); // ✅ Check this in terminal

    if (!payload?.id || typeof payload.id !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid token structure' }, { status: 403 });
    }

    const user = await UserModel.findById(payload.id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: user });
  } catch (error) {
    console.error('Profile route error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}




