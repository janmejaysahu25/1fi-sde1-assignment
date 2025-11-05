import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCard({ product }){
  const img = product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400x300?text=Product'
  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white rounded-lg shadow p-4">
      <img src={img} alt={product.name} className="w-full h-48 object-contain mb-4" />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sky-600 font-bold mt-2">₹{product.price.toLocaleString()}</p>
      <div className="mt-4 flex justify-between items-center">
        <Link to={`/products/${product.slug}`} className="text-sm px-3 py-2 bg-sky-600 text-white rounded">View Details</Link>
        <span className="text-xs text-gray-500">Seller: {product.seller || '—'}</span>
      </div>
    </motion.article>
  )
}
