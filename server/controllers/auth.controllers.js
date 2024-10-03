import userSchema from "../schemas/userSchema.js";
import adminUser from "../schemas/adminUserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = {
      id: user._id, // Added user id to the response
      name: user.name,
      email: user.email,
      token,
    };
    console.log(userData)
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminUser.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const adminData = {
      id: admin._id, 
      name: admin.name,
      email: admin.email,
      token,
    };
    console.log("Admin login successful:", adminData);
    res.status(200).json({ adminData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await adminUser.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await adminUser.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
