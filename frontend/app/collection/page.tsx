import Image from "next/image";
import Link from "next/link";

const products = [
  { id: "1", name: "Product 1", price: "$49.99", image: "/product1.jpg" },
  { id: "2", name: "Product 2", price: "$59.99", image: "/product2.jpg" },
  { id: "3", name: "Product 3", price: "$39.99", image: "/product3.jpg" },
  { id: "4", name: "Product 4", price: "$69.99", image: "/product4.jpg" },
  // Add as many products as needed
];

const CollectionPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-gray-900 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white py-10">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-16">
        {products.map((product) => (
          <Link key={product.id} href={`/collection/${product.id}`} className="group">
            <div className="rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 bg-white">
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
