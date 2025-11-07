import React, { useState, useEffect } from "react";

export default function ProductGallery({ images = [] }) {
  const fallbackImg = "https://via.placeholder.com/800x800?text=No+Image";

  const [mainImg, setMainImg] = useState(fallbackImg);
  const [allImages, setAllImages] = useState([fallbackImg]);

  // ✅ Filter out empty/invalid images
  useEffect(() => {
    if (images && images.length > 0) {
      const validImages = images
        .filter((img) => img && img.trim() !== "")
        .map((img) => img.trim());
      setAllImages(validImages.length > 0 ? validImages : [fallbackImg]);
      setMainImg(validImages[0] || fallbackImg);
    } else {
      setAllImages([fallbackImg]);
      setMainImg(fallbackImg);
    }
  }, [images]);

  const handleImageError = (e) => (e.currentTarget.src = fallbackImg);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* DESKTOP THUMBNAILS */}
      <div className="hidden md:flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1">
        {allImages.map((img, idx) => (
          <div
            key={idx}
            className={`w-16 h-16 cursor-pointer rounded-md overflow-hidden border transition-transform duration-200
              ${mainImg?.trim() === img?.trim()
                ? "border-sky-600 ring-2 ring-sky-400 scale-105"
                : "border-gray-300 hover:scale-105 hover:border-sky-300"
              }`}
            onClick={() => setMainImg(img)}
          >
            <img
              src={img}
              alt={`Thumb ${idx}`}
              onError={handleImageError}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1 flex items-center justify-center bg-white p-3 md:p-4 rounded-2xl shadow-lg border border-gray-200">
        <img
          src={mainImg}
          alt="Main Product"
          onError={handleImageError}
          className="object-contain w-full h-[320px] md:h-[420px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* MOBILE THUMBNAILS */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x pb-3 mt-3 pl-2">
        {allImages.map((img, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-[75px] h-[75px] cursor-pointer rounded-lg overflow-hidden border transition-transform duration-200 snap-start
              ${mainImg?.trim() === img?.trim()
                ? "border-sky-600 ring-2 ring-sky-300 scale-105"
                : "border-gray-300 hover:scale-105 hover:border-sky-400"
              }`}
            onClick={() => setMainImg(img)}
          >
            <img
              src={img}
              alt={`Thumb ${idx}`}
              onError={handleImageError}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
