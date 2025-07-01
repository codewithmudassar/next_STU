import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    stock:{
        type:Number,
        default:0
    },

},{timestamps:true});

const Product = mongoose?.models?.Products || mongoose?.model("Products",productSchema);

export default Product;