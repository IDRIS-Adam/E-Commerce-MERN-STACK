import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/baseURL";
import { useAuth } from "../context/ContextAuth/AuthContext";

const CartPage = () => {

    // Pring the token for user from useAuth 
    const { token } = useAuth();

    // initiale useState
    const [cart, setCart] = useState();

    // initiale error 
    const [error, setError] = useState('');

    // initiale useEffect for calling the endpoints
    useEffect(() => {

        // Chech the token
        if (!token) {
            return;
        }
        
        /// 
        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                setError("Failed to fetch User Cart, Please try again !");
            }

            // Put the data in json
            const data = await response.json();
            setCart(data);
        }
        fetchCart();
    },[token]);
    console.log(cart);
    console.log(error)
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};




export default CartPage;
