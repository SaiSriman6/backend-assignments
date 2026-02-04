// Import express
import exp from "express"
// Import UserModel
import {UserModel} from "../models/userModel.js";

import {hash,compare} from "bcryptjs"

import jwt from "jsonwebtoken";

import {verifyToken} from "../middlewares/verifyToken.js"

// creating userApp an Express Router(mini application) to handle user related Api's
export const userApp=exp.Router();

// GET route handler to get all users from Database
userApp.get('/users',async(req,res)=>{
    //get all user documents from MongoDB
    let usersList = await UserModel.find();

    //send response with user data
    res.json({message:"All users",payload:usersList});
})

// POST route handler to add a new user
userApp.post('/users', async(req,res)=>{
    //get user from request body
    let newUser=req.body;
    
    //hash the password
    let hashedPassword=await hash(newUser.password,12);

    //replace plain paass with hashed pass
    newUser.password=hashedPassword;

    //create new Document using request data
    let newUserDoc= new UserModel(newUser);

    //save it in database
    await newUserDoc.save();

    //sending success response
    res.json({message:"User Created"});
  })

//User authentication(login) route
userApp.post("/auth",async(req,res)=>{
 // read data from req.body
 let userCred = req.body;

 // find document matches with condition 
 let userOfDB=await UserModel.findOne({username:userCred.username});

 //if user not found
 if(userOfDB===null){
  return res.status(404).json({message:"Invalid username"});
 }

 //compare passwords usercredential password and hashed password stored in database
 let status =await compare(userCred.password,userOfDB.password)
 //if passwords does not matched
 if(status===false){
  return res.status(404).json({message:"Invalid Password"});
 }
//create signed token
 let signedToken = jwt.sign({username:userCred.username},'abcdef',{expiresIn:30})

 //save token as httpOnly cookie
 res.cookie('token',signedToken,{
  httpOnly:true, //it is httpOnly cookie browser cant access it
  secure:false,
  sameSite:"lax"
 })

 //send token in res
 res.status(200).json({message: "login success"});
});

// GET route handler to get user by ObjectId
userApp.get('/users/:id',async(req,res)=>{
    //get ObjectID from url param
    let objId=req.params.id;

    //find user document that matches with given ObjectId
    let userObj=await UserModel.findById(objId);

    // Send response with user data
    res.json({message:"User is",payload:userObj});
});

// PUT route handler to update an existing user by ObjectId
userApp.put('/users/:id',async(req,res)=>{
  //get objectId from url params
  let objId=req.params.id;

  //get modified user from request body
  let modifiedUser=req.body;

  //make update
  let latestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true,runValidators:true});

  //if user Document not found
  if(!latestUser){
    return res.status(200).json({message:"user not found"});
  }

  //send response
  res.status(200).json({message:"User Updated",payload:latestUser})
});

// DELETE route handler to delete user by ObjectId
userApp.delete('/users/:id',async(req,res)=>{
    // extract user ID from URL param
    let objId=req.params.id;

    // delete the user document with the given Objectid
    let deletedUser=await UserModel.findByIdAndDelete(objId);

    //send delete response
    res.status(200).json({message:"User Deleted",payload:deletedUser});
})

//test route

userApp.get("/test",verifyToken,(req,res)=>{
  res.json({message:"test route"})
})
