const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const Blog = require("./models/user");

app.use(express.json())
app.post("/signup", async (req, res) => {
  // const userObj={
  //   firstName:"nikhil",
  //   lastName:'hamaupreti',
  //   email:'uprereti@123.com',
  //   password:'nikhil838',
  //   age:19,
  //   gender:'male'
  // }

  // const user=new User(userObj)
  // await user.save()
  // res.status(201).json(user)
 try{
 await User.create(req.body);
 res.status(200).send(req.body)
 }catch(err){
  res.status(500).send("Some error ",err.message)
 }
 
});

connectDB()
  .then(() => {
    console.log("Database connection successfull");
    app.listen(3000, () => {
      console.log("server is running on the port:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });
