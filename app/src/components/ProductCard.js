"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const fmt = (n) => "$" + n.toLocaleString("es-UY");

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/producto/${product.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
        className="bg-white rounded-[20px] shadow-sm overflow-hidden cursor-pointer transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:shadow-lg hover:-translate-y-0.5 h-full"
      >
        {/* Photo */}
        <div className="aspect-square overflow-hidden relative bg-cream-200">
          <Image
            src={product.image}
            alt={`Pastelería artesanal delicate: ${product.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[360ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-white/95 text-lila-600 text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full z-10">
              {product.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-3.5 sm:p-4">
          {product.tag && (
            <div className="font-script text-[17px] text-lila-500 leading-none mb-1.5">
              {product.tag}
            </div>
          )}
          <h3 className="font-body text-[15px] sm:text-base font-bold text-choc-900 mb-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-[13px] text-choc-500 mb-2.5 leading-[1.4] line-clamp-2 min-h-[36px]">
            {product.description}
          </p>

          {/* Price + Unit + Add button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display font-semibold text-xl text-choc-900 tabular-nums">
                {fmt(product.price)}
              </span>
              {product.unitLabel && (
                <span className="text-xs text-choc-500 ml-1.5">
                  / {product.unitLabel}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              className="w-9 h-9 bg-lila-400 hover:bg-lila-500 text-white rounded-full flex items-center justify-center transition-all duration-[120ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] active:scale-[0.92] cursor-pointer"
              aria-label={`Sumar ${product.name} al carrito`}
            >
              <Plus size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
