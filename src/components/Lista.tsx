import Reveal from "./Reveal";
import { ExternalLink, Gift, Copy } from "lucide-react";
import { useMemo } from "react";

type Present = {
  id: string;
  name: string;
  link: string;
  imageUrl?: string;
};

const PRESENTS: Present[] = [
  // Exemplos — substitua pelos seus itens reais
  {
    id: "p1",
    name: "Jogo de Taças",
    link: "https://exemplo.com/produto/jogo-de-tacas",
    imageUrl: "https://images.unsplash.com/photo-1549161099-6adf5a1a6b05?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Aparelho de Jantar",
    link: "https://exemplo.com/produto/aparelho-de-jantar",
    imageUrl: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Liquidificador",
    link: "https://exemplo.com/produto/liquidificador",
    // sem imageUrl: usa fallback visual
  },
];

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function PresentCard({ present }: { present: Present }) {
  const domain = useMemo(() => getDomain(present.link), [present.link]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(present.link);
    } catch {
      // ignore
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl ring-1 ka-border-detalhe bg-white/70 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
  <div className="relative aspect-16/11 w-full bg-linear-to-b from-[#FAF8FF] to-[#EDE9FE]">
        {present.imageUrl ? (
          <img
            src={present.imageUrl}
            alt={present.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 ka-border-roxo-escuro bg-white shadow">
              <Gift className="h-7 w-7 ka-text-roxo-escuro" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          {/* favicon do domínio */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 rounded"
            loading="lazy"
          />
          <span className="text-xs text-neutral-500">{domain}</span>
        </div>
        <h3 className="mt-1.5 text-base md:text-lg font-semibold ka-text-roxo-escuro">{present.name}</h3>

        <div className="mt-3 flex items-center gap-2">
          <a
            href={present.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ka-border-detalhe bg-white hover:bg-white/80 text-sm"
          >
            Ver item <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 ka-btn-primary text-sm"
          >
            Copiar link <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Lista() {
  return (
    <main className="ka-container py-12 md:py-16">
      <Reveal>
        <h1 className="font-title text-3xl md:text-5xl font-extrabold tracking-tight ka-text-roxo-escuro text-center">
          Lista de Presentes
        </h1>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-3 text-neutral-700 text-center max-w-prose mx-auto">
          Sua presença é o nosso maior presente, mas se desejar nos presentear, aqui estão algumas sugestões
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {PRESENTS.map((p) => (
          <Reveal key={p.id}>
            <PresentCard present={p} />
          </Reveal>
        ))}
      </div>

    </main>
  );
}
