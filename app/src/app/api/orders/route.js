import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function generateOrderNumber() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `DBV-${num}`;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      items,
      customerName,
      whatsapp,
      deliveryMethod,
      paymentMethod,
      address,
      cardMessage,
    } = body;

    // ── Validation ──
    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No hay productos en el pedido" },
        { status: 400 }
      );
    }

    if (!customerName || !whatsapp) {
      return NextResponse.json(
        { success: false, error: "Faltan datos del cliente" },
        { status: 400 }
      );
    }

    if (!["PICKUP", "DELIVERY"].includes(deliveryMethod)) {
      return NextResponse.json(
        { success: false, error: "Método de entrega inválido" },
        { status: 400 }
      );
    }

    if (!["CASH", "ONLINE"].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: "Método de pago inválido" },
        { status: 400 }
      );
    }

    if (deliveryMethod === "DELIVERY" && !address) {
      return NextResponse.json(
        { success: false, error: "Falta la dirección para delivery" },
        { status: 400 }
      );
    }

    // ── Calculate totals ──
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const shippingCost = deliveryMethod === "DELIVERY" ? 0 : 0;
    const total = subtotal + shippingCost;

    // ── Generate unique order number ──
    let orderNumber = generateOrderNumber();
    // Ensure uniqueness (unlikely collision, but safe)
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.order.findUnique({
        where: { orderNumber },
      });
      if (!existing) break;
      orderNumber = generateOrderNumber();
      attempts++;
    }

    // ── Create order ──
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        whatsapp,
        deliveryMethod,
        paymentMethod,
        address: address || null,
        cardMessage: cardMessage || null,
        items,
        subtotal,
        shippingCost,
        total,
        status: "RECEIVED",
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      total: order.total,
      items: order.items,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al crear el pedido" },
      { status: 500 }
    );
  }
}
