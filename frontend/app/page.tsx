import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="bg-background text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900 text-white">
        <Image
          src="/hero.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-bold">Discover the Future of Fashion</h1>
          <p className="mt-4 text-lg">
            Elevate your style with the latest trends from VoltStore.
          </p>
          <Link href="/collection">
            <Button className="mt-6 px-8 py-3 bg-primary text-white text-lg hover:bg-secondary transition">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product Card Start */}
          {["product1.jpg", "product2.jpg", "product3.jpg", "product4.jpg"].map(
            (product, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={`/${product}`}
                    alt={`Product ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-lg font-medium">Product Name</h3>
                <p className="text-gray-500">$99.99</p>
                <Button className="mt-4 w-full flex items-center justify-center bg-primary text-white hover:bg-secondary transition">
                  Add to Cart <ShoppingCart className="ml-2" size={18} />
                </Button>
              </div>
            )
          )}
          {/* Product Card End */}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="group relative">
            <Image
              src="/category1.jpg"
              alt="Category 1"
              width={600}
              height={400}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            <Link href="/category/men">
              <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Men
              </span>
            </Link>
          </div>

          <div className="group relative">
            <Image
              src="/category2.jpg"
              alt="Category 2"
              width={600}
              height={400}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            <Link href="/category/women">
              <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Women
              </span>
            </Link>
          </div>

          <div className="group relative">
            <Image
              src="/category3.jpg"
              alt="Category 3"
              width={600}
              height={400}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            <Link href="/category/accessories">
              <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Accessories
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <h2 className="text-center text-3xl font-semibold mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "VoltStore has completely changed my wardrobe! The styles are
              unique, and the quality is amazing."
            </p>
            <h3 className="mt-4 font-semibold">- Jane Doe</h3>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "The customer service at VoltStore is top-notch. I highly
              recommend them!"
            </p>
            <h3 className="mt-4 font-semibold">- John Smith</h3>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "I can't get enough of the accessories collection. Every piece
              feels special!"
            </p>
            <h3 className="mt-4 font-semibold">- Alice Johnson</h3>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Stay Updated</h2>
          <p className="mt-4 text-lg">
            Sign up for our newsletter to get the latest news and deals!
          </p>
          <form className="mt-8 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-2/3 sm:w-1/3 bg-white text-gray-900 rounded-l-lg focus:outline-none"
            />
            <Button className="px-6 py-2 bg-primary text-white rounded-r-lg hover:bg-secondary transition">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 bg-gray-800 text-gray-400">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white">VoltStore</h3>
            <p className="mt-4 text-sm">
              Your one-stop shop for the latest fashion trends.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
