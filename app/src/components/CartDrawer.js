"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import QuantityStepper from "./QuantityStepper";

const fmt = (n) => "$" + n.toLocaleString("es-UY");

export default function CartDrawer({ open, onClose }) {
  const cart = useCartStore((s) => s.cart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 bg-choc-900/40 z-[100]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed top-0 right-0 w-[420px] max-w-full h-screen bg-cream-50 z-[101] flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="font-display text-2xl font-medium">Tu cajita</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-choc-700 hover:bg-cream-200 transition-colors duration-[220ms] cursor-pointer"
                aria-label="Cerrar"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-choc-500">
                  <div className="w-14 h-14 rounded-full bg-cream-200 inline-flex items-center justify-center mb-4 text-choc-500">
                    <ShoppingBag size={26} strokeWidth={1.75} />
                  </div>
                  <p className="text-[15px]">
                    Tu cajita está vacía.
                    <br />
                    Empezá a llenarla 🤍
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[64px_1fr_auto] gap-3 py-3 border-b border-cream-200 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-choc-900 mb-1">
                        {item.name}
                      </h4>
                      <QuantityStepper
                        qty={item.qty}
                        onDecrease={() =>
                          item.qty <= 1
                            ? removeItem(item.id)
                            : updateQuantity(item.id, item.qty - 1)
                        }
                        onIncrease={() => updateQuantity(item.id, item.qty + 1)}
                        size="sm"
                      />
                    </div>
                    <div className="font-display font-semibold text-base text-choc-900">
                      {fmt(item.price * item.qty)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-cream-200 bg-white">
              <div className="flex flex-col gap-1.5 mb-3.5">
                <div className="flex justify-between text-sm text-choc-700">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-choc-700">
                  <span>Envío</span>
                  <span className="text-choc-500">GRATIS</span>
                </div>
                <div className="flex justify-between text-lg text-choc-900 font-bold pt-2 border-t border-dashed border-cream-300">
                  <span>Total</span>
                  <span>{fmt(subtotal)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className={`block w-full text-center py-3.5 rounded-full font-bold text-[15px] no-underline transition-all duration-[220ms] ${cart.length > 0
                  ? "bg-lila-400 hover:bg-lila-500 text-white cursor-pointer"
                  : "bg-cream-200 text-choc-500 pointer-events-none"
                  }`}
              >
                Ir a confirmar pedido
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
