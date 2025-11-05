import { Heart, Mail, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t ka-border-detalhe bg-background/50 safe-pb">
      <div className="ka-container py-8 md:py-10">
        {/* Logo + mensagem */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2 select-none" aria-label="Kayo & Áthina">
            <div className="flex items-center gap-2 rounded-md px-5 py-1.5 ka-logo-badge" title="Kayo & Áthina">
              <span className="font-title text-2xl md:text-3xl font-extrabold tracking-tight ka-text-roxo-escuro">K&A</span>
              <Heart
                aria-hidden
                size={26}
                strokeWidth={2.5}
                className="-mt-0.5"
                color="var(--ka-lilas-medio)"
                fill="color-mix(in oklab, var(--ka-lilas-medio) 20%, transparent)"
              />
            </div>
          </Link>

          <p className="text-center font-body text-sm md:text-base ka-text-roxo-escuro max-w-xl">
            Celebrando o amor e criando memórias que durarão para sempre.
          </p>
        </div>

        {/* Contato */}
        <div className="mt-8 grid gap-3 text-sm md:mt-10">
          <h2 className="font-title text-lg ka-text-roxo-escuro">Contato</h2>
          <p className="font-body ka-text-roxo-escuro">Para dúvidas ou informações:</p>
          <address className="not-italic font-body space-y-1">
            <a
              href="mailto:caioveiber598@gmail.com"
              className="inline-flex items-center gap-2 ka-text-roxo-escuro hover:opacity-90"
            >
              <Mail size={18} aria-hidden />
              <span>caioveiber598@gmail.com</span>
            </a>
            <div>
              <a
                href="tel:+5534998253973"
                className="inline-flex items-center gap-2 ka-text-roxo-escuro hover:opacity-90"
              >
                <Phone size={18} aria-hidden />
                <span>(34) 99825-3973</span>
              </a>
            </div>
          </address>
        </div>

        {/* Acompanhe os preparativos */}
        <div className="mt-8 grid gap-3 text-sm md:mt-8">
          <h2 className="font-title text-lg ka-text-roxo-escuro">Acompanhe os preparativos</h2>
          <p className="font-body text-neutral-700">Siga nossos perfis e acompanhe cada etapa rumo ao grande dia.</p>
          <div className="flex flex-wrap items-center gap-3">
            {/* Destaque: Noiva */}
            <a
              href="https://www.instagram.com/athina_carmo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ka-border-detalhe ka-logo-badge hover:opacity-90"
              aria-label="Instagram da noiva: @athina_carmo"
            >
              <Instagram size={16} aria-hidden />
              <span className="font-medium ka-text-roxo-escuro">@athina_carmo</span>
              <span className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ka-text-roxo-escuro bg-white/60 ring-1 ka-border-detalhe">Noiva</span>
            </a>
            {/* Noivo */}
            <a
              href="https://www.instagram.com/kayo_weiber/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ka-border-detalhe bg-white/70 hover:bg-white transition"
              aria-label="Instagram do noivo: @kayo_weiber"
            >
              <Instagram size={16} aria-hidden />
              <span className="font-medium ka-text-roxo-escuro">@kayo_weiber</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t ka-border-detalhe pt-6">
          <p className="text-center font-body text-xs md:text-sm ka-text-roxo-escuro">
            © 2025 Kayo & Áthina. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
