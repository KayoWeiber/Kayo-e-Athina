import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolla para o topo a cada mudança de rota
    // Usa scrollTo sem animação para evitar flashes inesperados
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}
