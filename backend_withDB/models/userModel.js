//Import Schema and model
import {Schema,model} from 'mongoose'

// Defining the structure and validation rules for User documents

const userSchema=new Schema({
   //username field with validation rules
   username:{
    type:String,
    required:[true,"User name is required"],
    minLength:[4,"Mininimum length should be 4"],
    maxLength:[6,"Maximum length exceeded"]
   },

   //password field
   password:{
    type:String,
    required:[true,"password required"]
   },

   // age field with numeric constraints
   age:{
    type:Number,
    required:[true,"Age is required"],
    min:[18,"Age should be above 18"],
    max:[25,"age should be below 25"]
   }
},{
    // throws error if unknown fields are sent
   strict:"throw",
    // adds createdAt and updatedAt fields
   timestamps:true
});

// Creating and export Usermodel based on the schema
export const UserModel=model('user',userSchema);