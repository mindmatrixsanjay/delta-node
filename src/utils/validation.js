
const validator=require('validator')


const validateSignUpData=(req)=>{

  const {firstName,lastName,email,password}=req.body;
  if(!firstName || !lastName){
    throw new Error("Full name is required")
  }
}


module.exports=validateSignUpData;