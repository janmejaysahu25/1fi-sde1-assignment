import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- ADD THIS


export default function ProductCard({ product }) {
  if (!product) return null;

  const fallbackImg = "https://placehold.co/500x500/png?text=No+Image";

  // ✅ Track main image separately
  const [mainImg, setMainImg] = useState(product.images?.[0] || fallbackImg);

  const handleImageError = (e) => (e.target.src = fallbackImg);

  // Extract unique color variants
  const colors =
    product.variants?.map((v) => v.color)?.filter((v, i, arr) => arr.indexOf(v) === i) || [];

  const colorToClass = (color) => {
    switch (color.toLowerCase()) {
      case "silver":
        return "bg-gray-300 border";
      case "black":
        return "bg-black";
      case "orange":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden cursor-pointer">

        {/* ✅ MAIN IMAGE */}
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={mainImg}
            alt={product.name}
            onError={handleImageError}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* ✅ THUMBNAILS (scrollable) */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onError={handleImageError}
                className={`h-16 w-auto object-contain rounded-lg border cursor-pointer transition-transform hover:scale-105 ${mainImg === img ? "border-sky-600" : "border-gray-200"
                  }`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        )}

        {/* ✅ PRODUCT DETAILS */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug min-h-[48px]">
            {product.name}
          </h3>

{/* Price + Discount */}
<div className="flex items-center gap-2">
  <div className="text-xl font-bold text-gray-900">
    ₹{Number(product.price || 0).toLocaleString()}
  </div>

  {product.mrp && product.mrp > product.price ? (
    <>
      <div className="line-through text-gray-400 text-sm">
        ₹{Number(product.mrp).toLocaleString()}
      </div>
      <div className="text-green-600 text-sm font-semibold">
        {Math.round(
          ((Number(product.mrp) - Number(product.price)) / Number(product.mrp)) * 100
        )}
        % off
      </div>
    </>
  ) : (
    <div className="text-gray-500 text-sm">(Best Price)</div>
  )}
</div>


          <Link
            to={`/products/${product.slug}`}
            className="block w-full text-center mt-3 px-4 py-2 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition-all"
          >
            View EMI Options
          </Link>
        </div>

    </div>
  );
}
