import exp from 'express'

import { userApp } from './APIS/userAPI.js'

import { productApp } from './APIS/productAPI.js'

//creating server

const app=exp() //server is created

//assigning port number

app.listen(3001,()=>console.log('HTTP server listening on port 3001'));

//body parsing middleware (resolves parsing issue)

app.use(exp.json());

//app will use userApp when it finds '/user-api' path

app.use('/user-api',userApp);


//app will use productApp when it finds '/product-api' path

app.use('/product-api',productApp);


//if we want to execute this for only get Request
//goto app.get and add middleware as parameter


//creating custom middleWare
// function middleware1(req,res,next){
//   console.log("middleware1 executed");
//   //res.json({message:"from middleware1"});
//   next();
// }

//to execute for every incoming request
//app.use(middleware1);

