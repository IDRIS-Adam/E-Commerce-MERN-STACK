import express from "express";
import { addItemToCart, Checkout, clearCart, deleteItemFromCard, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import validatJWT from "../middlewares/validationJWT";
import { Request, Response } from "express";
import { ExtendRequest } from "../Types/extendedRequest";

const router = express.Router();

// Get active cart for user
router.get("/", validatJWT, async (req: ExtendRequest, res: Response) => {

  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId , populateProduct: true});
    res.status(200).send(cart);
    
  } catch (error) {
    res.status(500).send("Something went wrong!")
  }
  
});


// Add Item to Cart items inside Carts
router.post('/items', validatJWT, async (req: ExtendRequest, res) => {

  try {
    // bring the userId from request && pring productId and quantity from Body
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;

    // Work the fucn addItemTo Cart and get the response
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send("Someting went wrong!")
  }
  
})


// Update  Item in the Card
router.put('/items', validatJWT, async (req: ExtendRequest, res) => {

  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity })
    res.status(response.statusCode).send(response.data)
    
  } catch (error) {
    res.status(500).send("Someting went wrong!");
  }
})

// Delete All product from Card
router.delete('/', validatJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId })
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send("Someting went wrong!");
  }
})

// Delete One Product from cart
router.delete('/items/:productId', validatJWT, async (req: ExtendRequest, res) => {

  try {
    const userId = req?.user?._id;
    const { productId } = req.params;
  
    const response = await deleteItemFromCard({ productId, userId });
    res.status(response.statusCode).send(response.data);
    
  } catch (error) {
    res.status(500).send("Someting went wrong!");
  }
})

router.post('/checkout', validatJWT, async (req: ExtendRequest, res) => {

  try {
    const userId = req?.user?._id;
    const { address } = req.body;
  
    const response = await Checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
    
  } catch (error) {
    res.status(500).send("Someting went wrong!");
  }
})

export default router;
