"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dnav from "./Dnav";

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/admin") ? (
        <>
          <div className="flex h-screen ">
            <div>
              <Sidebar />
            </div>
            <div className="flex-1 overflow-auto">
              <div className="sticky top-0 z-50">

              <Dnav />
              </div>

              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
};

export default Layout;
