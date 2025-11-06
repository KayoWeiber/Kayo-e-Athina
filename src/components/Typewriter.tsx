import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/utils";

type TypewriterProps = {
  text: string;
  speed?: number; // ms per character
  startDelay?: number; // ms before start
  cursor?: boolean;
  className?: string;
  loop?: boolean;
  delayAfterEndMs?: number; // wait after finishing typing before showing underline
  underlineHoldMs?: number; // how long the underline stays before restarting
  underline?: boolean; // show the underline between loops
  onPhaseChange?: (phase: "typing" | "holdText" | "underline" | "restart") => void;
};

export default function Typewriter({
  text,
  speed = 40,
  startDelay = 300,
  cursor = true,
  className,
  loop = false,
  delayAfterEndMs = 5000,
  underlineHoldMs = 3000,
  underline = true,
  onPhaseChange,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const postDelayRef = useRef<number | null>(null);
  const underlineHoldRef = useRef<number | null>(null);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const phaseCbRef = useRef(onPhaseChange);
  useEffect(() => { phaseCbRef.current = onPhaseChange; }, [onPhaseChange]);
  const emit = (phase: "typing" | "holdText" | "underline" | "restart") => {
    if (phaseCbRef.current) phaseCbRef.current(phase);
  };

  const cleanupAll = () => {
    if (startTimeoutRef.current) window.clearTimeout(startTimeoutRef.current);
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (postDelayRef.current) window.clearTimeout(postDelayRef.current);
    if (underlineHoldRef.current) window.clearTimeout(underlineHoldRef.current);
    startTimeoutRef.current = null;
    timerRef.current = null;
    postDelayRef.current = null;
    underlineHoldRef.current = null;
  };

  const startTyping = () => {
    setDisplayed("");
    setDone(false);
    setShowUnderline(false);
    if (!text) return;
    if (reduceMotion) {
      setDisplayed(text);
      setDone(true);
      emit("holdText");
      return;
    }
    emit("typing");
    const start = window.setTimeout(() => {
      let idx = 0;
      const tick = () => {
        idx += 1;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          setDone(true);
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          emit("holdText");
        }
      };
      timerRef.current = window.setInterval(tick, speed) as unknown as number;
    }, startDelay) as unknown as number;
    startTimeoutRef.current = start;
  };

  useEffect(() => {
    cleanupAll();
    startTyping();
    return cleanupAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduceMotion]);

  // Loop sequence after finishing typing
  useEffect(() => {
    if (!done || !loop || reduceMotion) return;
    // Wait after end, then optionally show underline, then restart typing
    postDelayRef.current = window.setTimeout(() => {
      if (underline) {
        setShowUnderline(true);
        emit("underline");
        underlineHoldRef.current = window.setTimeout(() => {
          setShowUnderline(false);
          emit("restart");
          startTyping();
        }, underlineHoldMs) as unknown as number;
      } else {
        emit("restart");
        startTyping();
      }
    }, delayAfterEndMs) as unknown as number;

    return () => {
      if (postDelayRef.current) window.clearTimeout(postDelayRef.current);
      if (underlineHoldRef.current) window.clearTimeout(underlineHoldRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, loop, delayAfterEndMs, underlineHoldMs, reduceMotion, underline]);

  return (
    <span className={cn("inline-block", className)} aria-live="polite">
      {displayed}
      {cursor && !reduceMotion && !done && <span className="ka-caret" aria-hidden>{"\u00A0"}</span>}
      {!reduceMotion && underline && showUnderline && <span className="ka-underline-grow" aria-hidden></span>}
    </span>
  );
}
