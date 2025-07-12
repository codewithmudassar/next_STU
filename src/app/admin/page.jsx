"use client"

import React, {  useState } from 'react'
import Image from 'next/image'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useAuth } from '@/context/AuthContext'


const sampleData = [
  {
    title: "Product sold",
    value: "765",
    change: "+2.6%",
    changeType: "positive",
    chartColor: "#3b82f6"
  },
  {
    title: "Total balance",
    value: "18,765",
    change: "-0.1%",
    changeType: "negative",
    chartColor: "#facc15"
  },
  {
    title: "Sales profit",
    value: "4,876",
    change: "+0.6%",
    changeType: "positive",
    chartColor: "#f97316"
  }
]

const genderData = [
  { name: 'Mens', value: 1000, color: '#3b82f6' },
  { name: 'Womens', value: 800, color: '#facc15' },
  { name: 'Kids', value: 524, color: '#f97316' },
]

const monthlyData = [
  { name: 'Jan', income: 50, expenses: 55 },
  { name: 'Feb', income: 30, expenses: 20 },
  { name: 'Mar', income: 45, expenses: 40 },
  { name: 'Apr', income: 20, expenses: 15 },
  { name: 'May', income: 85, expenses: 80 },
  { name: 'Jun', income: 75, expenses: 90 },
  { name: 'Jul', income: 65, expenses: 85 },
  { name: 'Aug', income: 150, expenses: 50 },
  { name: 'Sep', income: 90, expenses: 95 },
  { name: 'Oct', income: 70, expenses: 100 },
  { name: 'Nov', income: 65, expenses: 85 },
  { name: 'Dec', income: 50, expenses: 80 },
]

const latestOrders = [
  { id: 1, seller: 'Jayvion Simon', avatar: '/placeholder.svg', product: 'CAP', country: '🇩🇪', total: '$83.74', rank: 'Top 1' },
  { id: 2, seller: 'Lucian Obrien', avatar: '/placeholder.svg', product: 'Branded shoes', country: '🇬🇧', total: '$97.14', rank: 'Top 2' },
  { id: 3, seller: 'Deja Brady', avatar: '/placeholder.svg', product: 'Headphone', country: '🇫🇷', total: '$68.71', rank: 'Top 3' },
  { id: 4, seller: 'Harrison Stein', avatar: '/placeholder.svg', product: 'Cell phone', country: '🇰🇷', total: '$85.21', rank: 'Top 4' },
  { id: 5, seller: 'Reece Chung', avatar: '/placeholder.svg', product: 'Earings', country: '🇺🇸', total: '$52.17', rank: 'Top 5' },
]

const latestProducts = [
  { id: 1, name: 'Urban Explorer Sneakers', image: '/placeholder.svg', price: '$83.74', colors: ['bg-green-500', 'bg-yellow-500', 'bg-red-500'], badge: '+1' },
  { id: 2, name: 'Classic Leather Loafers', image: '/placeholder.svg', price: '$97.14', oldPrice: '$97.14', colors: ['bg-red-500', 'bg-yellow-500'] },
  { id: 3, name: 'Mountain Trekking Boots', image: '/placeholder.svg', price: '$68.71', colors: ['bg-green-500', 'bg-yellow-500', 'bg-pink-500'], badge: '+3' },
  { id: 4, name: 'Elegance Stiletto Heels', image: '/placeholder.svg', price: '$85.21', oldPrice: '$85.21', colors: ['bg-pink-500', 'bg-purple-500', 'bg-blue-500'] },
  { id: 5, name: 'Comfy Running Shoes', image: '/placeholder.svg', price: '$52.17', colors: ['bg-blue-500'] },
]


const Page = () => {

  const totalSales = genderData.reduce((sum, item) => sum + item.value, 0)
  let {user} = useAuth() 
  
  
  

  
  
  
  return (
    <div>
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100">
      {/* Congratulations Card */}
      <div className="relative w-full md:w-2/3 h-64 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Hello 👋  
            </h2>
            <h3 className="text-xl font-semibold text-white mb-2">
              {user ? user.fullName : ""}
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              Best seller of the month you have done 57.6% more sales today.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Go now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40">

        </div>
      </div>

      {/* Product Card */}
      <div className="relative w-full md:w-1/3 h-64 bg-gray-900 rounded-2xl overflow-hidden">
       
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
           
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Top Sellers will show here 
            </h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Buy now
            </button>
          </div>
        </div>
       
      </div>
    </div>
    <div className="bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'} rounded-full px-2 py-0.5`}>
                    {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 font-medium ml-1">last week</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <div className="w-full h-full bg-gray-100 rounded">
                  <div 
                    className="h-full rounded"
                    style={{
                      backgroundColor: stat.chartColor,
                      clipPath: 'polygon(0 100%, 20% 60%, 40% 80%, 60% 20%, 80% 40%, 100% 0, 100% 100%)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className='px-4'>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Sale by gender</h2>
          <div className="relative" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{totalSales.toLocaleString()}</span>
              <span className="text-gray-500">Total</span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {genderData.map((entry, index) => (
              <div key={index} className="flex items-center mx-2">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Yearly sales</h2>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>2023</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">(+43%) than last year</p>
          <div className="flex mb-4">
            <div className="mr-8">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Total income</span>
              </div>
              <span className="text-2xl font-bold">1.23k</span>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600">Total expenses</span>
              </div>
              <span className="text-2xl font-bold">6.79k</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="#facc15" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="grid grid-cols-12 lg:grid-cols-12 gap-5">
        {/* Latest Orders Table */}
        <div className="bg-white rounded-lg col-span-8 shadow-sm overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b">Latest Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image className="h-10 w-10 rounded-full" src={"/avatar.jpg"} alt="" width={40} height={40} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.seller}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.rank === 'Top 1' ? 'bg-blue-100 text-blue-800' :
                        order.rank === 'Top 2' ? 'bg-purple-100 text-purple-800' :
                        order.rank === 'Top 3' ? 'bg-green-100 text-green-800' :
                        order.rank === 'Top 4' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Products List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden col-span-4">
          <h2 className="text-lg font-semibold p-4 border-b">Latest products</h2>
          <ul className="divide-y divide-gray-200">
            {latestProducts.map((product) => (
              <li key={product.id} className="p-4 flex items-center">
                <Image className="h-16 w-16 rounded-lg object-cover" src={product.image} alt="" width={64} height={64} />
                <div className="ml-4 flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center">
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">{product.oldPrice}</span>
                    )}
                    <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {product.colors.map((color, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${color}`}></div>
                  ))}
                  {product.badge && (
                    <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.badge}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Page
