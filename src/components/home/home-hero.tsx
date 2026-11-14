import Image from 'next/image';
import type { CSSProperties } from 'react';

import { IMG } from '../../data/properties';
import { HeroSearch } from './hero-search';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

export function HomeHero() {
  return (
    <section className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <div className="hero-media absolute inset-0">
        <Image
          src={IMG.houseDusk}
          alt="Residencia contemporánea al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pt-40 pb-16 md:px-12 md:pb-20">
        <p className="hero-fade eyebrow flex items-center gap-4 text-gold-light" style={i(0)}>
          <span className="hero-draw inline-block h-px w-12 bg-gold" />
          Buenos Aires · Real Estate
        </p>

        <h1 className="display mt-8 text-[clamp(3.2rem,9vw,9.5rem)] text-white">
          <span className="hero-line">
            <span style={i(0)}>El arte de habitar</span>
          </span>
          <span className="hero-line">
            <span style={i(1)}>
              lo <em className="text-gold text-gold-shimmer italic">extraordinario</em>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="hero-fade" style={i(1)}>
            <HeroSearch />
          </div>
          <p className="hero-fade hidden max-w-xs text-sm leading-relaxed text-white/70 md:block lg:text-right" style={i(2)}>
            Residencias de autor, pisos con vista abierta y espacios comerciales seleccionados con un criterio
            exigente.
          </p>
        </div>
      </div>

      <div className="hero-fade absolute right-8 bottom-10 hidden flex-col items-center gap-4 xl:flex" style={i(3)}>
        <span className="eyebrow [writing-mode:vertical-rl] !text-[0.55rem] text-white/60">Descubrir</span>
        <span className="relative block h-16 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 bg-gold [animation:scroll-cue_2.4s_var(--ease-luxe)_infinite]" />
        </span>
      </div>
    </section>
  );
}
