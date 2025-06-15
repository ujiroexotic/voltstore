'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart") || "[]") as Product[];
    setCartItems(storedItems);
  }, []);

  const updateLocalStorage = (items: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity below 1

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, productId: string) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty)) {
      updateQuantity(productId, newQty);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent form submission reload
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl mb-4">Your Cart</h1>
        </header>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-4">
            {cartItems.length === 0 ? (
              <li className="text-3xl text-center text-gray-600">Your cart is empty.</li>
            ) : (
              cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=830&q=80"
                      }
                      alt={item.name || "Product image"}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      priority={false}
                    />
                    <div>
                      <h3 className="text-md font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form onSubmit={handleFormSubmit}>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(e, item.id)}
                        className="w-16 h-8 rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 text-center text-sm"
                      />
                    </form>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition duration-200"
                      aria-label={`Remove ${item.name} from cart`}
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
              <Link href="/checkout" passHref>
                <a className="block w-full py-2 px-4 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-200">
                  Proceed to Checkout
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
