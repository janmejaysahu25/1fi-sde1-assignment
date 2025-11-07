import React from "react";

export default function EMIPlanList({ plans = [], selected, onChange, price, mrp }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4 text-sm">
        No EMI plans available
      </div>
    );
  }

  const discountPercent = price && mrp && mrp > price
    ? Math.round(((mrp - price) / mrp) * 100)
    : 0;

  return (
    <div className="space-y-3">
      {/* Optional Price + Discount */}
      {price && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{Number(price).toLocaleString()}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{Number(mrp).toLocaleString()}
              </span>
              <span className="text-sm text-green-700 font-semibold">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
      )}

      {/* EMI Plans */}
      {plans.map((plan) => {
        const isSelected = selected?.planId === plan.planId;

        return (
          <div
            key={plan.planId}
            onClick={() => onChange(plan)}
            className={`cursor-pointer rounded-xl p-4 border shadow-sm transition-all duration-200 hover:shadow-md ${
              isSelected
                ? "border-sky-500 bg-sky-50 shadow-md"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Radio Selector */}
              <div className="mt-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>

              {/* EMI Content */}
              <div className="flex-1 space-y-1">
                {/* Monthly Amount & Tenure */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900">
                    ₹{Number(plan.monthlyAmount).toLocaleString()}
                    <span className="text-sm text-gray-500 ml-1">
                      × {plan.tenureMonths} months
                    </span>
                  </div>

                  {/* Interest Badge */}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      plan.interestRatePercent === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {plan.interestRatePercent}% Interest
                  </span>
                </div>

                {/* Additional Cashback */}
                {plan.cashbackAmount > 0 && (
                  <div className="mt-1 flex items-center justify-start gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      💰 ₹{Number(plan.cashbackAmount).toLocaleString()} Cashback
                    </span>
                  </div>
                )}

                {/* Plan description */}
                {plan.description && (
                  <div className="text-xs text-gray-500 mt-1">
                    {plan.description}
                  </div>
                )}

                {/* Optional Start Date */}
                {plan.startDate && (
                  <div className="text-xs text-gray-400 mt-1">
                    EMI starts on{" "}
                    <span className="font-medium">{plan.startDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
