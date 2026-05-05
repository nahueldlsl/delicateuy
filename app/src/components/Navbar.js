"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const cartCount = useCartStore((s) => s.cartCount());
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          scrolled
            ? "bg-cream-50/85 backdrop-blur-xl shadow-sm border-b border-cream-200"
            : "bg-cream-50"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-6 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline shrink-0"
            >
              <Image
                src="/logo-sticker.svg"
                alt="delicate by Viky"
                width={44}
                height={44}
                priority
              />
              <div className="hidden sm:block">
                <span className="font-script text-[28px] leading-none text-choc-700">
                  delicate
                </span>
                <small className="block font-body text-[11px] font-bold text-lila-500 tracking-[0.18em] uppercase mt-0.5">
                  BY VIKY
                </small>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-5 ml-4">
              <Link
                href="/"
                className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline transition-colors duration-[120ms]"
              >
                Menú
              </Link>
              <Link
                href="#como-pedir"
                className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline transition-colors duration-[120ms]"
              >
                Cómo pedir
              </Link>
              <Link
                href="#contacto"
                className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline transition-colors duration-[120ms]"
              >
                Contacto
              </Link>
            </nav>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-choc-700 hover:bg-cream-200 transition-colors duration-[220ms]"
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Cart */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-choc-700 hover:bg-cream-200 transition-colors duration-[220ms]"
                aria-label="Carrito"
                id="cart-button"
              >
                <ShoppingBag size={22} strokeWidth={1.75} />
                <AnimatePresence>
                  {mounted && cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute top-1 right-0.5 bg-lila-400 text-white text-[10px] font-extrabold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile nav dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
                className="md:hidden overflow-hidden flex flex-col gap-2 border-t border-cream-200"
              >
                <div className="py-4 flex flex-col gap-2">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline py-2"
                  >
                    Menú
                  </Link>
                  <Link
                    href="#como-pedir"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline py-2"
                  >
                    Cómo pedir
                  </Link>
                  <Link
                    href="#contacto"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-choc-700 hover:text-lila-500 no-underline py-2"
                  >
                    Contacto
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <CartDrawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
