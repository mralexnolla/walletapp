import {mongoose, Schema} from "mongoose"

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    // type: {
    //   type: String,
    //   required: true,
    // },
    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("transactions", transactionSchema);