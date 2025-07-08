"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await axios.get("/api/category");
        setCategories(Array.isArray(res.data.categories) ? res.data.categories : []);
      } catch (err) {
        setCategories([]);
      }
      setCategoriesLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/product");
        setProducts(res.data.products);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category && p.category._id === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
          <button
            className={`px-4 py-2 rounded-full border ${selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {categoriesLoading ? (
            <span className="px-4 py-2 text-gray-400">Loading...</span>
          ) : (Array.isArray(categories) ? categories : []).map((cat) => (
            <button
              key={cat._id}
              className={`px-4 py-2 rounded-full border ${selectedCategory === cat._id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              {product.images && product.images.length > 0 && (
                <div className="flex gap-2 mb-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={product.title + " image " + (idx + 1)}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
              <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.desc}</p>
              <div className="text-xs text-gray-500 mb-2">
                Category: {product.category?.title || product.category}
              </div>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-blue-600 font-bold text-lg">${product.price}</span>
                <span className="text-xs text-gray-400">Stock: {product.stock}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop; 