import React from 'react'

export default function EMIPlanList({ plans = [], selected, onChange }){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {plans.map(p => (
        <label key={p.planId} className={`p-4 border rounded bg-white flex items-center justify-between ${selected?.planId===p.planId ? 'ring-2 ring-sky-300' : ''}`}>
          <div>
            <div className="text-lg font-semibold">₹{Number(p.monthlyAmount).toLocaleString()}</div>
            <div className="text-sm text-gray-500">{p.tenureMonths} months • {p.interestRatePercent}% interest</div>
          </div>
          <input type="radio" name="emi" checked={selected?.planId===p.planId} onChange={()=>onChange(p)} />
        </label>
      ))}
    </div>
  )
}
