import { Heart, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t ka-border-detalhe bg-background/50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
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
