'use client';

import { useEffect, useState } from 'react';

import { LogoMark } from '../brand/logo';

/**
 * Intro de marca: las tres barras crecen, aparece el nombre y una cortina negra se levanta.
 * Se muestra una vez por sesión; el script inline del layout la oculta antes de pintar si ya se vio.
 */
export function Intro() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('no-intro')) {
      root.classList.add('is-ready');
      setPhase('done');
      return;
    }
    const t1 = window.setTimeout(() => setPhase('out'), 2100);
    const t2 = window.setTimeout(() => {
      root.classList.add('is-ready');
      try {
        sessionStorage.setItem('busico-intro', '1');
      } catch {
        /* sin storage: la intro se vuelve a ver, no pasa nada */
      }
    }, 2450);
    const t3 = window.setTimeout(() => setPhase('done'), 3400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="intro fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      data-phase={phase}
      aria-hidden="true"
    >
      <div className="intro-inner flex flex-col items-center">
        <LogoMark className="h-24 w-auto" animated />
        <div className="mt-8 overflow-hidden">
          <p className="intro-word font-sans text-2xl font-extrabold tracking-[0.5em] text-white">BUSICO</p>
        </div>
        <div className="mt-3 overflow-hidden">
          <p className="intro-sub text-[0.6rem] font-medium tracking-[0.8em] text-white/60">REAL ESTATE</p>
        </div>
      </div>
      <div className="intro-line absolute bottom-0 left-0 h-px w-full" />
    </div>
  );
}
