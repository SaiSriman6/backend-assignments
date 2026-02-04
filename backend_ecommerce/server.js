import exp from "express";
//import userApp
import {userApp} from "./APIs/userAPI.js"
//import productApp
import {productApp} from "./APIs/productAPI.js"
//import connect
import {connect} from "mongoose";

//create server
const app=exp()

//connect to database
async function connection(){
    try{
        await connect('mongodb://localhost:27017/ecommercedb');
        console.log("Connected to database");
        app.listen(4000,()=>{console.log("listening from port 4000")});
    }
    catch(err){
        console.log("error in connecting database",err);
    }
}

connection();

//add body parser
app.use(exp.json());

//use userApp for /user-api
app.use('/user-api',userApp);

//use productApp for /product-api
app.use('/product-api',productApp);


// middleware for error handling
app.use((err,req,res,next)=>{
    res.json({message:"error",reason:err.message});
})
