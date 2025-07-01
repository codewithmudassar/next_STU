"use client"
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
const router = useRouter()
      const [formData, setFormData] = useState({
        title:"",
        desc:"",
        price:"",
        category:"",
        stock:""
    })
    const [ option,setOption] = useState([])
    
      const catFetch = async () => {
        try {
          
          const res = await axios.get("/api/category");
          setOption(res.data.categories);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch categories.");
        } 
      };
    
      useEffect(() => {
        catFetch();
      }, []);
      console.log(option)

    const [tempImages, setTempImages] = useState([]);
      

          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));}

            const [loading, setLoading] = useState(false);

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    
                    setLoading(true);
                    const res = axios.post("/api/product",{
                        ...formData,
                        images:tempImages
                    })
                    if (res?.success) {
        toast.success("Submitted successfully");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      } else {
        toast.error("Submission failed. Please try again.");
      }
                } catch (error) {
                    
                }finally{
                    setLoading(false);
                }
        
            }


  return (

        <>
      <div className="container mx-auto p-4">
        <Toaster />
        <div className="border rounded-lg bg-gray-200 mt-5 mb-7 p-4">
          {/* <BackButton /> */}
          <div className="text-blue-500 font-extrabold text-3xl text-center mb-5">
            Add Product
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="name">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                name="title"
                placeholder="Name"
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md border active:border-blue-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="stock">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md border active:border-blue-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="category">
                Category
              </label>
              <select
                className="mt-2 p-2 w-full rounded-md border active:border-blue-200"
                onChange={handleChange}
                name="category"
                required
              >
                <option value="">Select category</option>
                {option?.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md border active:border-blue-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="desc">
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                placeholder="Description"
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md border active:border-blue-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl text-gray-500" htmlFor="images">
                Images
              </label>
              <div className="mt-2">
                <CldUploadWidget
                  uploadPreset="sizzle_shop"
                  onSuccess={(results) => {
                    if (results.info?.secure_url && results.event === "success") {
                      setTempImages((prevImages) => [...prevImages, results.info.secure_url]);
                    }
                  }}
                  options={{ multiple: true }}
                >
                  {({ open }) => (
                    <button
                      className="font-bold p-2 bg-blue-500 text-white rounded-md"
                      type="button"
                      onClick={open}
                    >
                      Upload Images
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            {tempImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {tempImages.map((img, index) => (
                  <div key={index} className="relative w-[160px] h-[160px]">
                    <img
                      src={img}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setTempImages((prevImages) => prevImages.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <button
                className="mt-2 p-2 w-full rounded-md border font-bold uppercase text-white bg-blue-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page
