"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load data from MongoDB when user logs in
  useEffect(() => {
    if (session?.user) {
      fetchAll();
    } else {
      setCart([]);
      setWishlist([]);
      setOrders([]);
      setLoaded(false);
    }
  }, [session]);

  const fetchAll = async () => {
    try {
      const [cartRes, wishlistRes, ordersRes] = await Promise.all([
        fetch("/api/user/cart"),
        fetch("/api/user/wishlist"),
        fetch("/api/user/orders"),
      ]);
      const cartData = await cartRes.json();
      const wishlistData = await wishlistRes.json();
      const ordersData = await ordersRes.json();

      setCart(cartData.items || []);
      setWishlist(wishlistData.items || []);
      setOrders(ordersData.items || []);
      setLoaded(true);
    } catch (err) {
      console.error("Failed to load user data", err);
    }
  };

  const saveCart = async (newCart) => {
    setCart(newCart);
    if (session?.user) {
      await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newCart }),
      });
    }
  };

  const saveWishlist = async (newWishlist) => {
    setWishlist(newWishlist);
    if (session?.user) {
      await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newWishlist }),
      });
    }
  };

  const saveOrders = async (newOrders) => {
    setOrders(newOrders);
    if (session?.user) {
      await fetch("/api/user/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newOrders }),
      });
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) return;
    const newCart = [...cart, product];
    saveCart(newCart);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) return;
    const newWishlist = [...wishlist, product];
    saveWishlist(newWishlist);
  };

  const placeOrder = (product) => {
    const newOrders = [...orders, product];
    saveOrders(newOrders);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((p) => p.id !== productId);
    saveCart(newCart);
  };

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlist.filter((p) => p.id !== productId);
    saveWishlist(newWishlist);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        loaded,
        addToCart,
        addToWishlist,
        placeOrder,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
