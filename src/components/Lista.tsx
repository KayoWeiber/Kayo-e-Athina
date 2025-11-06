import Reveal from "./Reveal";
import { ExternalLink, Gift, Copy, X, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
    name: "Conjunto de 6 Taças em Vidro - Jogo Canelado para Sobremesa e Sorvete, 320ml",
    link: "https://www.amazon.com.br/dp/B0DJ6D53QR/?coliid=I2XF1QVNYYTQUD&colid=1WPB0V6FADKGO&psc=1s",
    imageUrl: "https://m.media-amazon.com/images/I/71df4uZB7mL._AC_SX679_.jpg",
  },
  {
    id: "p2",
    name: "Micro-ondas Electrolux 31L cor Inox Espelhado com Painel Integrado e Função Tira Odor (MI41S) - 127V",
    link: "https://www.amazon.com.br/dp/B076XCSJ4Q/?coliid=I4DIG2O0Q5UYT&colid=1WPB0V6FADKGO&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/51jWG1vyGyL._AC_SX466_.jpg",
  },
  {
    id: "p3",
    name: "Batedeira planetária Electrolux potente capacidade 5L 750W 12 velocidades função pulsar massa pesada pes antiderrapante EKM30 preto 127v",
    link: "https://www.amazon.com.br/dp/B0B4KPV7F7/?coliid=IMFWUNZZB4XRK&colid=1WPB0V6FADKGO&th=1",
    imageUrl:"https://m.media-amazon.com/images/I/51v05wv2qlL._AC_SX679_.jpg"
    // sem imageUrl: usa fallback visual
  },{
    id: "p4",
    name: "Cafeteira Arno Nescafé Dolce Gusto Genio S Basic Grafite DGS5, Multibebidas, 15 Bars, Função XL, Tanque Removível, Função Eco Mode, 110V",
    link: "https://www.amazon.com.br/dp/B0BMW95J7F/?coliid=IQBAWXH9HBKJY&colid=1WPB0V6FADKGO&th=1",
    imageUrl:"https://m.media-amazon.com/images/I/51XBl+73puL._AC_SX569_.jpg"
    // sem imageUrl: usa fallback visual
  },
];

// Chave PIX aleatória (tipo chave aleatória)
const PIX_KEY = "dc9a5e1a-844a-4ca3-8fc5-5d73228476c3";

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
    <div className="group overflow-hidden rounded-2xl ring-1 ka-border-detalhe bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01] h-80 md:h-96 flex flex-col">
      <div className="relative h-48 md:h-56 w-full bg-white">
        {present.imageUrl ? (
          <img
            src={present.imageUrl}
            alt={present.name}
            className="absolute inset-0 h-full w-full object-contain p-3"
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
      <div className="p-4 flex-1 flex flex-col">
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
        <h3
          className="mt-1.5 text-base md:text-lg font-semibold ka-text-roxo-escuro truncate"
          title={present.name}
        >
          {present.name}
        </h3>

        <div className="mt-auto pt-3 flex items-center gap-2">
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
  const [pixOpen, setPixOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Fechar modal Pix com ESC
  useEffect(() => {
    if (!pixOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPixOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pixOpen]);

  // Resetar estado de cópia ao abrir modal novamente
  useEffect(() => {
    if (pixOpen) setPixCopied(false);
  }, [pixOpen]);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setPixCopied(true);
      // Reverte mensagem depois de alguns segundos
      setTimeout(() => setPixCopied(false), 2500);
    } catch {
      // ignorar erros silenciosamente
    }
  };

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
      {/* CTA Pix destacada */}
      <div className="mt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border ka-border-detalhe bg-linear-to-br from-white via-[#F6F3FF] to-[#ECE7FF] p-6 md:p-8 shadow-lg">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#DED6FF]/40 blur-3xl" aria-hidden="true" />
            <h2 className="text-xl md:text-2xl font-bold ka-text-roxo-escuro text-center">
              Quer ajudar com Pix?
            </h2>
            <p className="mt-3 text-sm text-neutral-700 text-center max-w-prose mx-auto">
              Se preferir contribuir com qualquer valor para nosso início juntos, você pode usar a chave abaixo ou abrir o QR Code.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3">
              {/* Bloco da chave clicável */}
              <button
                type="button"
                onClick={copyPixKey}
                className="group inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-[11px] font-mono text-neutral-700 ring-1 ka-border-detalhe hover:bg-white transition shadow-sm max-w-full select-all"
                aria-label="Copiar chave Pix"
                title="Clique para copiar a chave Pix"
              >
                <span className="truncate max-w-[220px]" aria-label="Chave Pix">{PIX_KEY}</span>
                {pixCopied ? (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 shrink-0" />
                )}
              </button>
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  type="button"
                  onClick={copyPixKey}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 ka-btn-primary text-sm shadow-md hover:shadow-lg transition"
                >
                  {pixCopied ? (
                    <>
                      Chave copiada <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Copiar chave <Copy className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPixOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 ring-1 ka-border-detalhe bg-white text-sm font-medium text-neutral-700 hover:bg-white/90 shadow-sm"
                >
                  Ver QR Code
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 text-center mt-1">Obrigado por cada gesto de carinho 💜</p>
            </div>
          </div>
        </Reveal>
      </div>

      {pixOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="QR Code para Pix"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPixOpen(false);
          }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setPixOpen(false)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 ring-1 ka-border-detalhe hover:bg-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 ka-text-roxo-escuro cursor-pointer" />
            </button>
            <div className="p-5">
              <h2 className="text-lg font-semibold ka-text-roxo-escuro text-center">Ajude com um Pix 💜</h2>
              <p className="mt-2 text-center text-xs text-neutral-600 max-w-prose mx-auto">
                Se preferir contribuir com qualquer valor para o nosso início de vida a dois, você pode usar o QR Code
                ou copiar a chave aleatória abaixo. Obrigado pelo carinho!
              </p>
              <div className="mt-4 rounded-xl border ka-border-detalhe bg-linear-to-b from-white to-[#F6F3FF] p-4">
                <div className="flex items-center justify-center">
                  <img
                    src="qrcode.png"
                    alt="QR Code para Pix"
                    className="h-auto w-48 md:w-56 select-none"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <p className="mt-3 text-center text-[11px] text-neutral-500">Abra o app do banco e escolha pagar via QR Code.</p>
                {/* Chave Pix e botão de cópia */}
                <div className="mt-4 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={copyPixKey}
                    className="group inline-flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-2 text-[11px] font-mono text-neutral-700 ring-1 ka-border-detalhe hover:bg-neutral-200/70 transition max-w-full select-all"
                    title="Clique para copiar"
                    aria-label="Copiar chave Pix"
                  >
                    <span className="truncate max-w-[220px]" aria-label="Chave Pix">{PIX_KEY}</span>
                    {pixCopied ? (
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Copy className="h-4 w-4 text-neutral-500 group-hover:text-neutral-700 shrink-0" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={copyPixKey}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 ka-btn-primary text-sm cursor-pointer shadow hover:shadow-md transition"
                    aria-label="Copiar chave Pix"
                  >
                    {pixCopied ? (
                      <>
                        Chave copiada <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Copiar chave <Copy className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
