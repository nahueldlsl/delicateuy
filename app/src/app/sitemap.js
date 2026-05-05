import { products } from "@/data/products";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://delicate.com.uy";

  const activeProducts = products.filter((p) => p.active);

  const productUrls = activeProducts.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...productUrls,
  ];
}
