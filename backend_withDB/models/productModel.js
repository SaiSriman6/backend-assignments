// Import Schema and model
import { Schema,model } from 'mongoose';

// Defining schema structure and validation rules for Product documents
const productSchema=new Schema({
    // Unique product identifier (pid)
    pid:{
        type:Number,
        required:[true,"product id required"]
    },
    // Name of the product (productName)
    productName:{
        type:String,
        required:[true,"productName is required"]
    },
    // Price of the product(price)
    price:{
        type:Number,
        required:[true,"price must be mentioned"]
    }
},
{
    // throws error if unknown fields are sent
    strict:"throw",
    // adds createdAt and updatedAt fields
    timestamps:true
})

// Creating and export ProductModel based on the schema
export const ProductModel=model('product',productSchema);