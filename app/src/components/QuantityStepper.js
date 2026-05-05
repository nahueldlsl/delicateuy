"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ qty, onDecrease, onIncrease, size = "md" }) {
  const isSm = size === "sm";

  return (
    <div
      className={`inline-flex items-center gap-1 bg-white rounded-full shadow-xs ${
        isSm ? "p-0.5" : "p-1"
      }`}
    >
      <button
        onClick={onDecrease}
        className={`${
          isSm ? "w-6 h-6" : "w-9 h-9"
        } rounded-full flex items-center justify-center text-choc-700 hover:bg-cream-100 transition-colors duration-[120ms] cursor-pointer`}
        aria-label="Menos"
      >
        <Minus size={isSm ? 14 : 16} strokeWidth={1.75} />
      </button>
      <span
        className={`${
          isSm ? "min-w-[14px] text-[13px]" : "min-w-[24px] text-base"
        } text-center font-bold`}
      >
        {qty}
      </span>
      <button
        onClick={onIncrease}
        className={`${
          isSm ? "w-6 h-6" : "w-9 h-9"
        } rounded-full flex items-center justify-center text-choc-700 hover:bg-cream-100 transition-colors duration-[120ms] cursor-pointer`}
        aria-label="Más"
      >
        <Plus size={isSm ? 14 : 16} strokeWidth={1.75} />
      </button>
    </div>
  );
}
