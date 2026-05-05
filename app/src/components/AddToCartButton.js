"use client";

import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);

  const handleAdd = () => {
    addItem(product);
    setDrawerOpen(true);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-lila-400 hover:bg-lila-500 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
    >
      <Plus size={20} />
      Agregar al carrito
    </button>
  );
}
