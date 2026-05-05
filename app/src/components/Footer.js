import Image from "next/image";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-choc-900 text-cream-200 pt-12 pb-7 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-sticker.svg"
                alt="delicate by Viky"
                width={54}
                height={54}
              />
              <span className="font-script text-[30px] leading-none text-white">
                delicate
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream-300">
              Pastelería artesanal en Punta del Este, Maldonado.
              <br />
              Cookies, roles y más — hechos hoy, para vos.
            </p>
          </div>

          {/* Pedidos */}
          <div>
            <h5 className="font-display text-lg text-white mb-3 font-medium">
              Pedidos
            </h5>
            <div className="flex flex-col gap-1.5 text-sm text-cream-300">
              <span>Cómo pedir</span>
              <span>Pedidos especiales</span>
              <span>Empresas</span>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="font-display text-lg text-white mb-3 font-medium">
              Hablamos
            </h5>
            <div className="flex flex-col gap-1.5 text-sm text-cream-300">
              <a
                href="https://www.instagram.com/delicateuy_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream-300 hover:text-white no-underline"
              >
                <Instagram size={16} strokeWidth={1.75} />
                @delicateuy_
              </a>
              <span>WhatsApp</span>
              <span>Maldonado, Uruguay</span>
            </div>
          </div>
        </div>

        {/* Signoff */}
        <div className="mt-8 pt-5 border-t border-choc-800 flex flex-col sm:flex-row justify-between text-xs text-cream-400 gap-2">
          <span>© Delicate by Viky · 2026</span>
          <span>Hecho con 🤍 en Punta del Este</span>
        </div>
      </div>
    </footer>
  );
}
