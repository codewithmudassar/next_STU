"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import axios from "axios";

const DatePage = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [cat, setCat] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const catFetch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/category");
      setCat(res.data.categories);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    catFetch();
  }, []);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await axios.delete("/api/category", {
        data: { id: selectedCategory._id },
      });
      setCat((prev) => prev.filter((item) => item._id !== selectedCategory._id));
      setShowModal(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-6 w-full max-w-7xl mx-auto">
      <div className="border h-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm rounded px-6 py-4 gap-4 sm:gap-0">
        <div className="text-sm text-gray-700 font-medium">
          <p className="text-2xl font-bold">DATE</p>
          <p>{today}</p>
        </div>

        <Link href="/admin/categories/categoryForm">
          <p className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-400 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create Category</span>
          </p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Your Categories</h2>
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-blue-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cat.map((cat) => (
            <div key={cat._id} className="border rounded p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">{cat.title}</h3>
                <button
                  onClick={() => handleDeleteClick(cat)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirmation!</h2>
            <p className="mb-6 text-gray-700">
              Do you want to delete <strong>{selectedCategory.title}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedCategory(null);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePage;
