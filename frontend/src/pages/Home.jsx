import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api/api'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchProducts().then(data=>{ setProducts(data); setLoading(false) }).catch(()=>setLoading(false))
  },[])

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </section>
  )
}
