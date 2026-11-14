'use client';

import { useEffect, useRef, useState } from 'react';

/** Número que cuenta desde 0 cuando entra en pantalla (easing exponencial). */
export function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 2200;
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(2, -10 * k);
          setValue(Math.round(to * (k === 1 ? 1 : eased)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {new Intl.NumberFormat('es-AR').format(value)}
      {suffix}
    </span>
  );
}
