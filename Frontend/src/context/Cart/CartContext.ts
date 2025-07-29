import { createContext, useContext } from "react";
import type { CartItem } from "../../Types/CartItem";
// import type { Product } from "../../Types/Product";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemInCart: (ProductId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
});

export const useCart = () => useContext(CartContext);
