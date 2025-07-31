import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { BASE_URL } from "../Constants/baseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  // Pring the token for user from useAuth
  const { cartItems, totalAmount } = useCart();

  ///// Bring the token
  const { token } = useAuth();

  const navigate = useNavigate();

  const addressResf = useRef<HTMLInputElement>(null);

  ////// Define the fun for confirm the payement
  const handleConfirmOrder = async () => {
    const address = addressResf.current?.value;

    if (!address) return;

    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });

    if (!response.ok) return;

    navigate("/order-success");
  };

  //////// Define the component of cart item
  const renderCartItem = () => (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        border: 1,
        borderColor: "#b3b3b3",
        borderRadius: 5,
        padding: 1,
      }}
    >
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={4}
            width="100%"
          >
            <img src={item.image} width={100} />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h6"> {item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} £
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          Total Amount: {totalAmount} £
        </Typography>
      </Box>
    </Box>
  );

  ////////////////////////////// render the main component
  return (
    <Container
      fixed
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography sx={{ mb: -2 }} variant="h4">
          Checkout Page{" "}
        </Typography>
      </Box>
      <TextField
        inputRef={addressResf}
        label="Delivery Adress"
        name="address"
        fullWidth
        sx={{ border: 1, borderColor: "#f5f5" }}
      />
      {renderCartItem()}
      <Button variant="contained" fullWidth onClick={handleConfirmOrder}>
        Pay Now
      </Button>
    </Container>
  );
};
export default CheckoutPage;
