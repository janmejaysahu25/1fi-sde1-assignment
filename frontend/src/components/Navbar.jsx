import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-sky-600">1Fi EMI Store</Link>
        <nav className="space-x-4 text-sm text-gray-600">
          <Link to="/">Products</Link>
          <a href="#" className="ml-4">About</a>
        </nav>
      </div>
    </header>
  )
}
