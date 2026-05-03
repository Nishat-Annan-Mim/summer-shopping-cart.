"use client";
import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useStore } from "@/lib/store";
import products from "@/data/products.json";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { addToCart, addToWishlist, placeOrder } = useStore();
  const product = products.find((p) => p.id === parseInt(id));
  const hasToasted = useRef(false);

  useEffect(() => {
    if (!isPending && !session) {
      if (!hasToasted.current) {
        hasToasted.current = true;
        toast.error("Please login to view product details. 🔒");
      }
      router.push(`/login`);
    }
  }, [session, isPending]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!session) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">😢</div>
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/" className="btn btn-warning text-white">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="btn btn-ghost mb-6">
          ← Back to Home
        </Link>
        <div className="card bg-white shadow-2xl lg:card-side animate__animated animate__fadeIn">
          <figure className="lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover max-h-96 lg:max-h-full"
            />
          </figure>
          <div className="card-body lg:w-1/2 p-8">
            <span className="badge badge-warning text-white">
              {product.category}
            </span>
            <h2 className="card-title text-3xl font-black text-gray-800 mt-2">
              {product.name}
            </h2>
            <p className="text-gray-500 font-medium">by {product.brand}</p>

            <div className="flex items-center gap-2 my-2">
              <div className="flex text-yellow-400 text-xl">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-gray-500">({product.rating}/5)</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="divider"></div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-4xl font-black text-orange-500">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-400">Free shipping over $50</p>
              </div>
              <div
                className={`badge ${product.stock > 5 ? "badge-success" : "badge-warning"} text-white p-3`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </div>
            </div>

            <div className="card-actions mt-4">
              <button
                className="btn btn-warning btn-block text-white text-lg"
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart! 🛒");
                }}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn btn-outline btn-warning btn-block"
                onClick={() => {
                  addToWishlist(product);
                  toast.success("Added to wishlist! ❤️");
                }}
              >
                ❤️ Add to Wishlist
              </button>
              <button
                className="btn btn-success btn-block text-white"
                onClick={() => {
                  placeOrder(product);
                  toast.success("Order placed! 📦");
                }}
              >
                📦 Place Order
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-black text-orange-500 mb-8 text-center">
            🛍️ All Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className={`card bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 ${p.id === product.id ? "ring-2 ring-orange-400" : ""}`}
              >
                <figure className="h-40 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <p className="text-orange-500 font-bold">${p.price}</p>
                  <Link
                    href={`/products/${p.id}`}
                    className="btn btn-warning btn-xs text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
