import dotenv from "dotenv";
import express, { json, Router } from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productModel from "./models/productModel";
import productRoute from "./Routes/productRoute";
import cartRoute from "./Routes/cartRoute";

dotenv.config();



const app = express();
const port = 3001;

app.use(express.json()) 

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log(" Mongo connected ! "))
  .catch((err) => console.log(" Failed to connect! "));
  
// Seed the products to the database
seedInitialProducts();
app.use('/user', userRoute);
app.use('/product', productRoute)
app.use('/cart', cartRoute)

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
})
  