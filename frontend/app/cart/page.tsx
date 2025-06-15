"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
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
                    <div className="relative w-16 h-16">
                      <Image
                        src={
                          item.imageUrls || "https://via.placeholder.com/150?text=No+Image"
                        }
                        alt={item.name || "Product Image"}
                        fill
                        className="rounded-md object-cover"
                        sizes="64px"
                      />
                    </div>
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
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      className="w-16 h-8 rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 text-center text-sm"
                      aria-label="Quantity"
                    />
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
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
