import React from 'react'

export default function VariantSelector({ variants = [], selected, onChange }){
  return (
    <div className="flex items-center gap-4">
      {variants.map(v => (
        <button key={v.variantId} onClick={()=>onChange(v)} className={`px-3 py-2 border rounded ${selected?.variantId===v.variantId ? 'bg-sky-50 border-sky-400' : 'bg-white'}`}>
          {v.color} • {v.storage}
        </button>
      ))}
    </div>
  )
}
