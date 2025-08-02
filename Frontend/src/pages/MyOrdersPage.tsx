import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {

  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
   
      getMyOrders()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(myOrders);


  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>
      <Typography>{myOrders.map(({ address, orderItems, total }) => (
      <Box sx={{ border: 1 , borderColor: "gray", p: 1 , borderRadius: 2 , }}>
        <Typography>Address : {address}</Typography>
        <Typography>Items : {orderItems.length}</Typography>
        <Typography>Total : { total }</Typography>
      </Box>
    ))}</Typography>
    </Container>
  );
};

export default MyOrdersPage;
