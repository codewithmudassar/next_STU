"use client";
import axios from "axios";
import { SquarePen, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      toast.error("Failed to fetch categories.");
    }
  };

  // Fetch all products
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/product");
      if (res.data.success) {
        setAllProducts(res.data.products);
        setFilteredProducts(res.data.products); // default
      }
    } catch (err) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/product/${id}`);
      toast.success("Product deleted successfully");
      // Remove from local state
      const updated = allProducts.filter((p) => p._id !== id);
      setAllProducts(updated);
      setFilteredProducts(
        selectedCategory
          ? updated.filter((p) => p.category?._id === selectedCategory)
          : updated
      );
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) => product.category?._id === categoryId);
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((v, i) => (
              <tr key={i} className="bg-white border-b">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                  <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        v.images[0] ||
                        "https://github.com/scriptwithahmad/u-shop-2.0/blob/main/public/user.jpeg?raw=true"
                      }
                      alt="Product"
                    />
                  </div>
                  {v?.title}
                </th>
                <td className="px-6 py-4">{v?.stock}</td>
                <td className="px-6 py-4">{v?.category?.title || "N/A"}</td>
                <td className="px-6 py-4">${v?.price}</td>
                <td className="px-9 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2Icon />
                    </button>
                    <Link href={`/admin/products/${v._id}`} className="text-blue-500 hover:underline">
                      <SquarePen/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}
      </div>
    </div>
  );
};

export default Page;
