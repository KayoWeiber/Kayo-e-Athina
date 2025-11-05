import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
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
          {/* fundo suave com gradiente */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FAF8FF] to-white" aria-hidden />

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
    </main>
  );
}
export default Home;