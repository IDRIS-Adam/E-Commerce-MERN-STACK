import express, { request , response} from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Someting went wrong!");
    }
})


export default router;