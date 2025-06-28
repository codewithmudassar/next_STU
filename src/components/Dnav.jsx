"use client";

import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Dnav = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim() === '') return;
    alert(`Searching for: ${search}`);
  };

  return (
    <div className="bg-gray-100 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Welcome Text */}
        <div>
          <p className="text-xl md:text-2xl">Welcome,</p>
          <p className="text-2xl md:text-3xl font-bold">Sizzle Shop</p>
        </div>

        {/* Middle: Responsive Search Bar */}
        <div className="flex items-center border rounded px-3 py-1 bg-white w-full md:w-1/2 lg:w-2/3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands, or categories..."
            className="w-full outline-none text-sm text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="ml-2 p-1 hover:bg-gray-200 rounded"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full" aria-label="Help">
            <HelpCircle className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full" aria-label="Notifications">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dnav;
