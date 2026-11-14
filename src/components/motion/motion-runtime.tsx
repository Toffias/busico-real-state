'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Todo el movimiento global del sitio en un solo lugar:
 * - Scroll suave con inercia (Lenis).
 * - Reveal de los elementos `[data-reveal]` al entrar en pantalla (también los que aparecen después).
 * - Cursor dorado que se agranda sobre las fotos (`[data-cursor="view"]`) y los links.
 */
export function MotionRuntime() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll suave.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de página, arriba de todo sin animación.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  // Reveals.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const scan = (root: ParentNode) =>
      root.querySelectorAll('[data-reveal]:not(.is-inview)').forEach((el) => io.observe(el));
    scan(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && scan(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return <Cursor />;
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add('has-cursor');

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      const view = target?.closest('[data-cursor="view"]');
      const link = target?.closest('a, button, select, input, textarea, label');
      el.dataset.state = view ? 'view' : link ? 'link' : '';
      const label = el.querySelector('.cursor-label');
      if (label && view) label.textContent = view.getAttribute('data-cursor-label') ?? 'Ver';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };
    const onEnter = () => {
      el.style.opacity = '1';
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={ref} className="cursor-dot hidden [@media(pointer:fine)]:block" aria-hidden="true">
      <span className="cursor-label">Ver</span>
    </div>
  );
}
