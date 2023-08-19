import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";
import { transactionRouter } from "./routes/transactionRoute.js";
import { requestRouter } from "./routes/requestsRoute.js";
import { uploadRouter } from "./routes/uploadRoute.js";





dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());





//routes
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/requests", requestRouter)
app.use("/api/uploads", uploadRouter)



//connect to the DB
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    if (res) {
      console.log(`Database connected`.bgGreen.white);
    }

    //listen to server port
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`.bgWhite.red);
    });
  })
  .catch((error) => {
    console.log(`Database not connected`.bgRed.white, error);
  });
