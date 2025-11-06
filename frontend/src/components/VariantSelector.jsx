import React from "react";

export default function VariantSelector({ variants = [], selected, onChange }) {
  if (!variants.length) return null;

  return (
    <div className="flex flex-col gap-4">

      {/* ✅ COLOR SELECTOR */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Color</p>
        <div className="flex gap-2 flex-wrap">
          {[...new Set(variants.map((v) => v.color))].map((color) => (
            <button
              key={color}
              onClick={() => {
                const match = variants.find((v) => v.color === color);
                if (match) onChange(match);
              }}
              className={`px-3 py-1 rounded-full text-sm border flex items-center gap-2 transition ${
                selected?.color === color
                  ? "bg-sky-600 text-white border-sky-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:border-sky-300"
              }`}
            >
              {/* ✅ Tiny color dot */}
              <span
                className="w-3 h-3 rounded-full border"
                style={{
                  background:
                    color.toLowerCase().includes("black")
                      ? "#111827"
                      : color.toLowerCase().includes("silver")
                      ? "#d1d5db"
                      : color.toLowerCase().includes("blue")
                      ? "#3b82f6"
                      : color.toLowerCase().includes("orange")
                      ? "#fb923c"
                      : "#e5e7eb",
                }}
              ></span>
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ STORAGE SELECTOR */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Storage</p>
        <div className="flex gap-2 flex-wrap">
          {[...new Set(variants.map((v) => v.storage))].map((storage) => {
            const matchVariant = variants.find(
              (v) =>
                v.storage === storage &&
                (selected?.color ? v.color === selected.color : true)
            ) || variants.find((v) => v.storage === storage);

            const isActive = selected?.storage == storage;

            return (
              <button
                key={storage}
                onClick={() => matchVariant && onChange(matchVariant)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  isActive
                    ? "bg-sky-600 text-white border-sky-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:border-sky-300"
                }`}
              >
                {storage} GB
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
