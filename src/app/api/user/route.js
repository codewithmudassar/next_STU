import UserModel from "@/models/user";
import dbConnect from "@/backend/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const isAdmin = searchParams.get("isAdmin");
  const search = searchParams.get("search");

  const filter = {};

  // ✅ Optional isAdmin filter
  if (isAdmin === "true") {
    filter.isAdmin = true;
  } else if (isAdmin === "false") {
    filter.isAdmin = false;
  }

  // ✅ Optional search filter
  if (search) {
    filter.$or = [
      { userName: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  try {
    const total = await UserModel.countDocuments(filter);
    const users = await UserModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional sort

    return NextResponse.json(
      {
        success: true,
        users,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
