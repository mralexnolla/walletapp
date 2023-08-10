import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { decrypt } from "../middlewares/authMiddleware.js";

const router = express.Router();

//find user id by email

const getUserIdByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? user._id : "";
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return "";
  }
};

//register user
router.post("/register", async (req, res) => {
  try {
    //validation
    if (!req.body.firstName)
      return res.json({ message: `First Name cannot be empty` });
    if (!req.body.lastName)
      return res.json({ message: `Last Name cannot be empty` });
    if (!req.body.email) return res.json({ message: `Email cannot be empty` });
    if (!req.body.phone) return res.json({ message: `Phone cannot be empty` });
    if (!req.body.idNumber)
      return res.json({ message: `IdNumber cannot be empty` });
    if (!req.body.idType) return res.json({ message: `Choose the ID type` });
    if (!req.body.tin) return res.json({ message: `Tax ID cannot be empty` });
    if (!req.body.address)
      return res.json({ message: `Address cannot be empty` });
    if (!req.body.password)
      return res.json({ message: `Password cannot be empty` });

    //validating email and password format
    if (!validator.isEmail(req.body.email)) {
      return res.send({ success: false, message: "Not valid email" });
    }
    if (!validator.isStrongPassword(req.body.password)) {
      return res.send({ success: false, message: "Not valid password" });
    }

    // check if user already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.send({
        success: false,
        message: "user already exist",
      });
    }

    //check if phone number already exist
    const phoneExist = await User.findOne({ phone: req.body.phone });
    if (phoneExist) {
      return res.send({
        success: false,
        message: "Phone number already exist",
      });
    }

    //checking idtype with the id
    const idtypeExist = await User.findOne({ idType: req.body.idType });
    const IDnumberExist = await User.findOne({ idNumber: req.body.idNumber });
    
    //console.log(idtypeExist);

    if (idtypeExist && IDnumberExist) {
      return res.send({
        success: false,
        message: "This ID already exists",
      });
    }
    
    //check if tin already exist
    const tinExist = await User.findOne({ tin: req.body.tin });
    if(tinExist){
        return res.send({
            success: false,
            message: "This Tax Identification Number already exist"
        })
    }


    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;

    //sending new user to database
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).send({
      message: `Users created successfully`,
      data: newUser,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: `error with registration ${error}`,
    });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email) return res.json({ message: `Email cannot be empty` });
    if (!req.body.password)
      return res.json({ message: `Password cannot be empty` });

    // check if user Exist
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.send({
        success: false,
        message: "User does not exist please register",
      });
    }

    //check if password is correct
    const match = await bcrypt.compare(req.body.password, userExist.password);
    if (!match) {
      return res.send({
        success: false,
        message: "invalid password",
      });
    }

    //check if user is verified
    if(!userExist.isVerified){
      return res.send({
        message: "User is not verified yet or has been suspended",
        success: false
      })
    }

    //generate token
    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "user logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: `login failed due to the following error ${error.message}`,
    });
  }
});

//get user infor
router.post("/get-user-info",decrypt, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = "";
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//get all users 
router.get("/get-all-users", decrypt, async (req, res) => {
  try {
    const users = await User.find()
    res.send({
      data: users,
      message: "Users fetched successfully",
      success: true
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false
    })
  }
});

//update user verified status
router.post("/update-users-verified-status", decrypt, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.selectedUser, {
      isVerified: req.body.isVerified,
    })
    res.send({
      message: "User verified successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

export { router as userRouter };
