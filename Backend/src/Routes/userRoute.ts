
import express, { request } from "express";
import { login, resgister } from "../services/userService";
// import userModel from "../models/userModel";

const router = express.Router();

// Register route (API)
router.post('/register', async (request, response) => {

    try {
        const { firstName, lastName, email, password } = request.body;
    
        const result = await resgister({ firstName, lastName, email, password });
        response.status(result.statusCode).send(result.data);
        // Another way 
        //const {result, data } = await resgister({ firstName, lastName, email, password })
        //response.status(statusCode).send(data);
        
    } catch (error) {
        response.status(500).send("Someting went wrong!");

    }
});

// Login route (API)
router.post('/login', async (request, response) => {

    try {
        //  data = {email, password}; same thing!
        const { email, password } = request.body;
        const { statusCode, data } = await login({ email, password })
        response.status(statusCode).send(data);
    } catch (error) {
        response.status(500).send("Someting went wrong!");
    }
})

export default router;