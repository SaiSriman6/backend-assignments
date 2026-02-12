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

// get product by id
productApp.get('/products/:id',async(req,res)=>{
    //get objId for url params
    let pId=req.params.id;
    //get product from database
    let product=await ProductModel.findById(pId);
    // if product not found
    if(!product){
        return res.status(401).json({message:"Product not found"});
    }
    res.status(200).json({message:"product found",payload:product});
})

//delete productby id
productApp.delete('/products/:id',async(req,res)=>{
    //get objId from url params
    let pId=req.params.id;
    // delete product
    let deletedProduct=await ProductModel.findByIdAndDelete(pId);
    //if product not found
    if(!deletedProduct){
        return res.status(401).json({message:"product not found"});
    }
    res.status(200).json({message:"product deleted",payload:deletedProduct});
})

//get products by brand
productApp.get('/product-brand/:brand',async(req,res)=>{
    //get brand from url params
    let brand=req.params.brand;
    //get all products of that brand from database
    let productsList=await ProductModel.find({brand:brand});
    // if no products of that brand found
    if(!productsList){
        return res.status(401).json({message:"products not found"});
    }
    res.status(200).json({message:"products found",payload:productsList});
})