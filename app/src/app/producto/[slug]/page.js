import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://delicate.com.uy";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return { title: "Producto no encontrado" };

  const title = `${product.name} | delicate by Viky`;
  const description = `${product.description} — Pastelería artesanal en Maldonado. Pedí online.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/producto/${product.slug}`,
      siteName: "delicate by Viky",
      images: [
        {
          url: `${baseUrl}${product.image}`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "es_UY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${product.image}`],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) notFound();

  // Pre-serialize product for Client Component
  const serializedProduct = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `${baseUrl}${product.image}`,
    "description": product.description,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/producto/${product.slug}`,
      "priceCurrency": "UYU",
      "price": product.price,
      "availability": product.active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="relative aspect-square rounded-[32px] overflow-hidden bg-cream-200 shadow-sm">
          <Image
            src={product.image}
            alt={`Foto de ${product.name} — delicate by Viky`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col pt-2">
          {product.tag && (
            <span className="font-script text-2xl text-lila-500 mb-2">
              {product.tag}
            </span>
          )}
          <h1 className="t-display text-4xl sm:text-5xl mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-choc-600 mb-8 leading-relaxed max-w-[500px]">
            {product.description}
          </p>
          
          <div className="flex items-center gap-4 mb-10">
            <span className="font-display font-semibold text-3xl text-choc-900">
              ${product.price.toLocaleString("es-UY")}
            </span>
            {product.unitLabel && (
              <span className="text-choc-400 text-lg">/ {product.unitLabel}</span>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-cream-200 inline-flex flex-col gap-4 max-w-[320px]">
            <p className="text-sm font-bold text-choc-900 uppercase tracking-widest">
              Añadir al carrito
            </p>
            <AddToCartButton product={serializedProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}
