import { Bath, BedDouble, Car, LayoutGrid, Maximize, Ruler } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition, type CSSProperties } from 'react';

import { ContactForm } from '../../../../components/forms/contact-form';
import { RevealLines } from '../../../../components/motion/lines';
import { PageTransition } from '../../../../components/motion/page-transition';
import { Gallery } from '../../../../components/properties/gallery';
import { PropertyCard } from '../../../../components/properties/property-card';
import { BUSINESS } from '../../../../lib/business';
import {
  formatArea,
  formatPrice,
  getProperties,
  getProperty,
  getRelated,
  OPERATION_LABEL,
  TYPE_LABEL,
} from '../../../../lib/properties';

type Params = Promise<{ slug: string }>;

const i = (n: number) => ({ '--i': n }) as CSSProperties;
const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function generateStaticParams() {
  return getProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProperty((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} · ${p.neighborhood}`,
    description: p.tagline,
    openGraph: { images: [{ url: p.images[0].src }] },
  };
}

export default async function PropertyPage({ params }: { params: Params }) {
  const p = getProperty((await params).slug);
  if (!p) notFound();

  const related = getRelated(p);
  const cover = p.images[0];

  const specs = [
    { icon: Maximize, label: 'Sup. total', value: formatArea(p.area) },
    p.coveredArea ? { icon: Ruler, label: 'Sup. cubierta', value: formatArea(p.coveredArea) } : null,
    p.rooms ? { icon: LayoutGrid, label: 'Ambientes', value: p.rooms } : null,
    p.bedrooms ? { icon: BedDouble, label: 'Dormitorios', value: p.bedrooms } : null,
    p.bathrooms ? { icon: Bath, label: 'Baños', value: p.bathrooms } : null,
    p.garages ? { icon: Car, label: 'Cocheras', value: p.garages } : null,
  ].filter((s) => s !== null);

  const bbox = [p.lng - 0.012, p.lat - 0.007, p.lng + 0.012, p.lat + 0.007].join('%2C');

  return (
    <PageTransition>
      {/* Hero: la foto de la tarjeta se transforma en esta (shared element). */}
      <section className="relative h-[92svh] min-h-[640px] overflow-hidden bg-ink text-white">
        <ViewTransition name={`prop-${p.slug}`} share="morph" default="none">
          <div className="absolute inset-0">
            <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-14 md:px-12 md:pb-20">
          <nav aria-label="Ruta" className="hero-fade eyebrow mb-8 !text-[0.58rem] text-white/60" style={i(0)}>
            <Link href="/" className="link-line hover:text-white">
              Inicio
            </Link>
            <span className="mx-3 text-gold">/</span>
            <Link href="/propiedades" className="link-line hover:text-white">
              Propiedades
            </Link>
            <span className="mx-3 text-gold">/</span>
            <span className="text-white/85">{p.neighborhood}</span>
          </nav>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="hero-fade eyebrow flex items-center gap-4 text-gold-light" style={i(0)}>
                <span className="hero-draw inline-block h-px w-12 bg-gold" />
                {OPERATION_LABEL[p.operation]} · {TYPE_LABEL[p.type]} · {p.neighborhood}
              </p>
              <h1 className="display mt-6 text-[clamp(3rem,7.5vw,7.5rem)]">
                <span className="hero-line">
                  <span style={i(0)}>{p.title}</span>
                </span>
              </h1>
              <p className="hero-fade mt-4 max-w-xl text-base text-white/75" style={i(1)}>
                {p.tagline}
              </p>
            </div>
            <div className="hero-fade lg:text-right" style={i(2)}>
              <p className="eyebrow !text-[0.58rem] text-white/60">{p.price === null ? 'Valor' : 'Precio'}</p>
              <p className="display mt-2 text-5xl text-gold md:text-6xl">{formatPrice(p)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 px-6 sm:grid-cols-3 md:px-12 lg:grid-cols-6">
          {specs.map((s, n) => (
            <div
              key={s.label}
              className="flex items-center gap-4 border-ink/10 py-8 not-last:border-r max-lg:[&:nth-child(2n)]:border-r-0 lg:justify-center"
              data-reveal="fade"
              style={d(n * 70)}
            >
              <s.icon className="h-6 w-6 text-gold-deep" strokeWidth={1.1} aria-hidden="true" />
              <div>
                <p className="display text-3xl text-ink">{s.value}</p>
                <p className="eyebrow !text-[0.55rem] text-stone">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-20 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-[1fr_26rem]">
          <div>
            <p className="eyebrow text-gold-deep" data-reveal="fade">
              La propiedad
            </p>
            <RevealLines className="display mt-5 text-[clamp(2.4rem,4.5vw,4.2rem)] text-ink" lines={[p.tagline]} />
            <div className="mt-10 max-w-2xl space-y-6 text-[0.98rem] leading-[1.9] text-ink/75">
              {p.description.map((para, n) => (
                <p key={n} data-reveal="fade" style={d(n * 120)}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16">
              <p className="eyebrow text-gold-deep" data-reveal="fade">
                Destacados
              </p>
              <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {p.amenities.map((a, n) => (
                  <li
                    key={a}
                    className="flex items-center gap-4 border-b border-ink/10 py-4 text-sm text-ink/80"
                    data-reveal="fade"
                    style={d(n * 60)}
                  >
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {p.images.length > 1 ? (
              <div className="mt-20">
                <Gallery images={p.images} title={p.title} />
              </div>
            ) : null}

            <div className="mt-20">
              <div className="flex items-end justify-between">
                <div>
                  <p className="eyebrow text-gold-deep" data-reveal="fade">
                    Ubicación
                  </p>
                  <p className="display mt-3 text-4xl text-ink" data-reveal="fade">
                    {p.address ? `${p.address}, ` : ''}
                    {p.neighborhood}
                  </p>
                </div>
              </div>
              <div data-reveal="mask" className="relative mt-8 aspect-[16/8] overflow-hidden bg-sand">
                <iframe
                  title={`Mapa de ${p.neighborhood}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
                  className="absolute inset-0 h-full w-full grayscale-[0.9] sepia-[0.25] contrast-[0.95]"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.5s]" />
                  <span className="h-4 w-4 rotate-45 border-2 border-white bg-gold shadow-lg" />
                </span>
              </div>
              <p className="mt-3 text-xs text-stone">Ubicación aproximada. La dirección exacta se comparte al coordinar la visita.</p>
            </div>
          </div>

          {/* Consulta */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-ink p-8 text-white md:p-10" data-reveal="fade">
              <p className="eyebrow text-gold">Coordinar visita</p>
              <p className="display mt-4 text-4xl">{formatPrice(p)}</p>
              <p className="mt-2 text-xs text-white/50">
                {TYPE_LABEL[p.type]} · {formatArea(p.coveredArea ?? p.area)}
              </p>
              <div className="rule-gold my-8 opacity-50" />
              <ContactForm
                tone="dark"
                compact
                submitLabel="Solicitar información"
                defaultMessage={`Hola, me interesa ${p.title} (${p.neighborhood}). ¿Podemos coordinar una visita?`}
              />
              <a
                href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hola, me interesa ${p.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost-light mt-4 w-full justify-center"
              >
                WhatsApp directo
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Relacionadas */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-36">
          <div className="flex items-end justify-between gap-6">
            <RevealLines
              className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ink"
              lines={['También le puede', <em key="e" className="text-gold italic">interesar</em>]}
            />
            <Link href="/propiedades" className="btn btn-ghost-dark hidden md:inline-flex">
              Ver todas <span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, n) => (
              <PropertyCard key={r.slug} property={r} delay={n * 100} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
