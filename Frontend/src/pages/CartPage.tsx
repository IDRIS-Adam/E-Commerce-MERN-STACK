import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  // Pring the token for user from useAuth

  // initiale useState
  const { cartItems, totalAmount } = useCart();

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Typography variant="h4" marginBottom={4}>
        My Cart
      </Typography>

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
                  {item.quantity} * {item.unitPrice} £
                </Typography>
                <Button sx={{ color: "red" }}>Remove Item</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button>-</Button>
              <Button>+</Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box>
          <Typography variant="h4">Total Amount: {totalAmount.toFixed(2)} £</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
