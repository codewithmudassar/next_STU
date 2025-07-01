import Product from "@/models/product";
import dbConnect from "@/backend/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const data = await req.json();
        await dbConnect();
        const product = await Product.create(data);
        return NextResponse.json(       
            {product, message: "Product Created Successfully"},
            {status: 201}
        ); 
        
    } catch (error) {
        if(error.code === 11000) {
            return NextResponse.json(
                {error:"Product with this title already exists"},
                {status: 400}
            )
        }
        return NextResponse.json(
            {error:error},
            {Status:500}
        )
    }
    
}