import {Schema,model} from "mongoose";

//product schema
const productSchema= new Schema(
    {
        productName:{
            type:String,
            required:[true,"productName required"]
        },
        price:{
            type:Number,
            required:[true,"product price needed"]
        },
        brand:{
            type:String,
            required:[true,"product brand required"]
        }
    },
    {
    strict:"throw",
    timestamps:true,
    versionKey:false
    }
)

//export ProductModel
export const ProductModel=model('product',productSchema);