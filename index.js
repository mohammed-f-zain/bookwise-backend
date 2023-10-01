import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import booksRoutes from "./routes/booksRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import authorRoutes from "./routes/authorRoutes.js"


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json({limit:"30mb"}));

app.use("/user", userRoutes);
app.use("/books", booksRoutes);
app.use("/admin", adminRoutes);
app.use("/author", authorRoutes);

const port = process.env.PORT;
const url = process.env.URL;

mongoose.connect(url).then(
  app.listen(port, () => {
    console.log(`App is listing on ${port}`);
  })
);