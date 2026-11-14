import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, type CSSProperties } from 'react';

import { formatArea, formatPrice, OPERATION_LABEL, TYPE_LABEL } from '../../lib/properties';
import type { Property } from '../../lib/types';

export function PropertyCard({
  property: p,
  tone = 'light',
  aspect = 'aspect-[4/5]',
  delay = 0,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}: {
  property: Property;
  tone?: 'light' | 'dark';
  aspect?: string;
  delay?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const cover = p.images[0];
  const dark = tone === 'dark';
  const specs = [
    formatArea(p.coveredArea ?? p.area),
    p.bedrooms ? `${p.bedrooms} dorm.` : null,
    p.bathrooms ? `${p.bathrooms} baños` : null,
  ].filter(Boolean);

  return (
    <Link
      href={`/propiedades/${p.slug}`}
      className="group block"
      data-cursor="view"
      data-cursor-label="Ver"
      data-reveal="fade"
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      <div className={`relative overflow-hidden ${aspect}`}>
        <ViewTransition name={`prop-${p.slug}`} share="morph" default="none">
          <div className="zoom-media absolute inset-0">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </div>
        </ViewTransition>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/20 opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="eyebrow bg-white/90 px-3 py-2 !text-[0.55rem] text-ink backdrop-blur">
            {OPERATION_LABEL[p.operation]}
          </span>
          {p.badge ? (
            <span className="eyebrow bg-ink/70 px-3 py-2 !text-[0.55rem] text-gold-light backdrop-blur">{p.badge}</span>
          ) : null}
        </div>
        <p className="absolute right-5 bottom-5 left-5 translate-y-3 text-sm text-white opacity-0 transition-all duration-700 ease-(--ease-luxe) group-hover:translate-y-0 group-hover:opacity-100">
          {p.tagline}
        </p>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between gap-4">
          <p className={`eyebrow ${dark ? 'text-gold' : 'text-gold-deep'}`}>
            {p.neighborhood} · {TYPE_LABEL[p.type]}
          </p>
        </div>
        <h3 className={`display mt-3 text-[2rem] ${dark ? 'text-white' : 'text-ink'}`}>{p.title}</h3>
        <div className="relative mt-5 h-px w-full bg-current opacity-15">
          <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-x-100" />
        </div>
        <div className={`mt-4 flex items-center justify-between text-[0.8rem] ${dark ? 'text-white/60' : 'text-stone'}`}>
          <span>{specs.join('  ·  ')}</span>
          <span className={`font-semibold tracking-wide ${dark ? 'text-white' : 'text-ink'}`}>{formatPrice(p)}</span>
        </div>
      </div>
    </Link>
  );
}
