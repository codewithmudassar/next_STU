import dbConnect from "@/backend/dbConnect";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect()
    try {
        const data = await req.json()
        const newCategory = await Category.create(data)
        return NextResponse.json(
            {newCategory,
                message:"Category Created Successfully"},
            {status: 201}

        )
    } catch (error) {
        return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}


export  async function GET(req) {
    await dbConnect()
    try {
        const categories = await Category.find()
        return NextResponse.json(
            {categories},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}