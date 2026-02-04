import exp from "express";

//import ProductModel
import {ProductModel} from "../models/ProductModel.js";

//create mini-server
export const productApp=exp.Router();

//get route request handle (all products)
productApp.get('/products',async(req,res)=>{
    // get all products from database
    let productsList =await ProductModel.find();

    // send response with all products
    res.status(200).json({message:"All products",payload:productsList});
})

// create product 
productApp.post('/products',async(req,res)=>{
    //get product details from req.body
    let newProduct=req.body;

    //create new Document
    let newProductDoc=new ProductModel(newProduct);

    //save it in database
    await newProductDoc.save();

    res.status(200).json({message:"Product Created"});
})