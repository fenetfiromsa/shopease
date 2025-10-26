import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

import ProductCard from "../components/ProductCard";
import { Sparkles } from "lucide-react";

function HomePage() {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setNewProducts(res.data.products.slice(0, 8)); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/*  HERO SECTION */}
      <div className="relative bg-gradient-to-r from-blue-600  via-indigo-600 to-purple-600 mt-10 text-white py-20 sm:py-28 text-center h-full overflow-hidden">
        <div className="absolute mt-[600px] inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10 "></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 mb-10 ">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in pt-28">
            Welcome to <span className="text-yellow-300">ShopEase</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Your one-stop shop for the latest and greatest products — all in one place.
          </p>
          <a
            href="#new-arrivals"
            className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-300 transition-all"
          >
            🛒 Shop Now
          </a>
        </div>

       
        <div className="absolute top-10 right-10 animate-pulse opacity-70">
          <Sparkles size={40} />
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <section id="new-arrivals" className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            ✨ New Arrivals
          </h2>
          <p className="text-gray-500">
            Check out the latest additions hand-picked for you.
          </p>
        </div>

        {newProducts.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Loading fresh arrivals...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {newProducts.map((product) => (
              <div
                key={product._id}
                className="transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/*  ABOUT US SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">ShopEase</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            At <strong>ShopEase</strong>, we believe shopping should be fun,
            easy, and reliable. From the latest tech gadgets to trending fashion
            and home essentials, we bring you only the best products at
            unbeatable prices. Enjoy fast delivery, secure payments, and
            world-class support — because you deserve the best.
          </p>

          <a
            href="/about"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow hover:bg-blue-700 transition-all font-medium"
          >
            Learn More →
          </a>
        </div>
      </section>

     
      
    </div>
  );
}

export default HomePage;
