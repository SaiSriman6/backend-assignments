// Import express 
import express from "express";

// Import user and product API routers
import { userApp } from "./APIs/userAPI.js";

import { productApp } from "./APIs/productAPI.js";

// Import mongoose connect method
import { connect } from "mongoose";

import cookieParser from "cookie-parser";

const app = express();  // Create express application
const port= 4000;

// Async function to connect to MongoDB
async function connection(){
   try{
       //Connecting to MongoDB Database
        await connect('mongodb://localhost:27017/merndb')
        console.log("connected to database");   
        
        //start the server only if DB connection is successfull
        app.listen(port,()=>{console.log("listening from port 4000")});
    }

    catch(err){
        // handling database connection errors
        console.log("error in connecting Databse",err);
    }
}

//Calling the connection function
connection();

//Middleware to parse incoming JSON request bodies
app.use(express.json());

app.use(cookieParser());

//route middleware for user-related APIs
app.use('/user-api',userApp);

//route middleware for product-related APIs
app.use('/product-api',productApp)


//error handling MiddleWare catches error from any route
app.use((err,req,res,next)=>{
    res.status(500).json({message:"error",reason:err.message});
})