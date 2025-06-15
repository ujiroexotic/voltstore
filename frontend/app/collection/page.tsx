"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { Product } from "@/types/products";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";

const CollectionPage = () => {
  const { addToCart } = useCart();
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

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

      return () => {
        Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [products]);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 min-h-screen text-gray-900">
      <h1 className="text-center text-4xl font-bold text-white py-10">
        Our Collection
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center text-white py-20">
          Loading...
        </div>
      )}

      {error && (
        <p className="text-center text-red-400">Failed to load products</p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-16">
          {products.map((product) => (
            <div
              key={product._id}
              className="group rounded-lg overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105"
            >
              <Link
                href={`/collection/${product._id}`}
                className="relative w-full h-64 block"
              >
                {imageUrls[product._id] && (
                  <Image
                    src={imageUrls[product._id]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </Link>
              <div className="p-4 text-center">
                <h2
                  className="text-lg font-semibold text-gray-800 truncate"
                  title={product.description}
                >
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                <p
                  className={`text-sm mt-1 ${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
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
                  className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 hover:scale-105"
                  disabled={product.stock === 0}
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

