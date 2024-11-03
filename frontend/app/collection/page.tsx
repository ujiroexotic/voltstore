"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext"; // Ensure this path is correct

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

const CollectionPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products.");
        
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-gray-900 min-h-screen">
      <nav className="text-white text-sm mb-4 px-6">
        <Link href="/">Home</Link> / <span>Collection</span>
      </nav>
      <h1 className="text-center text-4xl font-bold text-white py-10">Our Collection</h1>

      {isLoading && (
        <div className="flex justify-center items-center text-white py-20">
          Loading...
        </div>
      )}

      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-16">
          {products.map((product) => (
            <div key={product._id} className="group rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 bg-white">
              <Link href={`/collection/${product._id}`} className="relative w-full h-64 block">
                <Image
                  src={product.imageUrls[2] || "/fallback-image.jpg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 truncate max-w-full" title={product.description}>
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                <p className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-red-500"} mt-1`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <Button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      quantity: 1,
                      name: "",
                      price: undefined
                    })
                  }
                  className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
                  disabled={product.stock === 0} // Disable button if out of stock
                >
                  Add to Cart <ShoppingCart className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
