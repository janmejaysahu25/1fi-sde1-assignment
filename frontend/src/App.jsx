import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products/:slug" element={<ProductPage/>} />\n          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </main>
    </div>
  )
}
