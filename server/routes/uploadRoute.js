import express from 'express';
import multer from "multer";
import { ImageDetails } from '../models/ImageDetailsModel.js';
import { User } from '../models/userModel.js';
import moment from 'moment'
import path, {dirname} from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

//storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const clientImageFolder = path.join(__dirname, '../../client/public/images/')
        console.log(clientImageFolder);
        return cb(null, clientImageFolder);
        //return cb(null, 'uploads');  //incase i want to upload the image in the backend folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = moment(Date.now()).format("DDMMYYYYhhmmssA_");
        cb(null, uniqueSuffix + file.originalname);
    }
})

//create multer instance
const upload = multer({storage: storage})

router.post("/imageUploads",upload.single("image"), async (req, res) => {
  
    // first get the data from the body
  const imageName = req.file.filename
  const userEmail = req.body.email

  try {
    //check if the user email actually exixts in the database
    const user = await User.findOne({email: userEmail})
    
    if(user){
        const newImage = new ImageDetails({
          email: user.email,
          image: imageName
        });

        await newImage.save();
        
        res.status(200).send({
            message: "Image uploaded successfully",
            success: true
        })

    }else{
        res.status(400).send({
          message: "User not found. Failed to upload",
          success: false,
        });
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }

});

router.get("/getImage", async (req, res) => {
    
    const userEmail = req.query.email;

    try {
        const userImage = await ImageDetails.find({ email: userEmail });
        res.send({
          data: userImage,
          message: "User image fetched successfully",
          success: true
        });
    } catch (error) {
        res.status(400).send({
            data: null,
            message: "no data found",
            success: false
        })
    }
})



export {router as uploadRouter}
