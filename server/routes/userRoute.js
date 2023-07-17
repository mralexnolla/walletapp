import express from 'express'
import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import validator from "validator";
import  jwt  from 'jsonwebtoken'

const router = express.Router()

//register user
router.post('/register', async (req, res) => {
    try {
         //validation
         if (!req.body.firstName) return res.json({ message: `First Name cannot be empty` });
         if (!req.body.lastName)  return res.json({ message: `Last Name cannot be empty` });
         if (!req.body.email) return res.json({ message: `Email cannot be empty` });
         if (!req.body.phone) return res.json({ message: `Phone cannot be empty` });
         if (!req.body.idNumber) return res.json({ message: `IdNumber cannot be empty` });
         if (!req.body.tin) return res.json({ message: `Tax ID cannot be empty` });
         if (!req.body.address) return res.json({ message: `Address cannot be empty` });
         if (!req.body.password) return res.json({ message: `Password cannot be empty` });
         
         //validating email and password format
         if (!validator.isEmail(req.body.email)) {
           return res.send({ success: false, message: "Not valid email" });
         }
         if (!validator.isStrongPassword(req.body.password)) {
           return res.send({ success: false, message: "Not valid password" });
         }

        // check if user already exist
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            return res.send({ 
                success: false,
                message: "user already exist" });
                      
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedpassword;
        
        //sending new user to database 
        const newUser = new User(req.body);
        await newUser.save()

        res.status(200)
           .send({
                message: `Users created successfully`,
                data: newUser,
                success: true
            })
            
        
    } catch (error) {
        res.status(400)
           .send({
                success: false,
                message: `error with registration ${error}`
            })
    }
})

//login user
router.post('/login', async (req, res) => {
    try {
        if (!req.body.email) return res.json({ message: `Email cannot be empty` });
        if (!req.body.password)return res.json({ message: `Password cannot be empty` });
        
        // check if user Exist
        const userExist = await User.findOne({ email : req.body.email});
        if (!userExist) {
          return res.send({
            success: false,
            message: "User does not exist please register",
          });
        }

        //check if password is correct
        const match = await bcrypt.compare(req.body.password, userExist.password)
        if(!match){
            return res.send({
                success: false,
                message: "invalid password"
            })
        }

        //generate token
        const token = jwt.sign({ userId: userExist._id }, process.env.SECRET, {
          expiresIn: "5min",
        });
        res.send({
            success: true,
            message: "user logged in successfully",
            token: token
        })
        
    } catch (error) {
        res.send({
            success: false,
            message: `login failed due to the following error ${error.message}`,

        })
    }
})

export {router as userRouter}