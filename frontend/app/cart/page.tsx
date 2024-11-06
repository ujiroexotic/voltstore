// components/Cart.tsx
"use client";

import { useCart } from "@/components/CartContext"; // Import the cart context
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Get cart items and context functions
  console.log(cartItems);
  return (
    <>
      <section className="bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl mb-4">
              Your Cart
            </h1>
          </header>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {cartItems.length === 0 ? (
                <li className="text-3xl text-center text-gray-600">
                  Your cart is empty.
                </li>
              ) : (
                cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.imageUrls ||
                          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=830&q=80"
                        } // Use item image source here
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="text-md font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <form>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item._id,
                              parseInt(e.target.value) - item.quantity
                            )
                          }
                          className="w-16 h-8 rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 text-center text-sm"
                        />
                      </form>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800 transition duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {cartItems.length > 0 && (
              <div className="mt-6">
                <Link href="/checkout">
                  <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/80 transition duration-200">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
