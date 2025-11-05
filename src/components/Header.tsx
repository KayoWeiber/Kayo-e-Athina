import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b ka-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between pl-4 pr-2 py-2 md:pl-6 md:pr-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <div
            className="flex items-center gap-2 rounded-md px-5 py-1.5 ka-logo-badge"
            aria-label="Kayo & Áthina"
            title="Kayo & Áthina"
          >
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

        {/* Navegação desktop */}
        <nav className="hidden gap-5 md:flex" aria-label="Seções principais">
          <Link to="/" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Início
          </Link>
          <Link to="/nossa-historia" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Nossa História
          </Link>
          <Link to="/galeria" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Galeria
          </Link>
        </nav>

        {/* CTA */}

      </div>

      {/* Navegação mobile */}
      <div className="md:hidden border-t ka-border-detalhe">
        <nav className="mx-auto flex max-w-6xl items-center justify-around px-3 py-2">
          <Link to="/" className="font-body rounded px-2 py-1 text-sm font-medium ka-text-roxo-escuro">Início</Link>
          <Link to="/nossa-historia" className="font-body rounded px-2 py-1 text-sm font-medium ka-text-roxo-escuro">Nossa História</Link>
          <Link to="/galeria" className="font-body rounded px-2 py-1 text-sm font-medium ka-text-roxo-escuro">Galeria</Link>
        </nav>
      </div>
    </header>
  );
}
