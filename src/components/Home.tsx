import { useEffect, useMemo, useState } from "react";
import { Heart, MapPin, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  // Target date: 14/11/2026 às 16:00 (horário local)
  const targetDate = useMemo(() => new Date(2026, 10, 14, 16, 0, 0), []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  });
  const [mapOpen, setMapOpen] = useState(false);

  // Fechar modal com ESC
  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMapOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapOpen]);

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    };

    // Executa imediatamente e depois a cada segundo
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <main>
      {/* Início (Hero) */}
      <section id="inicio" className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
        <div className="relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe">
          {/* fundo suave com gradiente lilás dentro do "quadrado" */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FAF8FF] to-[#EDE9FE]" aria-hidden />

          <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center text-center p-8">
            {/* Coração animado acima do nome */}
            <Heart
              size={56}
              className="mb-4 ka-text-lilas motion-safe:animate-bounce"
              aria-hidden
              fill="currentColor"
            />

            <h1 className="font-title text-4xl md:text-6xl font-extrabold tracking-tight ka-text-roxo-escuro">
              Kayo e Áthina
            </h1>
            <p className="mt-3 text-base md:text-lg text-neutral-600">
              Casamento • 14/11/2026 às 16 horas
            </p>

            {/* Contagem regressiva */}
            <div className="mt-8 inline-grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" aria-live="polite">
              <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">{timeLeft.days}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Dias</div>
              </div>
              <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">{String(timeLeft.hours).padStart(2, "0")}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Horas</div>
              </div>
              <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">{String(timeLeft.minutes).padStart(2, "0")}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Minutos</div>
              </div>
              <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">{String(timeLeft.seconds).padStart(2, "0")}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Segundos</div>
              </div>
            </div>
            {timeLeft.completed && (
              <p className="mt-4 text-sm font-semibold ka-text-roxo-escuro">
                Chegou o grande dia!
              </p>
            )}

            {/* CTA: Nossa História */}
            <Link to="/nossa-historia" className="mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 ka-btn-primary shadow-lg transition hover:opacity-90 hover:shadow-xl">
              Nossa História
            </Link>
          </div>
        </div>
      </section>

      {/* Local do casamento */}
      <section
        id="local"
        className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 border-t"
      >
        <div className="relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe p-6 md:p-8 ka-bg-gelobranco">
          <div className="flex flex-col gap-4 md:gap-5 text-center items-center">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1 ka-border-detalhe bg-white/60">
              <MapPin className="h-4 w-4 ka-text-roxo-escuro" />
              <span className="font-medium ka-text-roxo-escuro">Local do casamento</span>
            </div>

            <h2 className="font-title text-2xl md:text-3xl font-bold ka-text-roxo-escuro">
              Pousada Yokohama, Planura — MG
            </h2>
            <p className="text-neutral-700 max-w-prose">
              Zona Rural, s/n — Zona Rural, Planura — MG, 38220-000
            </p>
            <p className="text-neutral-500 text-sm">
              Plus Code: <a className="underline hover:opacity-80" href="https://www.google.com/maps/search/?api=1&query=V72M%2B8V%20Planura%2C%20Minas%20Gerais" target="_blank" rel="noreferrer">V72M+8V Planura, Minas Gerais</a>
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 ka-btn-primary shadow-md transition hover:opacity-90 hover:shadow-lg"
              >
                <MapPin className="h-4 w-4" /> Ver no mapa
              </button>
              <a
                href="https://www.google.com/maps?q=-20.1494167,-48.7151111&hl=pt-BR&z=16"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 ring-1 ka-border-detalhe bg-white/70 hover:bg-white transition"
              >
                Abrir no Google Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Modal do mapa (não exibir direto para manter visual limpo) */}
          {mapOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Mapa do local do casamento"
              onClick={(e) => {
                if (e.target === e.currentTarget) setMapOpen(false);
              }}
            >
              <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 ring-1 ka-border-detalhe hover:bg-white"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5 ka-text-roxo-escuro" />
                </button>
                <div className="aspect-video w-full">
                  <iframe
                    title="Mapa — Pousada Yokohama"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=-20.1494167,-48.7151111&hl=pt-BR&z=16&output=embed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
export default Home;