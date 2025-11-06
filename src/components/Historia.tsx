import Reveal from "./Reveal";
import { Heart, Plane, Diamond } from "lucide-react";

export default function Historia() {
  const timeline = [
    {
      year: "2020",
      title: "Pedido de namoro",
      desc: "O início oficial de uma linda história a dois.",
      Icon: Heart,
    },
    {
      year: "2023",
      title: "Primeira viagem juntos",
      desc: "Aventura, risadas e memórias para guardar para sempre.",
      Icon: Plane,
    },
    {
      year: "2024",
      title: "Pedido de noiva",
      desc: "Com emoção e alegria, um passo a mais rumo ao futuro.",
      Icon: Diamond,
    },
    {
      year: "Novembro de 2026",
      title: "O tão esperado dia",
      desc: "Um sonho realizado, celebrando o amor com a família e amigos.",
      Icon: Heart,
    },
  ];
  return (
    <main className="ka-container py-12 md:py-16">
      {/* Título principal */}
      <Reveal>
        <h1 className="font-title text-3xl md:text-5xl font-extrabold tracking-tight ka-text-roxo-escuro text-center">
          Nossa História de Amor
        </h1>
      </Reveal>

      {/* Verso / Introdução */}
      <Reveal delay={80}>
        <p className="mt-4 max-w-prose text-neutral-700 text-base md:text-lg mx-auto text-center">
          Uma jornada incrível que começou com um olhar e se transformou em um amor eterno. Cada momento juntos foi
          especial e nos trouxe até este dia mágico.
        </p>
      </Reveal>

      {/* Cards com imagens dos noivos */}
      <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Card Noiva */}
        <Reveal>
          <figure className="group relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe bg-[#DDD6FE] p-4 flex flex-col">
            <div className="relative mx-auto w-[68%] md:w-[56%] aspect-square overflow-hidden rounded-full border-4 ka-border-roxo-escuro bg-white">
              <img
                src="nossa-historia/Noiva-imagem.png"
                alt="Foto da Noiva"
                className="h-full w-full object-cover transition-transform duration-900 ease-in-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <h2 className="text-xl font-semibold ka-text-roxo-escuro">Áthina</h2>
              <p className="mt-1 text-sm text-neutral-600">Estudante de direito, doce, forte e cheia de luz. Cada sorriso tornou a jornada mais bonita.</p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Card Noivo */}
        <Reveal delay={120}>
          <figure className="group relative overflow-hidden rounded-3xl ring-1 ka-border-detalhe bg-[#DDD6FE] p-4 flex flex-col">
            <div className="relative mx-auto w-[68%] md:w-[56%] aspect-square overflow-hidden rounded-full border-4 ka-border-roxo-escuro bg-white">
              <img
                src="nossa-historia/Noivo-imagem.png"
                alt="Foto do Noivo"
                className="h-full w-full object-cover transition-transform duration-900 ease-in-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <h2 className="text-xl font-semibold ka-text-roxo-escuro">Kayo</h2>
              <p className="mt-1 text-sm text-neutral-600">Desenvolvedor Web, sonhador e determinado. Cada passo guiou o destino até aqui.</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Nossa Jornada — Linha do Tempo */}
      <section className="mt-14 md:mt-20">
        <Reveal>
          <h2 className="font-title text-2xl md:text-4xl font-bold ka-text-roxo-escuro text-center">Nossa Jornada</h2>
        </Reveal>

        <div className="relative mx-auto mt-8 md:mt-10 max-w-4xl">
          {/* Linha central */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-linear-to-b from-[#EDE9FE] via-[#C4B5FD] to-[#EDE9FE]"
            aria-hidden
          />

          <ol className="space-y-10 md:space-y-16">
            {timeline.map(({ year, title, desc, Icon }, idx) => {
              const left = idx % 2 === 0;
              return (
                <li key={idx} className="relative">
                  {/* Desktop layout */}
                  <div className="hidden md:flex md:items-stretch">
                    {/* Left side (or placeholder) */}
                    <div className={left ? "md:w-[calc(50%-44px)] pr-8" : "md:w-[calc(50%-44px)]"}>
                      {left && (
                        <div className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ka-border-detalhe flex flex-col justify-center">
                          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">{year}</div>
                          <div className="mt-1.5 text-lg md:text-xl font-semibold ka-text-roxo-escuro">{title}</div>
                          <p className="mt-1.5 text-sm text-neutral-600">{desc}</p>
                        </div>
                      )}
                    </div>
                    {/* Icon column */}
                    <div className="flex w-[88px] justify-center">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#C4B5FD] ring-2 ka-border-roxo-escuro shadow-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Right side */}
                    <div className={!left ? "md:w-[calc(50%-44px)] pl-8" : "md:w-[calc(50%-44px)]"}>
                      {!left && (
                        <div className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ka-border-detalhe flex flex-col justify-center">
                          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">{year}</div>
                          <div className="mt-1.5 text-lg md:text-xl font-semibold ka-text-roxo-escuro">{title}</div>
                          <p className="mt-1.5 text-sm text-neutral-600">{desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div className="flex justify-center">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#C4B5FD] ring-2 ka-border-roxo-escuro shadow-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ka-border-detalhe">
                      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">{year}</div>
                      <div className="mt-1.5 text-lg font-semibold ka-text-roxo-escuro">{title}</div>
                      <p className="mt-1.5 text-sm text-neutral-600">{desc}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </main>
  );
}
