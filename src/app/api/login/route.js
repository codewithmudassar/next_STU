import { NextResponse } from 'next/server';
import dbConnect from '@/backend/dbConnect';
import bcrypt from 'bcrypt';
import UserModel from '@/models/user';
import { GenAccessToken } from '@/helper/jwt';

export async function POST(req) {
  await dbConnect();
  const { userName, password } = await req.json();

  if (!userName || !password) {
    return NextResponse.json({ success: false, message: 'Fill all fields!' }, { status: 400 });
  }

  const user = await UserModel.findOne({ userName });
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }

  const token = await GenAccessToken({
    userName: user.userName,
    fullName: user.fullName,
    id: user._id.toString(),
    isAdmin: user.isAdmin ,
  });

  const response = NextResponse.json({ success: true, message: 'Login successful' });
  response.cookies.set('AccessToken', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
