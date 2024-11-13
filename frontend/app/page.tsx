"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { useCart } from "@/components/CartContext"; // Adjust the import path as needed
import { Product } from "@/types/products";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApiSlice";
import { Category } from "@/types/catgories";

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  console.log(categories);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [categoryImageUrls, setCategoryImageUrls] = useState<{
    [key: string]: string;
  }>({});
  useEffect(() => {
    if (products.length > 0) {
      const urls: { [key: string]: string } = {};
      products.forEach((product: Product) => {
        if (product.imageUrls && product.imageUrls[0]?.data) {
          const blob = new Blob([new Uint8Array(product.imageUrls[0].data)], {
            type: product.imageUrls[0].type,
          });
          const url = URL.createObjectURL(blob);
          urls[product._id] = url;
        }
      });
      setImageUrls(urls);

      // Clean up object URLs when component unmounts
      return () => {
        Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [products]);

  useEffect(() => {
    if (categories.length > 0) {
      const urls: { [key: string]: string } = {};
      categories.forEach((category: Category) => {
        if (category.imageUrl && category.imageUrl?.data) {
          const blob = new Blob([new Uint8Array(category.imageUrl.data.data)], {
            type: category.imageUrl.contentType,
          });
          const url = URL.createObjectURL(blob);
          urls[category._id] = url;
        }
      });
      setCategoryImageUrls(urls);

      // Clean up object URLs when component unmounts
      return () => {
        Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [categories]);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-background text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-cover bg-center">
        <h1 className="text-5xl font-bold text-white leading-tight">
          Discover Premium Products <br /> At Unbeatable Prices
          <p>
            Only At <span className="text-primary">VoltStore</span>
          </p>
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
      {/* Categories */}
      <section className="py-16 px-6">
        <h2 className="text-center text-4xl font-semibold text-white mb-10">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {categories ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="group rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative w-full h-64">
                  {categoryImageUrls[category._id] ? (
                    <Image
                      src={categoryImageUrls[category._id]}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Image not available</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 truncate max-w-full mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 h-12 overflow-hidden">
                    {category.description}
                  </p>
                  <Link href={`/collection?category=${category._id}`}>
                    <Button className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 transform hover:scale-105">
                      View Products
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-200">
              Loading categories...
            </p>
          )}
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-center text-4xl font-semibold text-white mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {isLoading ? (
            <p className="text-center text-lg text-gray-200">
              Loading products...
            </p>
          ) : error ? (
            <p className="text-center text-lg text-gray-200">
              Error loading products.
            </p>
          ) : (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="group rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative w-full h-64">
                  {imageUrls[product._id] ? (
                    <Image
                      src={imageUrls[product._id]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Image not available</p>
                    </div>
                  )}
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
                        price: product.price,
                        imageUrls: imageUrls[product._id],
                      })
                    }
                    className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart <ShoppingCart className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
