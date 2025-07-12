"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all"); // 'all', 'admin', 'user'
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    limit: 10,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams();
      if (roleFilter === "admin") params.append("isAdmin", "true");
      if (roleFilter === "user") params.append("isAdmin", "false");
      if (search) params.append("search", search);
      params.append("page", page);
      params.append("limit", 5);

      const res = await fetch(`/api/user?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, search, page]);

  return (
    <div className="p-6  mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        <select
          className="border px-3 py-2 rounded"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
{loading ? (
  <div className="text-center py-10 text-gray-500">Loading users...</div>
) : (
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Photo</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            
            users.map((user, idx) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">
                  {(page - 1) * pagination.limit + idx + 1}
                </td>
                <td className="border px-4 py-2">
                  <img
                    src={user.photo || "/avatar.jpg"}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-700">User</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
)}
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {pagination.pages || 1}
        </span>
        <button
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setPage((prev) => Math.min(pagination.pages, prev + 1))
          }
          disabled={page >= pagination.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
