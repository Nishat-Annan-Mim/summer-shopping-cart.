import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
      <div className="footer p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-2xl font-bold">☀️ SunCart</span>
          <p className="mt-2 text-orange-100">
            Your one-stop shop for all summer essentials. Beat the heat in
            style!
          </p>
        </div>
        <div>
          <span className="footer-title text-white opacity-100 font-bold">
            Contact
          </span>
          <p className="text-orange-100">📧 support@suncart.com</p>
          <p className="text-orange-100">📞 +1 (800) SUN-CART</p>
          <p className="text-orange-100">📍 Miami Beach, FL 33139</p>
        </div>
        <div>
          <span className="footer-title text-white opacity-100 font-bold">
            Legal & Social
          </span>
          <Link href="#" className="link link-hover text-orange-100">
            Privacy Policy
          </Link>
          <Link href="#" className="link link-hover text-orange-100">
            Terms of Service
          </Link>
          <div className="flex gap-3 mt-2">
            <a href="#" className="text-white hover:text-orange-200 text-xl">
              📘
            </a>
            <a href="#" className="text-white hover:text-orange-200 text-xl">
              🐦
            </a>
            <a href="#" className="text-white hover:text-orange-200 text-xl">
              📸
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-orange-100 text-sm border-t border-orange-400">
        © 2025 SunCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
