import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductBySlug } from '../api/api'
import ProductGallery from '../components/ProductGallery'
import VariantSelector from '../components/VariantSelector'
import EMIPlanList from '../components/EMIPlanList'

export default function ProductPage(){
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(()=>{
    fetchProductBySlug(slug).then(data=>{ setProduct(data); setLoading(false); setSelectedVariant(data?.variants?.[0] || null) }).catch(()=>setLoading(false))
  },[slug])

  if(loading) return <div>Loading...</div>
  if(!product) return <div>Product not found</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ProductGallery images={product.images} />
      </div>
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sky-600 font-extrabold text-2xl mt-2">₹{product.price.toLocaleString()}</p>

        <div className="mt-4">
          <VariantSelector variants={product.variants} selected={selectedVariant} onChange={setSelectedVariant} />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Available EMI Plans</h2>
          <EMIPlanList plans={product.emiPlans} selected={selectedPlan} onChange={setSelectedPlan} />
        </div>

        <div className="mt-6 flex items-center gap-4">
          {/* Proceed button saves selection and goes to checkout */}\n          <ProceedButton product={product} selectedVariant={selectedVariant} selectedPlan={selectedPlan} />
          <div className="text-sm text-gray-600">Sold by: {product.seller}</div>
        </div>

      </div>
    </div>
  )
}


function ProceedButton({ product, selectedVariant, selectedPlan }){
  const navigate = useNavigate();
  const disabled = !selectedPlan;
  const handle = () => {
    if(disabled) return;
    const payload = {
      productSlug: product.slug,
      productName: product.name,
      variantId: selectedVariant?.variantId,
      planId: selectedPlan.planId,
      monthly: selectedPlan.monthlyAmount,
      tenureMonths: selectedPlan.tenureMonths
    };
    localStorage.setItem('selectedOrder', JSON.stringify(payload));
    navigate('/checkout');
  };
  return (
    <button onClick={handle} disabled={disabled} className="px-6 py-3 bg-sky-600 text-white rounded disabled:opacity-50">
      Proceed
    </button>
  );
}
