import express from "express";
import { Request } from "../models/requestsModel.js";
import { User } from "../models/userModel.js";
import { decrypt } from "../middlewares/authMiddleware.js";


const router = express.Router();

//get all requests

router.post("/get-requests", decrypt, async (req, res) => {
    try {
        const requests = await Request.find({
          $or: [{sender: req.body.sender}, {receiver: req.body.receiver}]
        })
        .populate("sender")
        .populate("receiver")

        res.send({
            data: requests,
            message: "Requests fetched successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});


// send a request to another user
router.post("/send-request", decrypt, async (req, res) => {
    try {
        const {receiver, amount, reference, description} = req.body
        const request = new Request({
            sender: req.body.sender,
            receiver,
            amount,
            description,
            reference
        })
        await request.save()

        res.send({
            data: request,
            message: "Request sent successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

export {router as requestRouter}