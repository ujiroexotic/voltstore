"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext"; // Adjust the import path as needed

const HomePage = () => {
  type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    imageUrls: string[];
  };

  const { addToCart, getCartItemCount } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-background text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-cover bg-center">
        <h1 className="text-5xl font-bold text-white leading-tight">
          Discover Premium Products <br /> At Unbeatable Prices
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-lg mx-auto">
          Upgrade your lifestyle with exclusive items curated just for you.
        </p>
        <Link href="/collection">
          <div className="mt-6 px-10 py-4 bg-primary text-white text-xl rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 cursor-pointer">
            Shop Now <ArrowRight size={20} />
          </div>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-center text-4xl font-semibold text-white mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="group rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={product.imageUrls[2]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 truncate max-w-full mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 h-12 overflow-hidden">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-gray-800 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button
                    onClick={() =>
                      addToCart({
                        _id: product._id,
                        quantity: 1,
                        name: product.name,
                        price: product.price
                      })
                    }
                    className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart <ShoppingCart className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-200">
              Loading products...
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
