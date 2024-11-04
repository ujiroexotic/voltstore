'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the structure of a product object
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Main component for displaying individual product details
const ProductPage = () => {
  // Use Next.js router to get dynamic route parameters (like product ID)
  const router = useRouter();
  const { id } = router.query; // Extract the product ID from the URL

  // State to hold the product data fetched from the API
  const [product, setProduct] = useState<Product | null>(null);
  // State to control the quantity of the product being added to the cart
  const [quantity, setQuantity] = useState(1);
  // State to check if the component has fully loaded on the client side
  const [isClient, setIsClient] = useState(false);
  // State to manage loading status while the product data is being fetched
  const [loading, setLoading] = useState(true);
  // State to store any error message if fetching data fails
  const [error, setError] = useState<string | null>(null);

  // Effect to ensure this code only runs on the client side
  useEffect(() => {
    setIsClient(true); // Setting isClient to true once the component has mounted on the client
  }, []);

  // Effect to fetch product data from the API whenever the product ID changes
  useEffect(() => {
    if (!id) return; // If no ID is present, do not fetch data

    // Function to fetch product details based on product ID from the API
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading to true while data is being fetched
        // API call to fetch product data; endpoint might need adjustment based on your backend setup
        const response = await fetch(`/api/products/${id}`);
        
        // Check if response is OK; throw error if not
        if (!response.ok) throw new Error("Failed to fetch product.");
        
        // Parse the JSON data from the response
        const data = await response.json();
        setProduct(data); // Set the product data in state
      } catch (error: any) {
        // If there's an error, set it in error state to display to user
        setError(error.message);
      } finally {
        // Set loading to false after data has been fetched (or if an error occurred)
        setLoading(false);
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]); // Runs this effect whenever the `id` changes

  // Function to handle adding the selected quantity of the product to the cart
  const handleAddToCart = () => {
    if (product) { // Check if product data is available
      console.log(`Added ${quantity} of ${product.name} to the cart`);
      // Here, you could add additional logic to update the cart state or local storage
    }
  };

  // Display loading message while data is being fetched
  if (loading) return <p className="text-center">Loading...</p>;
  // Display error message if there's an issue fetching the product data
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Return null if there's no product data (prevents component from rendering without data)
  if (!product) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-gray-900 py-10 px-4">
      {/* Main container for the product content */}
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
        
        {/* Display the product image */}
        <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Display the product details such as name, description, and price */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

          {/* Quantity Selector: Allows user to select the number of items to add to cart */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            {/* Decrease quantity button */}
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} // Prevent quantity from going below 1
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              -
            </button>
            {/* Display current quantity */}
            <span className="text-xl font-semibold text-gray-900">{quantity}</span>
            {/* Increase quantity button */}
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-900 font-bold text-xl hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            {/* Button to add product to cart */}
            <Button
              onClick={handleAddToCart}
              className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/70 transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart <ShoppingCart size={18} />
            </Button>
            {/* Button to proceed to checkout (only shows after client-side rendering) */}
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
