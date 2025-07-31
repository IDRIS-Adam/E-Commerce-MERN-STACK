import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";




const CartPage = () => {
  // Pring the token for user from useAuth

  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();
  
  const navigate = useNavigate();


  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    updateItemInCart(productId, quantity);
  };

  const HandleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const handeCheckout = () => {
    navigate("/checkout");
  }

  //////// Define the component of cart item
  const renderCartItem = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: 1,
            borderColor: "#b3b3b3",
            borderRadius: 5,
            padding: 2,
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={4}>
            <img src={item.image} width={100} />
            <Box>
              <Typography variant="h6"> {item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} £
              </Typography>
              <Button
                onClick={() => HandleRemoveItem(item.productId)}
                sx={{ color: "red" }}
              >
                Remove Item
              </Button>
            </Box>
          </Box>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
            >
              -
            </Button>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">Total Amount: {totalAmount} £</Typography>
        <Button variant="contained" onClick={handeCheckout}> Go To Ceckout </Button>
      </Box>
    </Box>
  );


  ////////////////////////////// render the main component
  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" marginBottom={4}>
          {" "}
          My Cart{" "}
        </Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>

      {cartItems.length ? (
        renderCartItem()
      ) : (
        <Typography>
          Cart is Empty. Please start shopping and add items first.
        </Typography>
      )}
    </Container>
  );
};
export default CartPage;
