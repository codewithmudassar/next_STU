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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

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
        setFilteredProducts(res.data.products);
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
      const updated = allProducts.filter((p) => p._id !== id);
      setAllProducts(updated);
      applyFilters(searchQuery, selectedCategory, updated);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    applyFilters(searchQuery, categoryId);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
    applyFilters(query, selectedCategory);
  };

  const applyFilters = (query, categoryId, productList = allProducts) => {
    let filtered = productList;

    if (categoryId) {
      filtered = filtered.filter((p) => p.category?._id === categoryId);
    }

    if (query) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 px-3 py-2 rounded-md w-1/2"
        />
        <div className="flex items-center">

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
       
<Link 
href={"/admin/products/form"}
  title="Add New"
  class="group cursor-pointer outline-none hover:rotate-90 duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    class="stroke-blue-400 fill-none  group-active:stroke-blue-100 group-active:fill-blue-200 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg>
</Link>

        </div>
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
            {paginatedProducts.map((v, i) => (
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
                      <SquarePen />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}
        {!loading && filteredProducts.length === 0 && (
          <p className="mt-4 text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex justify-center mt-6 space-x-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 border rounded-md ${
        currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    <span className="px-4 py-2 border rounded-md bg-white">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 border rounded-md ${
        currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
)}

    </div>
  );
};

export default Page;
