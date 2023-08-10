import express from "express";
import { Request } from "../models/requestsModel.js";
import { User } from "../models/userModel.js";
import { decrypt } from "../middlewares/authMiddleware.js";
import { Transaction } from "../models/transactionModel.js";


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

//get all requests

router.post("/get-requests", decrypt, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.body.sender }, { receiver: req.body.receiver }],
    })
      .populate("sender")
      .populate("receiver")
      .sort({ createdAt: -1 });

    res.send({
      data: requests,
      message: "Requests fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// send a request to another user
router.post("/send-request", decrypt, async (req, res) => {
  try {
    if(!req.body.description) return res.json({message: `Descrition cannot be empty`})

    const { receiver, amount, reference, description } = req.body;
    const request = new Request({
      sender: req.body.sender,
      receiver,
      amount,
      description,
      reference,
    });
    await request.save();

    // check that the requested amount not less than Ghs 5
    if (req.body.amount < 5) {
      return res.send({
        message: "Minimum amount to send Ghs 5",
        success: false,
      });
    }

    res.send({
      data: request,
      message: "Request sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//update request status
router.post("/update-request-status", decrypt, async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.receiver});
    const sendId = await getUserIdByEmail(req.body.sender);
    const receiverId = await getUserIdByEmail(req.body.receiver);

    let insufficientFunds = false

    if (req.body.status === "accepted" && req.body.amount > user.avlbal - 5) {
      insufficientFunds = true;
    }

    if(insufficientFunds){
      return res.send({
        message: "Insufficient Funds",
        success: false
      })
    }


    if (req.body.status === "accepted") {
      //update the balance of both users
      //deduct the amount from the sender

      await User.findByIdAndUpdate(sendId, {
        $inc: { avlbal: req.body.amount },
      });

      //add the amount to the receiver
      await User.findByIdAndUpdate(receiverId, {
        $inc: { avlbal: -req.body.amount },
      });
    }

    //update the request status in the request model
    await Request.findByIdAndUpdate(req.body._id, {
      status: req.body.status,
    });

    //create and save transaction
    const transaction = new Transaction({
      sender: req.body.receiver,
      receiver: req.body.sender,
      amount: req.body.amount,
      description: req.body.description,
      reference: req.body.reference,
      status: "success",
    });
    await transaction.save();

    res.send({
      data: null,
      message: "Request Status updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: "Request Status failed",
      success: false,
    });
  }
});

export { router as requestRouter };
