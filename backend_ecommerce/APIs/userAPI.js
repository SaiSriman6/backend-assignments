import exp from "express";
import { UserModel } from "../models/UserModel.js";
import {hash,compare} from "bcryptjs"
import { ProductModel } from "../models/ProductModel.js";


export const userApp=exp.Router();

//create user
userApp.post('/users',async(req,res)=>{
    // get user credentials from req.body
    let newUser=req.body;

    await new UserModel(newUser).validate();

    //hash the password
    let hashedPassword = await hash(newUser.password,12);
    
    //replace the plain password with hashed password
    newUser.password=hashedPassword

    //create new Document
    let newUserDoc= new UserModel(newUser);

    //save it in database
    await newUserDoc.save({validateBeforeSave:false});   // if max is set to 8 after hashing it will be bigger

    //send response
    res.status(200).json({message:"user created"});
})

//read all users from database
userApp.get('/users',async(req,res)=>{

    // get all users from database
    let usersList = await UserModel.find();

    // send respnse with users data
    res.status(200).json({message:"users are",payload: usersList});
})

// adding products to user cart
userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
    
    // read uid and pid from url parameters
    let {uid,pid} = req.params;

    //check user exists
    let user=await UserModel.findById(uid);
 
    if(!user){
        return res.status(401).json({message:"user not found"});
    }
    
    //check product exists
    let product= await ProductModel.findById(pid);
    if(!product){
        return res.status(401).json({message:"product not found"});
    }


     // increment quantity if product exists in cart
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: uid, "cart.product": pid },
      { $inc: { "cart.$.quantity": 1 } },
      { new: true }
    );

    // If product is not in cart then push it
    if (!updatedUser) {
      const newUser = await UserModel.findByIdAndUpdate(
        uid,
        { $push: { cart: { product: pid, quantity: 1 } } },
        { new: true }
      );

      // send response if product is pushed to cart 
      return res.status(200).json({
        message: "Product added to cart",
        payload: newUser
      });
    }

    // send response if product quantity updated
    res.status(200).json({
      message: "Cart quantity updated",
      payload: updatedUser
    });  
    
})


//read user by id
userApp.get('/user-id/:uid',async(req,res)=>{

    // get objectId from url params
    let userId=req.params.uid;

    // find user from database using findByid
    let user= await UserModel.findById(userId).populate("cart.product","productName price");

    // if user doesn't exist send response
    if(!user){
        return res.status(200).json({message:"User not found"});
    }

    // if user exists send response
    return res.status(401).json({message:"user found",payload:user});
})

// delete user by id
userApp.delete('/user-delete/:uid',async(req,res)=>{
  //get objectId from url params
  let userId=req.params.uid;
  //find user by id and delete
  let deletedUser= await UserModel.findByIdAndDelete(userId);
  if(!deletedUser){
    return res.status(401).json({message:"user not found"});
  }
  // if user exists and deleted
  res.status(200).json({message:"User deleted",payload:deletedUser});
})