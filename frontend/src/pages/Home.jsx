import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading products…
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        No products available.
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Latest Smartphones on Easy EMI
      </h1>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6
      ">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
