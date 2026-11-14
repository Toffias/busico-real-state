'use client';

import { useEffect, useRef } from 'react';

const TEXT =
  'Creemos que una propiedad no es solo un lugar. Es la escena donde transcurre una vida. Por eso seleccionamos cada inmueble con la misma exigencia con la que nuestros clientes eligen dónde vivir, invertir o hacer crecer su negocio.';

/** Párrafo manifiesto: las palabras se van encendiendo a medida que se hace scroll. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-w]'));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = progress * words.length;
      words.forEach((w, i) => {
        const o = Math.min(1, Math.max(0, lit - i));
        w.style.opacity = String(0.14 + o * 0.86);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = TEXT.split(' ');
  const gold = new Set(['escena', 'vida.', 'exigencia']);

  return (
    <p ref={ref} className="display text-[clamp(2rem,4.2vw,4.4rem)] leading-[1.12] text-ink">
      {words.map((w, i) => (
        <span key={i} data-w className="transition-opacity duration-300" style={{ opacity: 0.14 }}>
          {gold.has(w) ? <em className="text-gold italic">{w}</em> : w}{' '}
        </span>
      ))}
    </p>
  );
}
