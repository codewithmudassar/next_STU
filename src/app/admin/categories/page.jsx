// /pages/date.js
import React from 'react';
import Link from 'next/link';
import { Filter, Plus } from 'lucide-react';

const DatePage = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ✅ Moved here: Define your categories above the return()
  const categories = [
    { id: 1, title: 'Work', description: 'Office and job-related tasks' },
    { id: 2, title: 'Personal', description: 'Personal goals and reminders' },
    { id: 3, title: 'Shopping', description: 'Things to buy' },
    { id: 4, title: 'Fitness', description: 'Health and workout goals' },
  ];

  return (
    <div className="ml-11 mt-6 w-full max-w-270">
      {/* Top bar */}
      <div className="border h-[76px] w-full flex justify-between items-center bg-white shadow-sm rounded px-6">
        
        {/* Date Section */}
        <div className="text-sm text-gray-700 font-medium">
          <p className="text-2xl font-bold">DATE</p>
          {today}
        </div>

        {/* Category Section */}
        <div className="flex items-center pl-6 border-l border-gray-300 space-x-2">
          <p className="font-bold">CATEGORIES -</p>
          <p>Daily tasks</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <button className="flex items-center space-x-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {/* + Create Category Button */}
          <Link href="/admin/categories/categoryForm" passHref legacyBehavior>
            <a className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Create Category</span>
            </a>
          </Link>
        </div>
      </div>

      {/* ✅ Category List Section Below */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="border rounded p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePage;
