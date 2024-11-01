'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data (replace with actual fetch or props later)
const product = {
  id: "1",
  name: "Premium Headphones",
  description: "Experience immersive sound with these high-quality headphones.",
  price: 99.99,
  image: "/product1.jpg",
};

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only set to true after the component has mounted
  }, []);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to the cart`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-gray-900 py-10 px-4">
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              -
            </button>
            <span className="text-xl font-semibold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={handleAddToCart}
              className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/70 transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart <ShoppingCart size={18} />
            </Button>
            {isClient && (
              <Link href="/checkout" passHref>
                <Button className="bg-foreground text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-foreground/70 transition-all duration-300 transform hover:scale-105">
                  Buy Now <ArrowRight size={18} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
