# Admin UI kit — delicate by Viky

Internal panel for Viky to manage incoming orders. Designed for ~100 orders/month — kept deliberately simple.

## Screens
1. **Pedidos** (orders list) — KPIs at the top (today / in-prep / week / month revenue), status tabs (Hoy · Próximos · Entregados), table with code, customer, when, mode (retiro/delivery), total, status pill.
2. **Detalle del pedido** — status timeline (recibido → en preparación → listo → entregado) with one-click "Empezar a preparar" / "Marcar lista" / "Marcar entregada", item list, contact + address + tarjetita message, payment status. WhatsApp / print actions.
3. Placeholders for **Calendario**, **Productos**, **Clientes** — kept as "en construcción" cards with the same chrome so the IA expansion is clear.

## Components (inline)
`Sidebar` (dark choco-900 with lilac active state) · `OrdersPage` · `DetailPage` · `Placeholder` · `Icon`

## Design notes
- **Dark sidebar, light content** — keeps the photo-heavy storefront feel out of admin (admin is a tool, not a showcase).
- Status pills follow the semantic palette: lila (recibido) · amber (en prep) · olive (listo) · gray (entregado).
- Greeting in script (`¡buen día, Viky!`) above the page title — keeps the brand warmth in a utility surface.
- Tarjetita message displayed in script font when present — preserves the personal-baker emotion through to fulfillment.
