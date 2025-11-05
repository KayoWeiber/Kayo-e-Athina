import Reveal from "./Reveal";

export default function Historia() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl ka-text-roxo-escuro">Nossa História</h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-3 max-w-prose text-neutral-700">
          Em breve, vamos compartilhar os capítulos mais especiais da nossa jornada.
        </p>
      </Reveal>
    </main>
  );
}
