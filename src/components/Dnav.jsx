"use client";

import React, { useState } from 'react';
import { Bell, HelpCircle } from 'lucide-react';

const Dnav = () => {
  return (
    <div className="bg-blue-500 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className='ml-120'>
          <p className="text-2xl md:text-4xl font-bold text-white">Sizzle Shop</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/20 rounded-full" aria-label="Help">
            <HelpCircle className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full" aria-label="Notifications">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dnav;
