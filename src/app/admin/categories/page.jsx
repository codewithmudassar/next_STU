// /pages/date.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Filter, Plus } from 'lucide-react';
import axios from 'axios';

const DatePage = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });



  const [cat,setCat ] = useState([])
   const catFetch = async () => {
    try {
      const res = await axios.get("/api/category");
      const data = await res.data.categories;
      setCat(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blog data.");
    } finally {
      setIsLoading(false);
    }
  };
   useEffect(() => {
    catFetch();
  }, []);
console.log(cat)
  return (
    <div className="ml-11 mt-6 w-full max-w-270">
      {/* Top bar */}
      <div className="border h-[76px] w-full flex justify-between items-center bg-white shadow-sm rounded px-6">
        
        {/* Date Section */}
        <div className="text-sm text-gray-700 font-medium">
          <p className="text-2xl font-bold">DATE</p>
          {today}
        </div>

      

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">

          {/* + Create Category Button */}
          <Link href="/admin/categories/categoryForm" >
            <p className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Create Category</span>
            </p>
          </Link>
        </div>
      </div>

      {/* ✅ Category List Section Below */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cat.map((cat) => (
            <div key={cat.id} className="border rounded p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePage;
