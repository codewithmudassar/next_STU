"use client";
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
const router = useRouter()
  const [formData, setFormData] = useState({title:""})

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (error) setError(null);
    };
     const  handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const res = await axios.post("/api/category",{ ...formData })
        if(res.status === 201){
          toast.success("Category Created Successfully"),
          setFormData({title:""})
          setTimeout(() => {
              router.push("/admin/categories")
          }, 1000)
        }
      } catch (error) {
        toast.error("Something went wrong, please try again later")
        console.error("Error creating category:", error);
      }
     }
  return (
    <>
    <Toaster/>
    <div className='w-full h-[70vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-1/3 bg-white p-5 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-4'>Create Category</h1>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Category Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>
        <button type="submit" className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>Create Category</button>
      </form>
      </div>
    </>
  )
}

export default page
