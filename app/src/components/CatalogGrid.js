"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const CATEGORIES = [
  { id: "all", label: "Todo" },
  { id: "cookies", label: "Cookies" },
  { id: "roles", label: "Rolls" },
];

export default function CatalogGrid({ products }) {
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(
    () =>
      activeCat === "all"
        ? products
        : products.filter((p) => p.category === activeCat),
    [activeCat, products]
  );

  return (
    <section id="menu">
      {/* Category chips */}
      <div className="flex gap-2.5 pb-6 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] cursor-pointer ${
              activeCat === cat.id
                ? "bg-lila-400 text-white shadow-sm"
                : "bg-white text-choc-700 shadow-xs hover:bg-cream-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-2xl sm:text-3xl">
          {activeCat === "all"
            ? "Nuestras Cookies, Alfajores y más"
            : `Delicias en ${CATEGORIES.find((c) => c.id === activeCat)?.label}`}
        </h2>
        <span className="text-sm font-bold text-lila-500">
          {filtered.length}{" "}
          {filtered.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      {/* Product grid */}
      <motion.div
        layout
        className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
