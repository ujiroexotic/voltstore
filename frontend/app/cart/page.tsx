// components/Cart.tsx
'use client';

import { useCart } from "@/components/CartContext"; // Import the cart context
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Get cart items and context functions
  console.log(cartItems);
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className="cart-item flex justify-between items-center mb-4 p-4 border-b">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <div className="quantity-controls flex items-center">
              <button 
                onClick={() => updateQuantity(item._id, -1)} 
                disabled={item.quantity === 1} // Disable if quantity is 1
                className="bg-gray-300 hover:bg-gray-400 text-black px-2 rounded"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item._id, 1)} 
                className="bg-gray-300 hover:bg-gray-400 text-black px-2 rounded"
              >
                +
              </button>
            </div>
            <Button onClick={() => removeFromCart(item._id)} className="bg-red-500 text-white">
              Remove
            </Button>
          </div>
        ))
      )}
      <div className="mt-4">
        <Link href="/checkout">
          <Button className="bg-blue-500 text-white">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
