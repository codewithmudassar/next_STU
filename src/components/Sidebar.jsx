"use client"
import {
  AlignEndHorizontal,
  ChartArea,
  ChevronsLeft,
  ChevronsRight,
  House,
  ListOrdered,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {

const [expand,setExpand] = useState(true)
const toggleSidebar = ()=>{
    setExpand(!expand)
}


    const pathname = usePathname();
  const links = [
    { path: "/admin", lable: "Dashboard", icon: <House /> },
    { path: "/admin/users", lable: "Users", icon: <Users /> },
    {
      path: "/admin/products",
      lable: "Products",
      icon: <AlignEndHorizontal />,
    },
    { path: "/admin/orders", lable: "Orders", icon: <ListOrdered /> },
    { path: "/admin/categories", lable: "Categories", icon: <ChartArea /> },
  ];

  return (
    <div className={` ${expand ?"w-56":"w-20"} border-r border-blue-500 h-screen transition-all duration-700 relative `}>
      <h1 className={` text-blue-500 flex justify-center font-bold mb-5 pt-2 ${expand ?"text-2xl":"text-lg mb-6"}`}>
        Sizzle Shop
      </h1>
      <div className="flex flex-col gap-5 p-3">
        {links.map((v, i) => (
          <Link href={v.path} key={i} className={`flex gap-4 p-2 ${!expand?" pl-3":""} rounded-md cursor-pointer border border-blue-500 hover:bg-blue-400 hover:text-white ${pathname === v.path ?"bg-blue-500 text-white":"text-blue-500"}`}>
            <div>{v.icon}</div>
            <p
  className={`transition-all duration-300 origin-left ${
    expand ? "opacity-100 scale-100" : "opacity-0 scale-0"
  }`}
>
  {v.lable}
</p>
          </Link>
        ))}
      </div>
      <button  onClick={toggleSidebar} className=" bg-blue-500 p-2 text-lg text-white absolute bottom-2 right-2">{expand ?<ChevronsLeft /> : <ChevronsRight/>}</button>
    </div>
  );
};

export default Sidebar;
