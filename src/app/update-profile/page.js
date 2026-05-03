"use client";
import React, { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: name,
        image: image,
      });
      toast.success("Profile updated successfully! 🎉");
      router.push("/my-profile");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 animate__animated animate__fadeIn">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">✏️</div>
          <h1 className="text-3xl font-black text-orange-500">
            Update Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Update your name and photo
          </p>
        </div>

        {/* Live Preview */}
        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-orange-400 ring-offset-4">
              <img
                src={
                  image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=f97316&color=fff&size=200`
                }
                alt="Preview"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=f97316&color=fff&size=200`;
                }}
              />
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mb-6">
          Live preview updates as you type
        </p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Photo URL{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://your-photo-url.com/photo.jpg"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg transition-colors mt-1"
          >
            {loading ? "Updating..." : "Update Information ✅"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            href="/my-profile"
            className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 flex items-center justify-center font-semibold text-gray-600 transition-colors mt-3"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
