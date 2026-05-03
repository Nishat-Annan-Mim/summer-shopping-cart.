"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import products from "@/data/products.json";

const BRANDS = [
  { name: "SunShade", logo: "🕶️", tagline: "See the world clearly" },
  { name: "GlowShield", logo: "🧴", tagline: "Protect your glow" },
  { name: "BeachVibes", logo: "👙", tagline: "Live the beach life" },
  { name: "SplashZone", logo: "🏖️", tagline: "Make a splash" },
];

const TIPS = [
  {
    icon: "🧴",
    title: "Apply Sunscreen",
    tip: "Apply SPF 30+ sunscreen 15 minutes before going outside. Reapply every 2 hours.",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    tip: "Drink at least 8 glasses of water daily. Carry a water bottle everywhere you go.",
  },
  {
    icon: "👒",
    title: "Wear a Hat",
    tip: "Wide-brim hats protect your face, neck, and ears from direct sunlight.",
  },
  {
    icon: "🕶️",
    title: "Protect Your Eyes",
    tip: "Wear UV-blocking sunglasses to protect your eyes from harmful rays.",
  },
];

const SLIDES = [
  {
    bg: "from-orange-400 to-yellow-300",
    headline: "☀️ Summer Sale",
    sub: "Up to 50% OFF on all summer essentials!",
    badge: "HOT DEAL 🔥",
  },
  {
    bg: "from-sky-400 to-cyan-300",
    headline: "🏖️ Beach Ready",
    sub: "Shop the trendiest beach gear this season",
    badge: "NEW ARRIVALS ✨",
  },
  {
    bg: "from-pink-400 to-rose-300",
    headline: "🧴 Skincare Glow",
    sub: "Premium skincare bundles starting at $12",
    badge: "BEST SELLERS ⭐",
  },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const popularProducts = products.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setVisibleCards([]);
    popularProducts.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, i]);
      }, i * 200);
    });
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <section
        className={`bg-gradient-to-r ${SLIDES[slide].bg} transition-all duration-700 min-h-[420px] flex items-center justify-center text-white`}
      >
        <div className="text-center px-4 animate__animated animate__fadeIn">
          <span className="badge badge-warning text-white font-bold mb-4 text-sm px-4 py-2 animate__animated animate__fadeInDown">
            {SLIDES[slide].badge}
          </span>
          <h1 className="text-5xl font-black mb-4 drop-shadow animate__animated animate__bounce animate__slow animate__infinite">
            {SLIDES[slide].headline}
          </h1>
          <p className="text-xl mb-8 text-white/90 animate__animated animate__fadeInUp animate__slow">
            {SLIDES[slide].sub}
          </p>
          <Link
            href="/products/1"
            className="btn btn-warning btn-lg text-white shadow-lg hover:scale-105 transition-transform animate__animated animate__pulse animate__infinite"
          >
            Shop Now 🛍️
          </Link>
        </div>
      </section>

      {/* Slide Dots */}
      <div className="flex justify-center gap-2 py-3 bg-base-100">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === slide ? "bg-orange-500 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Popular Products */}
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="sparkle-container mb-2">
              <span className="sparkle">✨</span>
              <span className="sparkle">⭐</span>
              <span className="sparkle">✨</span>
              <span className="sparkle">⭐</span>
              <span className="sparkle">✨</span>
              <h2 className="text-4xl font-black text-orange-500">
                🔥 Popular Products
              </h2>
            </div>
            <p className="text-gray-500">Top picks for this summer season</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {popularProducts.map((product, index) => (
              <div
                key={product.id}
                className={`card bg-white shadow-xl border border-orange-100 w-full md:w-[300px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:border-orange-300 ${
                  visibleCards.includes(index)
                    ? "animate__animated animate__fadeInUp opacity-100"
                    : "opacity-0"
                }`}
              >
                <figure className="h-52 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="badge badge-warning text-white text-xs">
                      {product.category}
                    </span>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold mt-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {"★".repeat(Math.round(product.rating))}
                    <span className="text-gray-500 text-sm ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">
                    ${product.price}
                  </p>
                  <div className="card-actions">
                    <Link
                      href={`/products/${product.id}`}
                      className="btn btn-warning btn-block text-white"
                    >
                      View Details 👀
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products/1"
              className="btn btn-outline btn-warning btn-lg animate__animated animate__pulse animate__infinite"
            >
              View All Products 🛍️
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-2 text-orange-500">
            🌞 Summer Care Tips
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Stay safe and stylish this summer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="card bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-2 text-center p-6 border border-yellow-100"
              >
                <div className="text-5xl mb-4 animate__animated animate__swing animate__infinite animate__slower">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-500 text-sm">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-2 text-orange-500">
            🏆 Top Brands
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Trusted by summer lovers worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BRANDS.map((brand, idx) => (
              <div
                key={idx}
                className="card bg-gradient-to-br from-orange-50 to-yellow-50 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 text-center p-6 border border-orange-100 cursor-pointer"
              >
                <div className="text-5xl mb-3 animate__animated animate__tada animate__infinite animate__slower">
                  {brand.logo}
                </div>
                <h3 className="font-bold text-gray-800">{brand.name}</h3>
                <p className="text-gray-500 text-xs mt-1">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
