import Image from "next/image";
import prisma from "@/lib/prisma";
import CatalogGrid from "@/components/CatalogGrid";
import HeroSection from "@/components/HeroSection";

export default async function HomePage() {
  // Real database fetch — Server Component
  let products = [];
  try {
    products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });
    // Serialize for client components
    products = products.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to empty if DB not ready
    products = [];
  }

  return (
    <>
      <HeroSection />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16">
        {products.length > 0 ? (
          <CatalogGrid products={products} />
        ) : (
          <div className="text-center py-20">
            <p className="text-choc-500 text-lg">
              Cargando productos... Asegurate de tener la base de datos
              corriendo.
            </p>
            <p className="text-sm text-choc-400 mt-2">
              Ejecutá: <code className="bg-cream-200 px-2 py-1 rounded-md">docker compose up -d</code> y luego{" "}
              <code className="bg-cream-200 px-2 py-1 rounded-md">npx prisma db push && npx prisma db seed</code>
            </p>
          </div>
        )}

        {/* Promo banner */}
        <section className="bg-lila-100 rounded-[28px] p-6 sm:p-8 mt-10 grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-5">
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-lila-600 mb-1.5 font-medium">
              ¿Cumple, baby shower, regalo?
            </h3>
            <p className="text-sm text-lila-600">
              Armamos cajitas a medida. Mandame mensaje por Insta y lo
              coordinamos.
            </p>
          </div>
          <a
            href="https://www.instagram.com/delicateuy_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-dulce-600 hover:bg-dulce-700 text-white font-bold text-[15px] rounded-full no-underline transition-colors duration-[220ms] whitespace-nowrap"
          >
            Pedir a medida
          </a>
        </section>
      </div>
    </>
  );
}
