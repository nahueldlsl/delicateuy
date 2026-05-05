require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🍪 Seeding products for Delicate by Viky...\n");

  // Delete existing products
  await prisma.product.deleteMany();

  const products = [
    // ─── Cookies ($110 UYU c/u) ───
    {
      name: "Cookie Chips",
      slug: "cookie-chips",
      category: "cookies",
      tag: "clásica",
      description: "Cookie con chips de chocolate.",
      price: 110,
      image: "/products/cookie-ny-dulce-leche.jpg",
      badge: "Top",
    },
    {
      name: "Cookie Chocolate",
      slug: "cookie-chocolate",
      category: "cookies",
      tag: "doble choco",
      description: "Cookie de chocolate con chips de chocolate blanco.",
      price: 110,
      image: "/products/canasta-cookies.jpg",
    },
    {
      name: "Cookie Dulce de leche",
      slug: "cookie-dulce-de-leche",
      category: "cookies",
      tag: "rellena",
      description: "Cookie con chips de chocolate rellena de dulce de leche.",
      price: 110,
      image: "/products/canasta-cookies-nutella.jpg",
    },
    {
      name: "Cookie Nutella",
      slug: "cookie-nutella",
      category: "cookies",
      tag: "cremosa por dentro",
      description: "Cookie con chips de chocolate rellena de Nutella.",
      price: 110,
      image: "/products/cookie-ny-dulce-leche.jpg",
    },
    {
      name: "Cookie Maní",
      slug: "cookie-mani",
      category: "cookies",
      tag: "crunchy",
      description: "Cookie con chips de chocolate rellena de manteca de maní.",
      price: 110,
      image: "/products/canasta-cookies.jpg",
    },
    {
      name: "Cookie Carrot",
      slug: "cookie-carrot",
      category: "cookies",
      tag: "especial",
      description:
        "Cookie de zanahoria rellena de frosting de queso crema.",
      price: 110,
      image: "/products/canasta-cookies-nutella.jpg",
    },

    // ─── Rolls ───
    {
      name: "Rolls de canela",
      slug: "rolls-canela",
      category: "roles",
      tag: "con glasé",
      description: "Rolls de canela con glasé. 6 unidades.",
      price: 450,
      unitLabel: "6 unidades",
      image: "/products/cajas-roles-canela.jpg",
    },
    {
      name: "Rolls de canela con toppings",
      slug: "rolls-canela-toppings",
      category: "roles",
      tag: "elegí tu favorito",
      description:
        "Rolls de canela con dulce de leche, Nutella, Oreo, M&M's o chocolate. 6 unidades.",
      price: 500,
      unitLabel: "6 unidades",
      image: "/products/roles-oreo-dulce-leche.jpg",
      badge: "Nuevo",
    },
    {
      name: "Rolls de jamón y queso",
      slug: "rolls-jamon-queso",
      category: "roles",
      tag: "salados",
      description: "Rolls rellenos de jamón y queso. 6 unidades.",
      price: 500,
      unitLabel: "6 unidades",
      image: "/products/cajas-roles-canela.jpg",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`  ✓ ${product.name} — $${product.price}`);
  }

  console.log(`\n✅ ${products.length} products seeded successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
