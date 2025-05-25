const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const Blog = require("./models/user");

app.use(express.json());

//signup api
app.post("/signup", async (req, res) => {
  const data=req.body;
  try {
    const ALLOWED_POST=["firstName","lastName","email","gender","password","skill","age","photoUrl","about"];
    const isPostAllowed=Object.keys(data).every(key=>{
       return ALLOWED_POST.includes(key)
    });
    if(!isPostAllowed){
      return res.status(400).send("Not allowed to post")
    }
    await User.create(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Some error " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length == 0) {
      return res.status(404).send("No any user found");
    }
    res.send(users);
  } catch (err) {}
});

//get user by id

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update data of the user with id
app.patch("/user/:id", async (req, res) => {
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed");
    }
    const updateData = await User.findByIdAndUpdate(req.params?.id, data, {
      new: true,
      runValidators: true,
    });
    res.send(updateData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update data of the user with email id
app.patch("/user", async (req, res) => {
  try {
    //const user=await User.find({email:req.body.email});
    const updateUser = await User.updateOne(
      { email: req.body.email },
      req.body
    );
    res.send(updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

connectDB()
  .then(() => {
    console.log("Database connection successfull ");
    app.listen(3000, () => {
      console.log("server is running on the port:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });
