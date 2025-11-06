import Reveal from "./Reveal";

export default function Historia() {
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
    </main>
  );
}
