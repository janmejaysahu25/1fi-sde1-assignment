import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductBySlug } from "../api/api";
import ProductGallery from "../components/ProductGallery";
import EMIPlanList from "../components/EMIPlanList";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);

  // Fetch product
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductBySlug(slug)
      .then((res) => {
        const productData = res?.data || res;
        if (!productData) {
          setError("Product not found");
          return;
        }
        setProduct(productData);
        setSelectedVariant(productData.variants?.[0] || null);
      })
      .catch(() => setError("Unable to load product"))
      .finally(() => setLoading(false));
  }, [slug]);

  // Reset selected EMI plan on variant change
  useEffect(() => {
    if (selectedVariant) {
      // Add ₹7,500 additional cashback to each EMI plan dynamically
      const emiWithCashback = selectedVariant.emiPlans?.map((plan) => ({
        ...plan,
        cashbackAmount: 7500,
      }));
      setSelectedVariant({ ...selectedVariant, emiPlans: emiWithCashback });
      setSelectedPlan(emiWithCashback?.[0] || null);
    }
  }, [selectedVariant?.variantId]);

  // Derived options
  const colorOptions = useMemo(() => {
    if (!product?.variants) return [];
    const seen = new Set();
    return product.variants
      .filter((v) => v.color && !seen.has(v.color) && seen.add(v.color))
      .map((v) => ({ color: v.color, variantId: v.variantId }));
  }, [product]);

  const storageOptions = useMemo(() => {
    if (!product?.variants) return [];
    const seen = new Set();
    return product.variants
      .filter((v) => v.storage && !seen.has(v.storage) && seen.add(v.storage))
      .map((v) => ({ storage: v.storage, variantId: v.variantId }));
  }, [product]);

  const handleChooseVariantById = (variantId) => {
    const v = product.variants.find((x) => x.variantId === variantId);
    if (v) setSelectedVariant(v);
  };

  const handleProceed = () => {
    if (!selectedVariant || !selectedPlan) return;

    localStorage.setItem(
      "selectedOrder",
      JSON.stringify({
        productSlug: product.slug,
        productName: product.name,
        variantId: selectedVariant.variantId,
        variantName: selectedVariant.name || `${selectedVariant.color} ${selectedVariant.storage}`,
        planId: selectedPlan.planId,
        tenureMonths: selectedPlan.tenureMonths,
        monthlyAmount: selectedPlan.monthlyAmount,
        totalPayable: selectedPlan.totalPayable,
        cashback: selectedPlan.cashbackAmount || 0,
      })
    );
    navigate("/checkout");
  };

  if (loading) return <div className="text-center py-12">Loading product...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-12">No product data</div>;

  const galleryImages = selectedVariant?.images?.length ? selectedVariant.images : product.images || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:grid md:grid-cols-3 gap-10">
      {/* LEFT: Gallery */}
      <div className="md:col-span-1">
        <ProductGallery images={galleryImages} />
      </div>

      {/* RIGHT: Details */}
      <div className="md:col-span-2 space-y-6">
        {/* Product Title */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Sold by: {product.seller || "—"}</p>
        </div>

        {/* Price Card */}
        <div className="bg-[#E9F7FF] p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-4xl font-bold text-sky-700">
                ₹{Number(selectedVariant?.price || product.price).toLocaleString()}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="line-through text-gray-400 text-sm">
                  ₹{Number(product.mrp).toLocaleString()}
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  Save ₹{(product.mrp - (selectedVariant?.price || product.price)).toLocaleString()}
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  ({Math.round(((product.mrp - (selectedVariant?.price || product.price)) / product.mrp) * 100)}% off)
                </span>
              </div>
            </div>
          </div>

          {/* Variant selectors */}
          <div className="mt-4">
            {/* Color */}
            {colorOptions.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2">Color</div>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map(({ color, variantId }) => {
                    const isActive = selectedVariant?.variantId === variantId;
                    return (
                      <button
                        key={variantId}
                        onClick={() => handleChooseVariantById(variantId)}
                        className={`px-3 py-1 rounded-full text-sm border transition flex items-center gap-2 ${
                          isActive ? "bg-sky-600 text-white border-sky-600 shadow" : "bg-white text-gray-700 border-gray-200"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border"
                          style={{
                            background:
                              color?.toLowerCase().includes("black")
                                ? "#111827"
                                : color?.toLowerCase().includes("silver")
                                ? "#E6E6E6"
                                : color?.toLowerCase().includes("blue")
                                ? "#0ea5e9"
                                : color?.toLowerCase().includes("orange")
                                ? "#f97316"
                                : "#ddd",
                          }}
                        />
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Storage */}
            {storageOptions.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-2">Storage</div>
                <div className="flex gap-2 flex-wrap">
                  {storageOptions.map(({ storage, variantId }) => {
                    const matchVariant =
                      product.variants.find(
                        (v) =>
                          String(v.storage) === String(storage) &&
                          (selectedVariant?.color ? v.color === selectedVariant.color : true)
                      ) || product.variants.find((v) => String(v.storage) === String(storage));
                    const isActive = selectedVariant && String(selectedVariant.storage) === String(storage);

                    return (
                      <button
                        key={storage}
                        onClick={() => matchVariant && handleChooseVariantById(matchVariant.variantId)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${
                          isActive ? "bg-sky-600 text-white border-sky-600 shadow" : "bg-white text-gray-700 border-gray-200"
                        }`}
                      >
                        {storage} GB
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EMI Plans */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Available EMI Plans</h3>
          <EMIPlanList
            plans={selectedVariant?.emiPlans || []} // ✅ Variant EMI with additional cashback
            selected={selectedPlan}
            onChange={setSelectedPlan}
          />
        </div>

        {/* Proceed Button */}
        <div>
          <button
            onClick={handleProceed}
            disabled={!selectedPlan}
            className="w-full py-4 bg-green-600 text-white font-semibold text-lg rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50"
          >
            Proceed with EMI
          </button>
        </div>

        {/* Specifications */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedVariant?.specs
              ? Object.entries(selectedVariant.specs).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-gray-400 uppercase">{k}</div>
                    <div className="text-sm">{v}</div>
                  </div>
                ))
              : product.specs &&
                Object.entries(product.specs).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-gray-400 uppercase">{k}</div>
                    <div className="text-sm">{v}</div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
