import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** Cabecera oscura de las páginas internas, con foto de fondo y el título entrando por líneas. */
export function PageHero({
  eyebrow,
  lines,
  image,
  children,
}: {
  eyebrow: string;
  lines: readonly ReactNode[];
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      <div className="hero-media absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
      <div className="relative mx-auto max-w-[1600px] px-6 pt-48 pb-20 md:px-12 md:pt-56 md:pb-24">
        <p className="hero-fade eyebrow flex items-center gap-4 text-gold-light" style={i(0)}>
          <span className="hero-draw inline-block h-px w-12 bg-gold" />
          {eyebrow}
        </p>
        <h1 className="display mt-8 text-[clamp(3rem,8vw,8rem)]">
          {lines.map((l, n) => (
            <span key={n} className="hero-line">
              <span style={i(n)}>{l}</span>
            </span>
          ))}
        </h1>
        {children ? (
          <div className="hero-fade mt-10" style={i(2)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
