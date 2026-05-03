"use client";
import React, { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const { cart, wishlist, orders, loaded, removeFromCart, removeFromWishlist } =
    useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending]);

  if (isPending || (!loaded && session)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-white shadow-2xl animate__animated animate__fadeInDown">
          <div className="card-body p-8 text-center">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-orange-400 ring-offset-4">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=f97316&color=fff&size=200`
                    }
                    alt="Profile"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-black text-gray-800 mb-1">
              {user.name}
            </h1>
            <p className="text-gray-500 text-lg mb-6">{user.email}</p>

            <div className="divider"></div>

            {/* Stats */}
            <div className="stats shadow w-full mb-6">
              <div className="stat">
                <div className="stat-figure text-orange-400 text-3xl">📦</div>
                <div className="stat-title">Orders</div>
                <div className="stat-value text-orange-500">
                  {orders.length}
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-yellow-400 text-3xl">❤️</div>
                <div className="stat-title">Wishlist</div>
                <div className="stat-value text-yellow-500">
                  {wishlist.length}
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-green-400 text-3xl">🛒</div>
                <div className="stat-title">Cart</div>
                <div className="stat-value text-green-500">{cart.length}</div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="bg-orange-50 rounded-2xl p-6 text-left space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-orange-400 text-xl">👤</span>
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-orange-400 text-xl">📧</span>
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-orange-400 text-xl">✅</span>
                <div>
                  <p className="text-xs text-gray-400">Account Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            {cart.length > 0 && (
              <div className="bg-green-50 rounded-2xl p-4 text-left mb-4">
                <h3 className="font-bold text-green-700 mb-3">
                  🛒 Cart Items ({cart.length})
                </h3>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b border-green-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded object-cover"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-orange-500 text-sm">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-lg font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Items */}
            {wishlist.length > 0 && (
              <div className="bg-pink-50 rounded-2xl p-4 text-left mb-4">
                <h3 className="font-bold text-pink-700 mb-3">
                  ❤️ Wishlist ({wishlist.length})
                </h3>
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b border-pink-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded object-cover"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-orange-500 text-sm">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-400 hover:text-red-600 text-lg font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Orders */}
            {orders.length > 0 && (
              <div className="bg-orange-50 rounded-2xl p-4 text-left mb-4">
                <h3 className="font-bold text-orange-700 mb-3">
                  📦 Orders ({orders.length})
                </h3>
                {orders.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 border-b border-orange-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded object-cover"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-orange-500 text-sm">${item.price}</p>
                    </div>
                    <span className="badge badge-success text-white text-xs">
                      Ordered
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/update-profile"
              className="btn btn-warning btn-block text-white text-lg"
            >
              ✏️ Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
