import { NextResponse } from 'next/server';
import dbConnect from '@/backend/dbConnect';
import bcrypt from 'bcrypt';
import UserModel from '@/models/user';

export async function POST(req) {
  await dbConnect();
  const { fullName, userName, password } = await req.json();

  if (!fullName || !userName || !password) {
    return NextResponse.json({ success: false, message: 'Fill all fields!' }, { status: 400 });
  }

  const existing = await UserModel.findOne({ userName });
  if (existing) {
    return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    fullName,
    userName,
    password: hashedPassword,
  });

  return NextResponse.json({ success: true, message: 'User registered', user: newUser }, { status: 201 });
}
