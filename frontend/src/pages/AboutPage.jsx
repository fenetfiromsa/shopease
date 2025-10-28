import React from "react";
import { ShoppingBag, Truck, Shield, Smile } from "lucide-react";

function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen mt-14">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4">
            About <span className="text-yellow-300">ShopEase</span>
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Making online shopping simple, safe, and satisfying for everyone.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
            <strong>ShopEase</strong> is your trusted online supermarket, designed to make everyday shopping faster, simpler, and 
            more affordable. From fresh produce and pantry staples to household essentials and personal care items,
            we’ve got everything you need under one virtual roof.
            Enjoy a wide selection of quality products, reliable delivery, and secure checkout — all to make your grocery shopping effortless and convenient.
          </p>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Core Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <ShoppingBag className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">
                We handpick only the best items that meet our high standards for
                quality and value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <Truck className="mx-auto text-green-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Enjoy quick and reliable delivery options no matter where you are.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <Shield className="mx-auto text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Shopping</h3>
              <p className="text-gray-600 text-sm">
                Your data and payments are protected with top-grade security systems.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <Smile className="mx-auto text-yellow-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">
                Our mission is to make every customer experience smooth and satisfying.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To redefine the online shopping experience by combining simplicity,
            trust, and innovation. We aim to connect customers with top-quality
            products while ensuring secure transactions, transparent pricing, and
            reliable delivery — every time.
          </p>
        </div>
      </section>

      
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Join thousands of happy customers today!
        </h2>
        <a
          href="/products"
          className="inline-block bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full shadow hover:bg-yellow-300 transition-all"
        >
          🛒 Start Shopping
        </a>
      </section>
    </div>
  );
}

export default AboutPage;
