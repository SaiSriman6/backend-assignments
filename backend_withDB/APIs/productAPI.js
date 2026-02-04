// Import express 
import exp from "express";
// Import ProductModel
import {ProductModel} from  "../models/productModel.js"

// creating productApp an Express Router(mini application) to handle product-related Apis
export const productApp=exp.Router();

// GET route handler to get all products from the database
productApp.get('/products',async(req,res)=>{
    //get all products from database 
    let productList= await ProductModel.find();

    //sending response with products details
    res.status(200).json({message:"All products",payload:productList});
})

// POST route handler to add a new product
productApp.post('/products',async(req,res)=>{
    //get new Product from request body
    let newProduct=req.body;

    //create new Document
    let newProductDoc=new ProductModel(newProduct);

    //save it in database
     await newProductDoc.save();

    // Send confirmation response
     res.json({message:"product created"});
})

// GET route handler to get a single product by ObjectId
productApp.get('/products/:id',async(req,res)=>{
    //get product Id from req params
    let objId=req.params.id;

    //find product in database
    let productObj=await ProductModel.findById(objId);
    
    //sending response with productObject
    res.json({message:"product is",payload:productObj});

})

// PUT route handler to update an existing Product by ObjectId
productApp.put('/products/:id',async(req,res)=>{
    //get objectId from url params
    let objId=req.params.id;

    //get modified product from request body
    let modifiedObject=req.body;

    //make update
    let latestProduct= await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedObject}},{new:true,runValidators:true});
    
    //if productDocument not found
    if(!latestProduct){
        return res.json({message:"product not found"});
    }

    //send success confirmation
    res.status(200).json({message:"Product Updated",payload:latestProduct});
})
