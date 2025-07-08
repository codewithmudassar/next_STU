import Product from "@/models/product";
import dbConnect from "@/backend/dbConnect";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}) {
    await dbConnect()
    try {
        const {id}=  params
        const ProductDelete = await Product.findByIdAndDelete(id)
    return NextResponse.json(
        {ProductDelete},
        {status: 200}
    )
    } catch (error) {
          return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}
export async function GET(req,{params}) {
    await dbConnect()
    try {
        const {id}=  params
        const Products = await Product.findById(id)
    return NextResponse.json(
        {Products},
        {status: 200}
    )
    } catch (error) {
          return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}
export async function PUT(req,{params}) {
    await dbConnect()
    try {
        const {id}= await  params
        const data = await req.json()
        const ProductUpdate = await Product.findByIdAndUpdate(id,data,{new:true})
    return NextResponse.json(
        {ProductUpdate,success:true},
        {status: 200}
    )
    } catch (error) {
          return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}



