import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center'>
    
    <Link href={"/"}  >Home</Link>
    <Link href={"/about"}  >About</Link>
    <Link href={"/contact"}  >Contact</Link>
    <Link href={"/admin"}  >Admin</Link>
    </div>
  )
}

export default Navbar
