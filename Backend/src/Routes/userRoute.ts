
import express, { request, response } from "express";
import { getMyOrders, login, resgister } from "../services/userService";
import { getActiveCartForUser } from "../services/cartService";
import validatJWT from "../middlewares/validationJWT";
import { ExtendRequest } from "../Types/extendedRequest";
// import userModel from "../models/userModel";

const router = express.Router();

// Register route (API)
router.post('/register', async (request, response) => {

    try {
        const { firstName, lastName, email, password } = request.body;
    
        const result = await resgister({ firstName, lastName, email, password });
        response.status(result.statusCode).json(result.data);
        // Another way 
        //const {result, data } = await resgister({ firstName, lastName, email, password })
        //response.status(statusCode).send(data);
        
    } catch (error) {
        response.status(500).send("Someting went wrong to Resgister!");

    }
});

// Login route (API)
router.post('/login', async (request, response) => {

    try {
        //  data = {email, password}; same thing!
        const { email, password } = request.body;
        const { statusCode, data } = await login({ email, password })
        response.status(statusCode).json(data);
    } catch (error) {
        response.status(500).send("Someting went wrong to Login!");
    }
})

router.get("/my-orders", validatJWT, async (request: ExtendRequest, response) => { 
    try {
        const userId = request?.user?._id;
        const { statusCode , data } = await getMyOrders({ userId });
        response.status(statusCode).send(data);

    } catch (error) {
        response.status(500).send("Someting went wrong To Get Orders");
    }
});

export default router;