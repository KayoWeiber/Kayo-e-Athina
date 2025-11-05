function Home() {
  return (
    <main>
      {/* Início */}
      <section id="inicio" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h1
          className="text-3xl font-extrabold tracking-tight md:text-4xl"
          style={{ color: "#5B21B6" }}
        >
          Bem-vindos, Kayo & Áthina 💜
        </h1>
        <p className="mt-3 max-w-prose text-base text-neutral-600">
          Aqui começa nossa história. Role a página para saber mais e ver nossa galeria.
        </p>
      </section>

      {/* Nossa História */}
      <section
        id="nossa-historia"
        className="border-y"
        style={{ backgroundColor: "#FAF8FF", borderColor: "#EDE9FE" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-2xl font-bold" style={{ color: "#5B21B6" }}>
            Nossa História
          </h2>
          <p className="mt-3 max-w-prose text-neutral-700">
            Um espaço para contar os capítulos mais especiais da nossa jornada.
          </p>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-2xl font-bold" style={{ color: "#5B21B6" }}>
          Galeria
        </h2>
        <p className="mt-3 max-w-prose text-neutral-700">
          Em breve, fotos e memórias para aquecer o coração.
        </p>
      </section>
    </main>
  );
}
export default Home;