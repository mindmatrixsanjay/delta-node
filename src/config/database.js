
const mongoose=require('mongoose');
const url=`mongodb+srv://sanjayshrestha772:learndb7@datanest.cxnaxjg.mongodb.net/devtinder`;
const connectDB=async()=>{
  await mongoose.connect(url)
}




module.exports=connectDB