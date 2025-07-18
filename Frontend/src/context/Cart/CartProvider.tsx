/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../Types/CartItem";
import { BASE_URL } from "../../Constants/baseURL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotoalAmount] = useState<number>(0);
  const [error, setError] = useState("");

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
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to fetch User Cart, Please try again !");
      }

      
      // Put the data in json
      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        ({ product, quantity , unitPrice}: { product: any; quantity: number, unitPrice: number }) => ({
          productId: product.id,
          title: product.title,
          image: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItems(cartItemsMapped);
      setTotoalAmount(cart.totalAmount);
  
    };
    fetchCart();
  }, [token]);

  ///////////////////////////////////////////
  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
      }

      //////////////////////////////////////////// Mapping the cart
      const cartItemsMapped = cart.items.map(
        ({ product, quantity  }: { product: any; quantity: number }) => ({
          productId: product.id,
          title: product.title,
          image: product.image,
          unitprice: product.unitprice,
          quantity,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotoalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
