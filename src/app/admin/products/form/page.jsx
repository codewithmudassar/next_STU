"use client"
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Card,
  Spinner,
} from "flowbite-react";

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

    const [tempImages, setTempImages] = useState([]);
      

          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));}

            const [loading, setLoading] = useState(false);

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    
                    setLoading(true);
                    const res = await axios.post("/api/product",{
                        ...formData,
                        images:tempImages
                    })

                    if (res?.data.success) {
        toast.success("Submitted successfully");
        setTimeout(() => {
          router.push("/shop");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-blue-400">
        <Card className="w-full max-w-2xl p-8 shadow-xl bg-white">
          <Toaster />
          <h2 className="text-blue-600 font-extrabold text-4xl text-center mb-8">Add Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Label htmlFor="name" value="Product Name" className="text-lg" />
              <TextInput
                id="name"
                type="text"
                name="title"
                placeholder="Name"
                onChange={handleChange}
                required
                shadow
                sizing="lg"
              />
            </div>
            <div>
              <Label htmlFor="stock" value="Stock" className="text-lg" />
              <TextInput
                id="stock"
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                required
                shadow
                sizing="lg"
              />
            </div>
            <div>
              <Label htmlFor="category" value="Category" className="text-lg" />
              <Select
                id="category"
                name="category"
                onChange={handleChange}
                required
                sizing="lg"
              >
                <option value="">Select category</option>
                {option?.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.title}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="price" value="Price" className="text-lg" />
              <TextInput
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                required
                shadow
                sizing="lg"
              />
            </div>
            <div>
              <Label htmlFor="desc" value="Description" className="text-lg" />
              <Textarea
                id="desc"
                name="desc"
                placeholder="Description"
                onChange={handleChange}
                required
                rows={4}
                shadow
              />
            </div>
            <div>
              <Label htmlFor="images" value="Images" className="text-lg" />
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
                    <Button
                      color="info"
                      type="button"
                      onClick={open}
                      className="font-bold"
                    >
                      Upload Images
                    </Button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
            {tempImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {tempImages.map((img, index) => (
                  <div key={index} className="relative w-[120px] h-[120px]">
                    <img
                      src={img}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200 shadow"
                    />
                    <Button
                      color="failure"
                      size="xs"
                      onClick={() => setTempImages((prevImages) => prevImages.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 rounded-full p-1"
                      type="button"
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              type="submit"
              color="blue"
              size="lg"
              className="mt-6 font-bold text-lg bg-black p-3"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" className="mr-2" /> : null}
              {loading ? "Submitting..." : "Add Product"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default page
