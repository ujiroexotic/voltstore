"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useCart } from "@/components/CartContext";

const ProductPage = () => {
  const { id } = useParams(); // To Extract product ID from URL
  const [product, setProduct] = useState<Product | null>(null); // To set the products to the data gotten from the api
  const [quantity, setQuantity] = useState(1); // By default the Add To Cart Button Adds One Quantity Except increased or decreased with the button
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch product.");

      const data = await response.json();
      setProduct(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} of ${product.name} to the cart`);
    }
  }; //Logs the quantity of the item added to the console

  if (loading) return <p className="text-center">Loading...</p>; //Return A Loading Text while the product is loading
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button onClick={() => fetchProduct()}>Retry</button>
      </div>
    ); //Render a Button To Refetch the Products if there is any error
  if (!product) return null; //Return null if the backend does not provide any product.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-gray-900 py-10 px-4">
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrls[2]}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              -
            </button>
            <span className="text-xl font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  quantity: 1,
                  name: product.name,
                  price: product.price,
                })
              }
              className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/70 transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart <ShoppingCart size={18} />
            </Button>
            <Link href="/checkout" passHref>
              <Button className="bg-foreground text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-foreground/70 transition-all duration-300 transform hover:scale-105">
                Buy Now <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
