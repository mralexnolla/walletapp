import express from "express";
import { Transaction } from "../models/transactionModel.js";
import { User } from "../models/userModel.js";
import { decrypt } from "../middlewares/authMiddleware.js";
import validator from "validator";

const router = express.Router();

const getUserIdByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? user._id : "";
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return "";
  }
  

};

//transfer money from one account to another
// decrypt will validate the jwt tokek. If its oken then transaction will move to the try block

router.post("/fund-transfer", decrypt, async (req, res) => {
  try {
    //check if user is active, sender has funds and receiver has all the criteria to receive the funds

    //first save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    const sendId = await getUserIdByEmail(req.body.sender);
    const receiverId = await getUserIdByEmail(req.body.receiver);

    const sender = await User.findOne({ email: req.body.sender });

    //check for availablebalance
    if (req.body.amount > sender.avlbal) {
      return res.send({
        message: "Insuficient Funds",
        success: false,
      });
    }

    //check that amount is not less than 3
    if(req.body.amount < 3){
      return res.send({
        message: "Minimum amount is Ghs 3",
        success: false
      })
    }

    //decrease sender balance ie debit sender.
    await User.findByIdAndUpdate(sendId, {
      $inc: { avlbal: -req.body.amount }, // $inc = increment ie mongodb method
    });

    //increase receivers balance
    await User.findByIdAndUpdate(receiverId, {
      $inc: { avlbal: req.body.amount },
    });

    res.send({
      message: "Transaction successfull",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

//cash deposite   <<<==========

router.post("/cash-deposite", decrypt, async (req, res) => {
  try {

    const depositeTransaction = new Transaction(req.body)
    depositeTransaction.save()

    const receiverId = await getUserIdByEmail(req.body.receiver)

    await User.findByIdAndUpdate(receiverId,{
      $inc: {avlbal: req.body.amount}
    } );

    res.send({
      message: "Transaction Successfull",
      data: depositeTransaction,
      success: true
    });
    
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false
    })
  }
});

// verify the receiver account
router.post("/verify-accout", decrypt, async (req, res) => {
  try {
    const sender = await User.findById(req.body.userId);

    const user = await User.findOne({ email: req.body.receiver });

    // if the sender uses his own email for verification it should fail
    if (user.email === sender.email) {
     return res.send({
        message: "Do not use your own account",
        data: sender,
        success: false,
      });
    }


    if (user) {
      res.send({
        message: "Account verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account not found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account not found",
      data: null,
      success: false,
    });
  }
});

// get all transactions for a user

router.post("/get-txn-by-users", decrypt, async (req, res) => {
  try {
    
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.sender }, { receiver: req.body.receiver }],
    })
    .sort({createdAt: -1})

    res.send({
      message: "Transactions fetched",
      data: transactions,
      success:true
    })
  } catch (error) {
    res.send({
      message: "Failed to fetch transactions",
      data: error.message,
      success: false
    })
  }
})

export { router as transactionRouter };
