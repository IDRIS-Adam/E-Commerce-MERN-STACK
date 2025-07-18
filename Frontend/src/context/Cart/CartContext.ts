import { createContext, useContext } from "react";
import type { CartItem } from "../../Types/CartItem";

interface CartContextType{
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
}


export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {}

});

export const useCart = () => useContext(CartContext);