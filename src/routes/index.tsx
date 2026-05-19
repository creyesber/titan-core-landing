import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-athlete.jpg";
import { Check, Sparkles, ArrowRight, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { TitanChatbot } from "@/components/TitanChatbot";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Titan Nutrition — Asesoría Inteligente y Suplementos Premium" },
      {
        name: "description",
        content:
          "Suplementación deportiva premium con asesoría de Coach IA. Proteína, creatina, pre-entreno y más para llevar tu rendimiento al siguiente nivel.",
      },
      { property: "og:title", content: "Titan Nutrition — Asesoría Inteligente" },
      { property: "og:description", content: "Suplementos premium + Coach IA personalizado." },
    ],
  }),
});

const products = [
  {
    name: "Proteína Whey Isolate 1KG",
    img: "https://i.postimg.cc/MKxy1qbq/proteina.png",
    price: "34,95€",
    old: "42,00€",
    points: ["Aislado puro · 0% azúcar", "Sin lactosa", "27g proteína por batido"],
    use: "1 cazo (30g) con 250ml de agua tras entrenar.",
    badge: "-17%",
  },
  {
    name: "Creatina Monohidrato Creapure 500g",
    img: "https://i.postimg.cc/nckqkg0p/creatina.png",
    price: "22,50€",
    points: ["100% Sello Creapure®", "Aumento de fuerza y potencia", "Pureza farmacéutica"],
    use: "5g al día con agua o batido. Sin fase de carga.",
  },
  {
    name: "Pre-Entreno 'Explosive Energy'",
    img: "https://i.postimg.cc/ZKc6c2VJ/preentreno.png",
    price: "27,90€",
    points: ["200mg Cafeína", "Beta-Alanina + Citrulina", "Sabor Frutos Rojos"],
    use: "1 cazo 20 minutos antes de entrenar.",
    badge: "TOP",
  },
  {
    name: "Quemagrasas Thermo-Cut",
    img: "https://i.postimg.cc/J02fqYT3/quemagrasa.png",
    price: "19,95€",
    points: ["L-Carnitina + Té Verde", "Guaraná termogénico", "Acelera el metabolismo"],
    use: "2 cápsulas por la mañana y 1 antes de entrenar.",
  },
  {
    name: "Multivitamínico Daily Vital",
    img: "https://i.postimg.cc/Hk0KNLnZ/vitaminas.png",
    price: "14,50€",
    points: ["Vitaminas A-Z + Minerales", "Refuerza el sistema inmune", "Fórmula completa diaria"],
    use: "1 comprimido diario con el desayuno.",
  },
  {
    name: "Shaker Pro (700ml)",
    img: "https://i.postimg.cc/QVG44L3M/vaso.png",
    price: "4,95€",
    points: ["Libre de BPA", "Cierre hermético", "Compartimento inferior"],
    use: "Apto para lavavajillas.",
  },
];

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [externalProducts, setExternalProducts] = useState<
    Record<string, { name: string; img: string; price: string }>
  >({});

  const addToCart = (name: string) => {
    setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
    setCartOpen(true);
  };
  const dec = (name: string) =>
    setCart((c) => {
      const next = { ...c };
      if ((next[name] ?? 0) <= 1) delete next[name];
      else next[name] -= 1;
      return next;
    });
  const inc = (name: string) =>
    setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const removeItem = (name: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[name];
      return next;
    });

  // Listen for "add to cart" messages emitted by the chatbot iframe
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type !== "titan-add-to-cart" || !e.data.product?.name) return;
      const p = e.data.product as { name: string; img?: string; price?: string };
      const name = p.name;
      const isLocal = products.some((pr) => pr.name === name);
      if (!isLocal) {
        setExternalProducts((prev) => ({
          ...prev,
          [name]: { name, img: p.img || "", price: p.price || "0€" },
        }));
      }
      setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
      setCartOpen(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const parsePrice = (s: string) => {
    const n = parseFloat(String(s).replace(/[^\d,.-]/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };
  const cartItems = Object.entries(cart).map(([name, qty]) => {
    const product =
      products.find((p) => p.name === name) ||
      externalProducts[name] || { name, img: "", price: "0€" };
    return { product, qty };
  });
  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce(
    (s, i) => s + parsePrice(i.product.price) * i.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-green)] text-primary-foreground shadow-[var(--shadow-glow)]">
              T
            </span>
            TITAN<span className="text-primary">.</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="mailto:info@titannutrition.com" className="transition-colors hover:text-foreground">info@titannutrition.com</a>
            <a href="tel:+34900000000" className="transition-colors hover:text-foreground">+34 900 000 000</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/40 text-foreground transition hover:bg-card"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[image:var(--gradient-green)] px-1 text-[10px] font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                  {totalCount}
                </span>
              )}
            </button>
            <a
              href="#productos"
              className="rounded-xl bg-[image:var(--gradient-green)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
            >
              Comprar
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Atleta entrenando con pesas"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Powered by AI Coach
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
              TITAN NUTRITION:
              <br />
              <span className="bg-[image:var(--gradient-green)] bg-clip-text text-transparent">
                ASESORÍA INTELIGENTE
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Suplementación premium respaldada por ciencia deportiva y un Coach IA que diseña
              tu plan según tus objetivos. Forja tu mejor versión.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#productos"
                className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-green)] px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
              >
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  const iframe = document.querySelector<HTMLIFrameElement>('iframe[title="Coach IA Titan"]');
                  iframe?.contentWindow?.postMessage({ type: 'titan-open-chat' }, '*');
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur transition hover:bg-card"
              >
                Hablar con el Coach IA
              </button>
            </div>

            <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["+50K", "Atletas"],
                ["100%", "Pureza"],
                ["24/7", "Coach IA"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-primary">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="productos" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Catálogo
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              Suplementos de élite
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Cada producto formulado con ingredientes certificados y dosis efectivas según la
            evidencia científica más reciente.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-card)] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              {p.badge && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-[image:var(--gradient-green)] px-3 py-1 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                  {p.badge}
                </span>
              )}
              <div className="relative mx-auto mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary/60 to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,oklch(0.68_0.17_145/0.25),transparent_60%)]" />
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl font-bold leading-tight">{p.name}</h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary">{p.price}</span>
                {p.old && (
                  <span className="text-sm text-muted-foreground line-through">{p.old}</span>
                )}
              </div>

              <ul className="mt-5 space-y-2 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-lg border border-border/60 bg-background/40 p-3 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wider text-foreground/80">
                  Uso ·{" "}
                </span>
                {p.use}
              </div>

              <button
                onClick={() => addToCart(p.name)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <span aria-hidden>🛒</span> Añadir al carrito
              </button>
            </article>
          ))}
        </div>
      </section>


      <footer className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Titan Nutrition. Forjando atletas con ciencia.
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                <ShoppingCart className="h-5 w-5 text-primary" /> Tu carrito
                {totalCount > 0 && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                    {totalCount}
                  </span>
                )}
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Cerrar"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Tu carrito está vacío.
                </p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map(({ product, qty }) => (
                    <li
                      key={product.name}
                      className="flex gap-4 rounded-xl border border-border bg-background/40 p-3"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                        <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-tight">{product.name}</p>
                          <button
                            onClick={() => removeItem(product.name)}
                            aria-label="Eliminar"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-border">
                            <button
                              onClick={() => dec(product.name)}
                              className="grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground"
                              aria-label="Restar"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-sm">{qty}</span>
                            <button
                              onClick={() => inc(product.name)}
                              className="grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground"
                              aria-label="Sumar"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {(parsePrice(product.price) * qty).toFixed(2).replace(".", ",")}€
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border px-6 py-4">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  {totalPrice.toFixed(2).replace(".", ",")}€
                </span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  alert("¡Pedido ficticio realizado! 💪");
                  setCart({});
                  setCartOpen(false);
                }}
                className="w-full rounded-xl bg-[image:var(--gradient-green)] py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90 disabled:opacity-40"
              >
                Finalizar compra
              </button>
            </div>
          </aside>
        </div>
      )}

      <TitanChatbot />
    </div>

  );
}

