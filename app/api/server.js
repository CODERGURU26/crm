import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import customerRouter from './routers/customer.router.js'
import bodyParser from "body-parser";
import logRouter from "./routers/logs.router.js";

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

console.log("Connecting to DB:", DB_URL); // check value

mongoose
  .connect(DB_URL)
  .then(() => console.log("✅ Connected To DB"))
  .catch((err) => console.error("❌ Failed To Connect To DB:", err));

const app = express();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use('/customer' , customerRouter)
app.use('/logs' , logRouter)

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
