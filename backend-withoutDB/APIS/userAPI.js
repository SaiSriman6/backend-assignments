import exp from 'express';

//create mini - express(Seperate Route) app
export const userApp=exp.Router();


let users=[];

//create api (req handlers - route)
//get req handling route
userApp.get('/users',(req,res)=>{

  //send users data
  res.status(200).json({message:'All users',payload:users})  //message,payload is best way of response

})


//post req handling route
userApp.post('/users',(req,res)=>{
 
  let newUser=req.body;

  //adding user to users
  users.push(newUser);

  //sending respone
  res.json({message:"User created"});
})


//put req handling route
userApp.put('/users',(req,res)=>{
  
  //get modified user from client
  let updatedUser=req.body;

  //find the user with id exists in array
  let userIndex=users.findIndex(user=>user.id===updatedUser.id);

  //if user not found send res as "user not found
  if(userIndex===-1){
    return res.status(404).json({message:"User not Found"});
  }

  //if user found ,then modify the user
  //send response as "user modified"
  let deletedUser=users.splice(userIndex,1,updatedUser);
  res.status(200).json({message:"User Modified"});

})

userApp.get('/users/:id',(req,res)=>{
 
  let userId=Number(req.params.id)      //recieves id as String from URL so we use Number

  let user=users.find(userObj=>userObj.id==userId);

  if(!user){
     return res.status(404).json({message:"User not found"});
  }

  res.status(200).json({message:"user",payload:user})
})



//delete req handling route
userApp.delete('/users/:id',(req,res)=>{

  let userId=Number(req.params.id);

  let userIndex=users.findIndex(user=>user.id===userId);

  if(userIndex===-1){
    return res.json({message:"user not found"});
  }

  let deletedUser=users.splice(userIndex,1);
  
  res.json({message:"user deleted"});
})