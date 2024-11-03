// components/Cart.tsx
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart") || "[]") as Product[];
    setCartItems(storedItems);
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // If product exists, increase quantity
      updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new product with quantity 1
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId: string, amount: number) => {
    const updatedCart = cartItems
      .map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </div>
        ))
      )}
      <Link href="/checkout">
        <Button>Proceed to Checkout</Button>
      </Link>
    </div>
  );
};

export default Cart;
