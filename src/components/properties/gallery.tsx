'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type CSSProperties } from 'react';

import type { PropertyImage } from '../../lib/types';

/** Reparte el mosaico en 4 columnas para que la grilla siempre cierre, haya 1 o 5 fotos. */
function tileSpan(i: number, n: number): string {
  if (n === 1) return 'col-span-4 row-span-2';
  if (n === 2) return 'col-span-2 row-span-2';
  if (i === 0) return 'col-span-4 row-span-2 md:col-span-2';
  if (n === 3) return 'col-span-2 md:col-span-2';
  if (n === 4) return i === 1 ? 'col-span-4 md:col-span-2' : 'col-span-2 md:col-span-1';
  return 'col-span-2 md:col-span-1';
}

/** Mosaico de fotos con visor a pantalla completa (flechas, Esc y swipe por teclado). */
export function Gallery({ images, title }: { images: readonly PropertyImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, go]);

  const tiles = images.slice(1, 6);

  return (
    <>
      <div className="grid auto-rows-[9rem] grid-cols-4 gap-3 md:auto-rows-[15rem]">
        {tiles.map((img, i) => {
          const span = tileSpan(i, tiles.length);
          return (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setOpen(i + 1)}
              className={`group zoom-media relative overflow-hidden ${span}`}
              data-cursor="view"
              data-cursor-label="Ampliar"
              aria-label={`Ampliar foto: ${img.alt}`}
            >
              <div data-reveal="mask" className="absolute inset-0" style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? '(min-width: 768px) 60vw, 50vw' : '(min-width: 768px) 30vw, 50vw'}
                  className="object-cover"
                />
              </div>
              {i === tiles.length - 1 && count > 1 ? (
                <span className="eyebrow absolute right-4 bottom-4 bg-ink/70 px-3 py-2 !text-[0.55rem] text-white backdrop-blur">
                  {count} fotos
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Fotos de ${title}`}
        className={`fixed inset-0 z-[80] bg-ink/97 backdrop-blur-sm transition-opacity duration-700 ease-(--ease-luxe) ${
          open === null ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        onClick={() => setOpen(null)}
      >
        {images.map((img, i) => (
          <div
            key={img.src + i}
            className={`absolute inset-6 transition-[opacity,transform] duration-[900ms] ease-(--ease-luxe) md:inset-20 ${
              open === i ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'
            }`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" />
          </div>
        ))}
        <div className="absolute top-6 right-6 left-6 flex items-center justify-between text-white md:top-8 md:right-10 md:left-10">
          <p className="eyebrow text-white/70">
            <span className="text-gold">{String((open ?? 0) + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
          </p>
          <button type="button" className="eyebrow text-white/80 hover:text-white" onClick={() => setOpen(null)}>
            Cerrar ✕
          </button>
        </div>
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          className="absolute top-1/2 left-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold md:left-8"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          className="absolute top-1/2 right-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold md:right-8"
        >
          →
        </button>
        {open !== null ? (
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs tracking-wide text-white/60">
            {images[open]?.alt}
          </p>
        ) : null}
      </div>
    </>
  );
}
