"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Store,
  Bike,
  Check,
  Banknote,
  Smartphone,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const fmt = (n) => "$" + n.toLocaleString("es-UY");

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [deliveryMethod, setDeliveryMethod] = useState("PICKUP");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    address: "",
    cardMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const shippingCost = deliveryMethod === "DELIVERY" ? 0 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "¿Cómo te llamás?";
    if (!formData.whatsapp.trim()) errs.whatsapp = "Necesitamos tu WhatsApp";
    else if (!/^[0-9\s\-+()]{7,15}$/.test(formData.whatsapp.trim()))
      errs.whatsapp = "Número inválido";
    if (deliveryMethod === "DELIVERY" && !formData.address.trim())
      errs.address = "Necesitamos la dirección para el delivery";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
            image: i.image,
          })),
          customerName: formData.name.trim(),
          whatsapp: formData.whatsapp.trim(),
          deliveryMethod,
          paymentMethod,
          address:
            deliveryMethod === "DELIVERY" ? formData.address.trim() : null,
          cardMessage: formData.cardMessage.trim() || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderResult(data);
        clearCart();

        // Generar link y redirigir automáticamente
        const waUrl = generateWhatsAppLink({
          ...data,
          customerName: formData.name.trim(),
          deliveryMethod,
          paymentMethod,
          address: deliveryMethod === "DELIVERY" ? formData.address.trim() : null,
          cardMessage: formData.cardMessage.trim(),
        });

        // Redirigir después de un breve instante para que el usuario vea el cambio de estado
        setTimeout(() => {
          window.location.href = waUrl;
        }, 1000);
      } else {
        alert("Error al crear el pedido. Intentá de nuevo.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Error de conexión. Intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppLink = (order) => {
    const phone = "59899381544"; // Viky's phone number
    const itemsText = order.items
      .map((i) => `• ${i.qty}x ${i.name} (${fmt(i.price * i.qty)})`)
      .join("\n");

    let message = `¡Hola Viky! Soy ${order.customerName}, acabo de hacer un pedido desde la web.

*Detalle:*
${itemsText}

*Total:* ${fmt(order.total)}
*Entrega:* ${order.deliveryMethod === "DELIVERY" ? "Delivery" : "Retiro"}
*Pago:* ${order.paymentMethod === "ONLINE" ? "Transferencia" : "Efectivo"}`;

    if (order.address && order.deliveryMethod === "DELIVERY") {
      message += `\n*Dirección:* ${order.address}`;
    }

    if (order.cardMessage) {
      message += `\n*Mensaje en tarjetita:* ${order.cardMessage}`;
    }

    message += `\n\nQuedo a la espera de tu confirmación`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // ─── Order confirmation ───
  if (orderResult) {
    return (
      <div className="max-w-[540px] mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🤍</div>
        <h1 className="text-3xl sm:text-4xl mb-3">
          ¡Listo, ya recibí tu pedido!
        </h1>
        <p className="text-base text-choc-700 mb-6 max-w-md mx-auto">
          En un momento serás redirigido a WhatsApp para <b>enviarme el detalle</b> y coordinar el pago. Si no sucede, hacé clic en el botón:
        </p>

        <a
          href={generateWhatsAppLink({
            ...orderResult,
            customerName: formData.name,
            deliveryMethod,
            paymentMethod,
            address: deliveryMethod === "DELIVERY" ? formData.address : null,
            cardMessage: formData.cardMessage,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-lila-500 hover:bg-lila-600 text-white font-bold text-lg rounded-full no-underline transition-all shadow-md hover:shadow-lg active:scale-[0.97] mb-8"
        >
          <Smartphone size={22} strokeWidth={2.5} className="text-white" />
          <span className="text-white">Enviar por WhatsApp</span>
        </a>

        <div className="bg-white rounded-[28px] p-5 shadow-sm text-left border border-cream-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-display text-lg font-medium">Resumen</h4>
            <div className="bg-cream-100 px-3 py-1 rounded-full font-mono text-xs text-choc-700">
              #{orderResult.orderNumber}
            </div>
          </div>
          {orderResult.items?.map((item, i) => (
            <div
              key={i}
              className="flex justify-between py-1.5 text-sm text-choc-700"
            >
              <span>
                {item.qty}× {item.name}
              </span>
              <span className="font-semibold">
                {fmt(item.price * item.qty)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-2 border-t border-dashed border-cream-300 font-bold text-lg text-choc-900">
            <span>Total</span>
            <span>{fmt(orderResult.total)}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-10 text-choc-500 hover:text-choc-700 font-semibold no-underline transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
          Volver al inicio
        </Link>
      </div>
    );
  }

  // ─── Empty cart redirect ───
  if (cart.length === 0 && !orderResult) {
    return (
      <div className="max-w-[540px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl mb-4">Tu cajita está vacía</h1>
        <p className="text-choc-500 mb-6">
          Agregá productos antes de confirmar tu pedido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-lila-400 hover:bg-lila-500 text-white font-bold text-[15px] rounded-full no-underline transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
          Ver el menú
        </Link>
      </div>
    );
  }

  // ─── Checkout form ───
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-choc-500 no-underline hover:text-choc-700 mb-4"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Seguir mirando
      </Link>

      <h1 className="text-3xl sm:text-4xl mb-6">Confirmá tu pedido</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8"
      >
        {/* Left column — form */}
        <div className="flex flex-col gap-5">
          {/* Step 1: Delivery */}
          <section className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm">
            <h3 className="font-display text-xl sm:text-[22px] font-medium mb-4">
              1 · ¿Cómo lo querés recibir?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod("PICKUP")}
                className={`p-4 rounded-[14px] text-left transition-all duration-[220ms] cursor-pointer ${deliveryMethod === "PICKUP"
                  ? "bg-lila-100 shadow-[inset_0_0_0_2px_var(--color-lila-400)]"
                  : "bg-cream-100 hover:bg-cream-200"
                  }`}
              >
                <div className="flex items-center gap-2 font-bold text-choc-900 text-sm">
                  <Store size={18} strokeWidth={1.75} /> Retiro
                </div>
                <div className="text-xs text-choc-500 mt-1">
                  Sin cargo · te paso la dirección por WhatsApp
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMethod("DELIVERY")}
                className={`p-4 rounded-[14px] text-left transition-all duration-[220ms] cursor-pointer ${deliveryMethod === "DELIVERY"
                  ? "bg-lila-100 shadow-[inset_0_0_0_2px_var(--color-lila-400)]"
                  : "bg-cream-100 hover:bg-cream-200"
                  }`}
              >
                <div className="flex items-center gap-2 font-bold text-choc-900 text-sm">
                  <Bike size={18} strokeWidth={1.75} /> Delivery
                </div>
                <div className="text-xs text-choc-500 mt-1">
                  GRATIS · Punta del Este y alrededores
                </div>
              </button>
            </div>
          </section>

          {/* Step 2: Payment */}
          <section className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm">
            <h3 className="font-display text-xl sm:text-[22px] font-medium mb-4">
              2 · ¿Cómo preferís pagar?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("CASH")}
                className={`p-4 rounded-[14px] text-left transition-all duration-[220ms] cursor-pointer ${paymentMethod === "CASH"
                  ? "bg-lila-100 shadow-[inset_0_0_0_2px_var(--color-lila-400)]"
                  : "bg-cream-100 hover:bg-cream-200"
                  }`}
              >
                <div className="flex items-center gap-2 font-bold text-choc-900 text-sm">
                  <Banknote size={18} strokeWidth={1.75} /> Efectivo
                </div>
                <div className="text-xs text-choc-500 mt-1">
                  Pagás al retirar o recibir
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("ONLINE")}
                className={`p-4 rounded-[14px] text-left transition-all duration-[220ms] cursor-pointer ${paymentMethod === "ONLINE"
                  ? "bg-lila-100 shadow-[inset_0_0_0_2px_var(--color-lila-400)]"
                  : "bg-cream-100 hover:bg-cream-200"
                  }`}
              >
                <div className="flex items-center gap-2 font-bold text-choc-900 text-sm">
                  <Smartphone size={18} strokeWidth={1.75} /> Transferencia
                </div>
                <div className="text-xs text-choc-500 mt-1">
                  Te paso los datos por WhatsApp
                </div>
              </button>
            </div>
          </section>

          {/* Step 3: Personal data */}
          <section className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm">
            <h3 className="font-display text-xl sm:text-[22px] font-medium mb-4">
              3 · Tus datos
            </h3>

            <div className="flex flex-col gap-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-choc-700 mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="¿Cómo te llamás?"
                  className={`w-full bg-cream-100 text-choc-900 rounded-[14px] px-4 py-3 text-[15px] outline-none transition-shadow duration-[220ms] ${errors.name
                    ? "shadow-[0_0_0_2px_var(--color-danger)]"
                    : "focus:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--color-lila-300)]"
                    }`}
                />
                {errors.name && (
                  <p className="text-sm text-danger mt-1">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-choc-700 mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="099 123 456"
                  className={`w-full bg-cream-100 text-choc-900 rounded-[14px] px-4 py-3 text-[15px] outline-none transition-shadow duration-[220ms] ${errors.whatsapp
                    ? "shadow-[0_0_0_2px_var(--color-danger)]"
                    : "focus:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--color-lila-300)]"
                    }`}
                />
                {errors.whatsapp && (
                  <p className="text-sm text-danger mt-1">{errors.whatsapp}</p>
                )}
              </div>

              {/* Address (only for delivery) */}
              {deliveryMethod === "DELIVERY" && (
                <div>
                  <label className="block text-xs font-bold text-choc-700 mb-1.5">
                    Dirección de entrega
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, número, apto"
                    className={`w-full bg-cream-100 text-choc-900 rounded-[14px] px-4 py-3 text-[15px] outline-none transition-shadow duration-[220ms] ${errors.address
                      ? "shadow-[0_0_0_2px_var(--color-danger)]"
                      : "focus:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--color-lila-300)]"
                      }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-danger mt-1">{errors.address}</p>
                  )}
                </div>
              )}

              {/* Card message */}
              <div>
                <label className="block text-xs font-bold text-choc-700 mb-1.5">
                  Mensaje en la tarjetita (opcional)
                </label>
                <input
                  type="text"
                  name="cardMessage"
                  value={formData.cardMessage}
                  onChange={handleChange}
                  placeholder="¡Feliz cumple!"
                  className="w-full bg-cream-100 text-choc-900 rounded-[14px] px-4 py-3 text-[15px] outline-none transition-shadow duration-[220ms] focus:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--color-lila-300)]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right column — order summary */}
        <aside>
          <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm sticky top-24">
            <h3 className="font-display text-xl sm:text-[22px] font-medium mb-4">
              Tu cajita
            </h3>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 text-sm text-choc-700"
              >
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span>
                    {item.qty}× {item.name}
                  </span>
                </span>
                <span className="font-semibold shrink-0 ml-2">
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            ))}

            <div className="flex justify-between py-2 text-sm">
              <span className="text-choc-500">Envío</span>
              <span>{shippingCost ? fmt(shippingCost) : "sin cargo"}</span>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-dashed border-cream-300 font-bold text-lg">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full mt-5 py-3.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-[220ms] cursor-pointer ${submitting
                ? "bg-cream-200 text-choc-500"
                : "bg-lila-400 hover:bg-lila-500 text-white active:scale-[0.97]"
                }`}
            >
              <Check size={18} strokeWidth={2} />
              {submitting ? "Enviando..." : "Confirmar pedido"}
            </button>

            <p className="text-xs text-choc-500 mt-3 text-center">
              Te confirmo por WhatsApp en cuanto reciba tu pedido.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
