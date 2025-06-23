
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import ProductCard from "../components/ProductCard";
// import { useEffect, useState } from "react";
// import type { Product } from "../Types/Product";

// const HomePage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   useEffect(() => {
//     fetch('http://localhost:3001/product').then(async (response) => {
//       const data = await response.json();
//       setProducts(data);
//     })
//   }, []);
//     return (
//         <Container sx={{ mt: 2 }}>
//         <Grid container spacing={2}>
//           {products.map((p) => (
//            <Grid >
//             <ProductCard {...p}>
//            </Grid>

//           ))}
//             </Grid>
//         </Container>
//     );
// };
// export default HomePage;


import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../Types/Product";
import { BASE_URL } from "../Constants/baseURL";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  // use useState for hindling the error and use the error parameter 
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`)
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true)
      }
    };

    fetchData()
  }, []);
///////// Using the Error and show a message 
  if (error) {
    return (
      <Box sx={{ mt: 10, color: 'red', textAlign: 'center', fontWeight: 'bold' , fontSize: 30}}>
        Something went wrong, please try again!
      </Box>
    );
  }
  
  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
      {products.map(({ _id, image, title, price}) => (
        <Box sx={{
          flexBasis: { xs: "100%", sm: "48%", md: "30%" },
          height: 180,
        }}>
            <ProductCard id={_id} title={title} price={price} image={image} />

        </Box>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;

