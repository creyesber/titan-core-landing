import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-athlete.jpg";
import { Check, Zap, Sparkles, ArrowRight, Send } from "lucide-react";

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
    img: "https://i.ibb.co/hxTnhWfn/proteina.png",
    price: "34,95€",
    old: "42,00€",
    points: ["Aislado puro · 0% azúcar", "Sin lactosa", "27g proteína por batido"],
    use: "1 cazo (30g) con 250ml de agua tras entrenar.",
    badge: "-17%",
  },
  {
    name: "Creatina Monohidrato Creapure 500g",
    img: "https://i.ibb.co/BVGvt2Lb/creatina.png",
    price: "22,50€",
    points: ["100% Sello Creapure®", "Aumento de fuerza y potencia", "Pureza farmacéutica"],
    use: "5g al día con agua o batido. Sin fase de carga.",
  },
  {
    name: "Pre-Entreno 'Explosive Energy'",
    img: "https://i.ibb.co/4ZN7YMv0/preentreno.png",
    price: "27,90€",
    points: ["200mg Cafeína", "Beta-Alanina + Citrulina", "Sabor Frutos Rojos"],
    use: "1 cazo 20 minutos antes de entrenar.",
    badge: "TOP",
  },
  {
    name: "Quemagrasas Thermo-Cut",
    img: "https://i.ibb.co/B5LtqcgM/quemagrasa.png",
    price: "19,95€",
    points: ["L-Carnitina + Té Verde", "Guaraná termogénico", "Acelera el metabolismo"],
    use: "2 cápsulas por la mañana y 1 antes de entrenar.",
  },
  {
    name: "Multivitamínico Daily Vital",
    img: "https://i.ibb.co/fVSpxpBk/vitaminas.png",
    price: "14,50€",
    points: ["Vitaminas A-Z + Minerales", "Refuerza el sistema inmune", "Fórmula completa diaria"],
    use: "1 comprimido diario con el desayuno.",
  },
  {
    name: "Shaker Pro (700ml)",
    img: "https://i.ibb.co/S7wsdfvF/vaso.png",
    price: "4,95€",
    points: ["Libre de BPA", "Cierre hermético", "Compartimento inferior"],
    use: "Apto para lavavajillas.",
  },
];

function Index() {
  const [sent, setSent] = useState(false);

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
          <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#productos" className="transition-colors hover:text-foreground">Productos</a>
            <a href="#ciencia" className="transition-colors hover:text-foreground">Ciencia</a>
            <a href="#coach" className="transition-colors hover:text-foreground">Coach IA</a>
          </nav>
          <a
            href="#productos"
            className="rounded-xl bg-[image:var(--gradient-green)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
          >
            Comprar
          </a>
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
              <a
                href="#coach"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur transition hover:bg-card"
              >
                Hablar con el Coach IA
              </a>
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
                  className="relative h-[78%] w-[78%] object-contain transition-transform duration-500 group-hover:scale-110"
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

              <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
                Añadir al carrito <Zap className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Coach IA / Contact */}
      <section
        id="coach"
        className="relative overflow-hidden border-y border-border bg-[image:var(--gradient-hero)] py-24"
      >
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_50%,oklch(0.68_0.17_145/0.15),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Coach IA Titan
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
              Tu plan, diseñado por inteligencia artificial.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Cuéntanos tu objetivo, tu nivel y tu rutina. Nuestro Coach IA analizará tu perfil
              y te recomendará la combinación de suplementos perfecta para ti.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Recomendaciones personalizadas en segundos",
                "Plan de dosificación detallado",
                "Soporte continuo de nuestros expertos",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-2xl border border-border bg-card/80 p-8 shadow-[var(--shadow-card)] backdrop-blur"
          >
            <h3 className="font-display text-2xl font-bold">Envía tu consulta</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Respondemos en menos de 24h.
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" name="name" placeholder="Tu nombre" />
                <Field label="Email" name="email" type="email" placeholder="tu@email.com" />
              </div>
              <Field label="Objetivo" name="goal" placeholder="Ganar masa, definir, rendimiento…" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntale al coach sobre tu rutina y experiencia…"
                  className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-green)] px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01]"
              >
                {sent ? "¡Enviado!" : "Consultar al Coach IA"} <Send className="h-4 w-4" />
              </button>
              {sent && (
                <p className="text-center text-sm text-primary">
                  Gracias. Te contactaremos pronto.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Titan Nutrition. Forjando atletas con ciencia.
      </footer>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
