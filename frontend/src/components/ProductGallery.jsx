import React, { useState } from 'react'

export default function ProductGallery({ images = [] }){
  const [active, setActive] = useState(0)
  const thumb = images && images.length ? images : ['https://via.placeholder.com/600x400?text=Image']
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4">
        <img src={thumb[active]} alt={`image-${active}`} className="w-full h-96 object-contain" />
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {thumb.map((src, i) => (
            <button key={i} onClick={()=>setActive(i)} className={`w-20 h-20 rounded overflow-hidden border ${i===active ? 'ring-2 ring-sky-400' : 'border-gray-200'}`}>
              <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
