import { useEffect, useMemo, useState } from "react";
import { Heart, MapPin, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Typewriter from "./Typewriter";
import { cn } from "../lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const [versePhase, setVersePhase] = useState<"typing" | "holdText" | "underline" | "restart">("typing");
  const verseVisible = versePhase === "holdText" || versePhase === "underline";

  // Embla API para reInit após carregar imagem
  const [embla, setEmbla] = useState<CarouselApi | null>(null);

  // Autoplay: troca a imagem a cada 10s indo para o próximo índice
  useEffect(() => {
    if (!embla) return;

    let index = embla.selectedScrollSnap();
    const run = () => {
      const total = embla.scrollSnapList().length;
      index = (index + 1) % total;
      embla.scrollTo(index);
    };

    const id = window.setInterval(run, 10000);
    return () => window.clearInterval(id);
  }, [embla]);

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
      {/* Verso de abertura */}
      <section className="ka-container pt-4 md:pt-6">
        <div className="relative overflow-hidden rounded-2xl ring-1 ka-border-detalhe bg-white/70 px-4 py-3 md:px-6 md:py-4 text-center">
          <Typewriter
            text="“Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos”"
            speed={32}
            startDelay={300}
            loop
            delayAfterEndMs={5000}
            underlineHoldMs={3000}
            onPhaseChange={(phase) => setVersePhase(phase)}
            className="font-body text-sm md:text-base ka-text-roxo-escuro"
          />
          <div
            className={cn(
              "mt-1 text-xs text-neutral-600 transition-all duration-300 ease-out",
              verseVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            )}
          >
            Provérbios 16:3
          </div>
        </div>
      </section>

      {/* Início (Hero) */}
      <section id="inicio" className="ka-container py-6 md:py-10 scroll-mt-16 md:scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe">
          {/* fundo suave com gradiente lilás dentro do "quadrado" */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FAF8FF] to-[#EDE9FE]" aria-hidden />

          {/* items-stretch evita que o viewport do carrossel fique estreito */}
          <div className="relative z-10 flex min-h-[70vh] flex-col items-stretch justify-center text-center p-8">
            {/* Coração animado acima do nome */}
            <Reveal className="self-center">
              <Heart
                size={56}
                className="mb-4 ka-text-lilas motion-safe:animate-bounce "
                aria-hidden
                fill="currentColor"
              />
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-title text-4xl md:text-6xl font-extrabold tracking-tight ka-text-roxo-escuro">
                Kayo e Áthina
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-3 text-base md:text-lg text-neutral-600">
                Casamento • 14/11/2026 às 16 horas
              </p>
            </Reveal>

            {/* Foto do casal (hero) — carrossel */}
            <Reveal delay={180}>
              <div className="mt-3 w-full self-stretch max-w-2xl md:max-w-2xl lg:max-w-3xl xl:max-w-2xl mx-auto overflow-hidden rounded-3xl border-4 ka-border-roxo-escuro bg-white/60 shadow-sm min-w-0 relative z-10">
                  <Carousel
                    className="w-full min-w-0"
                    opts={{ loop: true, align: "center" }}
                    setApi={setEmbla}
                  >
                    <CarouselContent className="min-w-0">
                      {["casal-principal.png", "2-casal-principal.png", "3-casal-principal.png"].map(
                        (src, idx) => (
                          <CarouselItem key={idx} className="basis-full">
                            <div className="relative w-full h-[380px] sm:h-[380px] md:h-[560px] min-w-0">
                              <img
                                src={src}
                                alt={`Kayo e Áthina — foto ${idx + 1}`}
                                  className="absolute inset-0 w-full h-full object-cover"
                                decoding="async"
                                loading={idx === 0 ? "eager" : "lazy"}
                                sizes="(min-width:1280px) 960px, (min-width:1024px) 768px, (min-width:640px) 600px, 100vw"
                                onLoad={() => embla?.reInit()}
                              />
                            </div>
                          </CarouselItem>
                        )
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 md:left-3 bg-white/90 ring-1 ka-border-detalhe hover:bg-white" />
                    <CarouselNext className="right-2 md:right-3 bg-white/90 ring-1 ka-border-detalhe hover:bg-white" />
                  </Carousel>
              </div>
            </Reveal>

            {/* Contagem regressiva */}
            <div className="mt-8 inline-grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" aria-live="polite">
              <Reveal>
                <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">{timeLeft.days}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Dias</div>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Horas</div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Minutos</div>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="rounded-xl px-4 py-5 text-center shadow-sm ring-1 ka-bg-gelo ka-border-detalhe transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl font-extrabold ka-text-roxo-escuro">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">Segundos</div>
                </div>
              </Reveal>
            </div>
            {timeLeft.completed && (
              <p className="mt-4 text-sm font-semibold ka-text-roxo-escuro">Chegou o grande dia!</p>
            )}

            {/* CTA: Nossa História */}
            <Reveal delay={220}>
              <Link
                to="/nossa-historia"
                className="mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 ka-btn-primary shadow-lg transition hover:opacity-90 hover:shadow-xl"
              >
                Nossa História
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Local do casamento */}
      <section
        id="local"
        className="ka-container py-10 md:py-14 border-t scroll-mt-16 md:scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe p-6 md:p-8 ka-bg-gelo">
          <div className="flex flex-col gap-4 md:gap-5 text-center items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1 ka-border-detalhe bg-white/60">
                <MapPin className="h-4 w-4 ka-text-roxo-escuro" />
                <span className="font-medium ka-text-roxo-escuro">Local do casamento</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-title text-2xl md:text-3xl font-bold ka-text-roxo-escuro">
                Pousada Yokohama, Planura — MG
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-neutral-700 max-w-prose">
                Zona Rural, s/n — Zona Rural, Planura — MG, 38220-000
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-neutral-500 text-sm">
                Plus Code:{" "}
                <a
                  className="underline hover:opacity-80"
                  href="https://www.google.com/maps/search/?api=1&query=V72M%2B8V%20Planura%2C%20Minas%20Gerais"
                  target="_blank"
                  rel="noreferrer"
                >
                  V72M+8V Planura, Minas Gerais
                </a>
              </p>
            </Reveal>

            <Reveal delay={260}>
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
            </Reveal>
          </div>

          {/* Modal do mapa */}
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
