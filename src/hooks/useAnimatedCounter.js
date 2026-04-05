import { useState, useEffect, useRef } from "react";

/** Animates a number from 0 to target over a given duration (ms). */
export function useAnimatedCounter(target, duration = 800) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  const frame = useRef(null);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setValue(current);

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        prev.current = target;
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}
