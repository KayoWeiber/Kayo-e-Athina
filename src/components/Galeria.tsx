import Reveal from "./Reveal";

export default function Galeria() {
  return (
  <main className="ka-container py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl ka-text-roxo-escuro">Galeria</h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-3 max-w-prose text-neutral-700">
          Em breve, fotos e memórias para aquecer o coração.
        </p>
      </Reveal>
    </main>
  );
}
