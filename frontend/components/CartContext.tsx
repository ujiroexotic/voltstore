"use client";

import { createContext, useContext, useState } from "react";

// Define cart item type
type CartItem = {
  _id: string;
  name: string;
  price: any;
  quantity: number;
  imageUrls: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  getCartItemCount: () => number;
  updateQuantity: (productId: string, amount: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        console.log(
          `Updated ${existingItem.name} quantity to ${
            existingItem.quantity + item.quantity
          }`
        );
        return prevItems.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      console.log(`Added ${item.quantity} of ${item.name} to the cart`);
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const updateQuantity = (productId: string, amount: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartItemCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
