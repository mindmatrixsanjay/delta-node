const mongoose = require("mongoose");
var validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required:[true,"First Name is required"],
    minLength:3,
    maxLength:40
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address : "+value)
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password")
      }
    }
  },
  age: {
    type: Number,
    min:16
  },
  gender: {
    type: String,
    lowercase:true,
    validate(value){
      if(!["male","female","others"].includes(value)){
         throw new Error("Invalid credential for gender")
      }
    }
  },
  photoUrl:{
    type: String,
    default:"https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
     validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo url : "+value)
      }
    }
  },
  about:{
    type:String,
    default:"This is a default about of the user"
  },
  skill:{
   type:[String],
   validate(value){
    if(value.length>10){
      throw new Error("Cannot add more than 10 skills")
    }
   }
  }
},{
  timestamps:true
});
 
const User = mongoose.model("User", userSchema);
module.exports = User;
