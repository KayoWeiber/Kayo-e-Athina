import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  root = null,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      // Fallback: consider visible to avoid content hidden
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, root: (root as Element | null) ?? null, rootMargin }
    );

    observer.observe(node);
    return () => {
      try {
        if (node) observer.unobserve(node);
      } finally {
        observer.disconnect();
      }
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, inView } as const;
}
