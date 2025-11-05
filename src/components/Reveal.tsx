import { type CSSProperties, type ElementType, type PropsWithChildren } from "react";
import { cn } from "../lib/utils";
import { useInView } from "../lib/useInView";

type RevealProps = PropsWithChildren<{
  as?: ElementType;
  className?: string;
  delay?: number; // ms
  once?: boolean;
}>;

export default function Reveal({
  as: Comp = "div",
  className,
  delay = 0,
  once = true,
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once, threshold: 0.15 });

  const style = { transitionDelay: `${delay}ms` } as CSSProperties;
  const base = `will-change-[opacity,transform] opacity-0 translate-y-4 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`;
  const visible = inView ? "opacity-100 translate-y-0" : "";

  return (
    <Comp ref={ref} className={cn(base, visible, className)} style={style}>
      {children}
    </Comp>
  );
}
