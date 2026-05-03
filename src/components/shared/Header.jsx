"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Header = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <div className="navbar bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg px-4 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products/1">Products</Link>
            </li>
            {session && (
              <li>
                <Link href="/my-profile">My Profile</Link>
              </li>
            )}
          </ul>
        </div>
        <Link
          href="/"
          className="text-white font-bold text-2xl flex items-center gap-2"
        >
          ☀️ SunCart
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white font-medium">
          <li>
            <Link href="/" className="hover:bg-orange-500 rounded-lg">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products/1" className="hover:bg-orange-500 rounded-lg">
              Products
            </Link>
          </li>
          {session && (
            <li>
              <Link
                href="/my-profile"
                className="hover:bg-orange-500 rounded-lg"
              >
                My Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm text-white"></span>
        ) : session ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-white ring-offset-1">
                <img
                  src={
                    session.user?.image ||
                    `https://ui-avatars.com/api/?name=${session.user?.name}&background=f97316&color=fff`
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-white text-orange-500 hover:bg-orange-100 border-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="btn btn-sm bg-white text-orange-500 hover:bg-orange-100 border-none"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-sm bg-orange-600 text-white hover:bg-orange-700 border-none"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
