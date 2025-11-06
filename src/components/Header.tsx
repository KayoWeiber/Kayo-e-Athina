import { Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const lastYRef = useRef(0);

  // Fechar ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Fechar com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fechar ao clicar fora do menu (apenas quando aberto)
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      const menuEl = menuRef.current;
      const btnEl = buttonRef.current;
      if (!target) return;
      const clickedInsideMenu = !!menuEl && menuEl.contains(target);
      const clickedOnButton = !!btnEl && btnEl.contains(target);
      if (!clickedInsideMenu && !clickedOnButton) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  // Fechar ao rolar a página
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Ocultar header ao descer e mostrar ao subir
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      // Sempre visível no topo
      if (y <= 2) {
        setHidden(false);
        lastYRef.current = y;
        return;
      }

      const last = lastYRef.current;
      const goingDown = y > last;
      const delta = Math.abs(y - last);
      lastYRef.current = y;

      if (open) {
        // Não esconder quando menu aberto
        setHidden(false);
        return;
      }

      // Suaviza sensibilidade com um limiar pequeno
      if (goingDown && y > 64 && delta > 2) {
        setHidden(true);
      } else if (!goingDown && delta > 2) {
        setHidden(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b ka-header transition-transform duration-300 ease-out",
      hidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="mx-auto flex max-w-6xl items-center justify-between pl-4 pr-2 py-2 md:pl-6 md:pr-2">
        {/* Logo */}
        <Link to="//" className="flex items-center gap-2 select-none">
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
          <Link to="//" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Início
          </Link>
          <Link to="/nossa-historia" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Nossa História
          </Link>
          <Link to="/galeria" className="font-body text-sm md:text-base font-medium transition-colors hover:opacity-90 ka-text-roxo-escuro">
            Galeria
          </Link>
        </nav>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ka-border-detalhe bg-white/70 hover:bg-white transition"
          aria-controls="ka-mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          ref={buttonRef}
        >
          {open ? (
            <X className="h-5 w-5 ka-text-roxo-escuro" aria-hidden />
          ) : (
            <Menu className="h-5 w-5 ka-text-roxo-escuro" aria-hidden />
          )}
        </button>

      </div>
      {/* Navegação mobile (dropdown) */}
      <div
        id="ka-mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        className={cn(
          "md:hidden border-t ka-border-detalhe ka-bg-gelo overflow-hidden transition-all duration-300 ease-out transform-gpu",
          open ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
        )}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 md:px-6" aria-label="Seções principais (mobile)">
          <ul className="flex flex-col">
            <li className="border-t ka-border-detalhe first:border-t-0">
              <Link to="//" className="block py-2.5 font-body text-base font-medium ka-text-roxo-escuro">Início</Link>
            </li>
            <li className="border-t ka-border-detalhe first:border-t-0">
              <Link to="/nossa-historia" className="block py-2.5 font-body text-base font-medium ka-text-roxo-escuro">Nossa História</Link>
            </li>
            <li className="border-t ka-border-detalhe first:border-t-0">
              <Link to="/galeria" className="block py-2.5 font-body text-base font-medium ka-text-roxo-escuro">Galeria</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
