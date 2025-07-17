import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  // Pring the token for user from useAuth
  const { token } = useAuth();

  // initiale useState
  const { cartItems, totalAmount } = useCart();

  // initiale error
  const [error, setError] = useState("");

  
  console.log(error);
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};

export default CartPage;
