const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log(req.user.userId);
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateName = async(req,res,next)=>{
  try{
    const {name}= req.body;
    if(!name){
      return res.status(400).json({error:"Name is required"});
    }
    const user = await User.findById(req.user.userId);
    if(!user){
      return res.status(400).json({error:"User not found"});
    }
    user.name = name;
    await user.save();
    res.status(200).json({ message: "Name updated successfully" });
  }catch(error){
    next(error);
  }
}

const updateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.email = email;
    await user.save();
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user =  await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    next(error);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateName,
  updateEmail,
  updatePassword,
  getAllUsers,
  deleteUser,
};
