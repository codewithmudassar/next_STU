import Product from "@/models/product";
import dbConnect from "@/backend/dbConnect";
import { NextResponse } from "next/server";
import Category from "@/models/category";


export async function POST(req) {
    try {
        const data = await req.json();
        await dbConnect();
        const product = await Product.create(data);
        return NextResponse.json(       
            {product, message: "Product Created Successfully", success: true},
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

export async function GET(req) {
<<<<<<< Updated upstream
  await dbConnect();
  try {
    const product = await Product.find().populate("category");
    return NextResponse.json(
      {
        products: product,
        message: "Products fetched successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error.message,
        success: false,
      },
      { status: 500 } // ✅ lowercase 'status'
    );
  }
}
=======
    await dbConnect();
    try {
        const products = await Product.find().populate('category');
        return NextResponse.json(
            { products },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
>>>>>>> Stashed changes
