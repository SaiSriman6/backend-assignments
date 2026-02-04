import {Schema,model} from "mongoose";

// create cart Schema
// const cartSchema=new Schema({
//     product:{
//         type:Schema.Types.ObjectId,
//         ref:'product',   //name of ProductModel
        
//     }
// })

const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',    //name of ProductModel
      },
     
     quantity:{
         type:Number,
         ref:'product'    //name of ProductModel
     }   
})

let userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:[true,"duplicate user"]      
    },
    password:{
        type:String,
        required:[true,"password required"]
    },
    cart:{
       type:[cartSchema]
    },
   
})

//export UserModel
export const UserModel =model('user',userSchema);