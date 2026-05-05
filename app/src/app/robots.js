export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://delicate.com.uy";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
