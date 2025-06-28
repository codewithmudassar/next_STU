import dbConnect from "@/backend/dbConnect";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    await dbConnect()
try {
    const {id} = params
    if(!id){
        return NextResponse.json(
            {error:"Category ID is required"},
            {status: 400}
        )
    }
    const category = await Category.findById(id)
    return NextResponse.json(
        {category},
        {status: 200}
    )
} catch (error) {
        return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
}
export async function DELETE(req,{params}) {
    await dbConnect()
try {
    const {id} = params
    const category = await Category.findByIdAndDelete(id)
    return NextResponse.json(
        {category},
        {status: 200}
    )
} catch (error) {
        return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
}

    
