"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Store, Bike, CalendarDays } from "lucide-react";

export default function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-8 sm:gap-10 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="font-script text-lila-500 text-2xl sm:text-[28px] leading-none mb-2">
            del horno de hoy
          </div>
          <h1 className="t-display mb-4">
            Pastelería Artesanal:
            <br />
            Hechas hoy, para vos.
          </h1>
          <p className="text-base sm:text-[17px] text-choc-700 max-w-[460px] mb-6">
            Cookies estilo NY, roles de canela y más. Hechos en casa, en serio.
            Pedí, elegí día y pasá a buscar — o te lo llevo.
          </p>

          <div className="flex gap-2.5 flex-wrap mb-5">
            <button
              onClick={scrollToMenu}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-lila-400 hover:bg-lila-500 text-white font-bold text-[15px] rounded-full transition-colors duration-[220ms] cursor-pointer active:scale-[0.97]"
            >
              Ver el menú
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
            <a
              href="https://www.instagram.com/delicateuy_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-choc-900 font-bold text-[15px] rounded-full no-underline shadow-[inset_0_0_0_1.5px_var(--border-default)] hover:bg-cream-100 transition-colors duration-[220ms]"
            >
              @delicateuy_
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-[13px] text-choc-500">
            <span className="inline-flex items-center gap-1.5">
              <Store size={16} strokeWidth={1.75} /> Retiro en Maldonado
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bike size={16} strokeWidth={1.75} /> Delivery Punta del Este
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} strokeWidth={1.75} /> Pedí con 48h
            </span>
          </div>
        </motion.div>

        {/* Hero photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[36px] overflow-hidden shadow-lg bg-cream-200 relative">
            <Image
              src="/products/cookie-ny-dulce-leche.jpg"
              alt="Cookie estilo NY rellena de dulce de leche"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [8, 10, 8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 drop-shadow-md"
          >
            <Image
              src="/logo-sticker.svg"
              alt="delicate by Viky sticker"
              width={120}
              height={120}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
