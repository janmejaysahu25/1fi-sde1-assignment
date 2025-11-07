import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const fallbackImg = "https://placehold.co/500x500/png?text=No+Image";

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || {}
  );
  const [mainImg, setMainImg] = useState(
    selectedVariant.images?.[0] || fallbackImg
  );

  const handleImageError = (e) => (e.target.src = fallbackImg);

  // Extract unique colors
  const colors =
    product.variants
      ?.map((v) => v.color)
      ?.filter((v, i, arr) => arr.indexOf(v) === i) || [];

  const handleVariantChange = (color) => {
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setSelectedVariant(variant);
      setMainImg(variant.images?.[0] || fallbackImg);
    }
  };

  // Map colors to proper backgrounds
  const getColorBackground = (color) => {
    const lc = color.toLowerCase();
    switch (lc) {
      case "black":
        return "#000";
      case "silver":
        return "linear-gradient(145deg,#cfcfcf,#e0e0e0)";
      case "white":
        return "#fff";
      case "orange":
        return "linear-gradient(135deg,#f97316,#fb923c)";
      case "storm blue":
        return "linear-gradient(135deg,#0ea5e9,#3b82f6)";
      case "green":
        return "linear-gradient(135deg,#22c55e,#4ade80)";
      default:
        return "#9ca3af";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 overflow-hidden cursor-pointer flex flex-col hover:scale-[1.02]">
      
      {/* MAIN IMAGE */}
      <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={mainImg}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* THUMBNAILS */}
      {selectedVariant.images && selectedVariant.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-2">
          {selectedVariant.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              onError={handleImageError}
              className={`h-16 w-16 flex-shrink-0 object-contain rounded-lg border cursor-pointer transition-transform hover:scale-105 ${
                mainImg === img ? "ring-2 ring-sky-500 border-sky-500" : "border-gray-200"
              }`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>
      )}

      {/* PRODUCT DETAILS */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 leading-snug max-h-[3rem] overflow-hidden">
            {product.name}
          </h3>

          {/* Variant Selector (Non-vibrating dots) */}
          <div className="flex gap-2 mt-3">
            {colors.map((color, idx) => {
              const isSelected = selectedVariant.color === color;
              return (
                <button
                  key={idx}
                  onClick={() => handleVariantChange(color)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-sky-600"
                      : "ring-1 ring-gray-300"
                  }`}
                  style={{
                    background: getColorBackground(color),
                  }}
                />
              );
            })}
          </div>

          {/* Specs */}
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            {selectedVariant.specs &&
              Object.entries(selectedVariant.specs).map(([key, val]) => (
                <div key={key}>
                  <span className="font-semibold">{key}: </span>
                  <span>{val}</span>
                </div>
              ))}
          </div>

          {/* Price + Discount */}
          <div className="flex items-center gap-2 mt-3">
            <div className="text-xl font-bold text-gray-900">
              ₹{Number(selectedVariant.price || 0).toLocaleString()}
            </div>

            {product.mrp && product.mrp > selectedVariant.price ? (
              <>
                <div className="line-through text-gray-400 text-sm">
                  ₹{Number(product.mrp).toLocaleString()}
                </div>
                <div className="text-green-600 text-sm font-semibold">
                  {Math.round(
                    ((Number(product.mrp) - Number(selectedVariant.price)) /
                      Number(product.mrp)) *
                      100
                  )}
                  % off
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-sm">(Best Price)</div>
            )}
          </div>
        </div>

        {/* View EMI Options Button */}
        <Link
          to={`/products/${product.slug}`}
          className="block w-full text-center mt-4 px-4 py-2 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition-all"
        >
          View EMI Options
        </Link>
      </div>
    </div>
  );
}
