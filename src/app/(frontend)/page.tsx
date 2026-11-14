import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { LogoMark } from '../../components/brand/logo';
import { CountUp } from '../../components/home/count-up';
import { HomeHero } from '../../components/home/home-hero';
import { Manifesto } from '../../components/home/manifesto';
import { ServicesList } from '../../components/home/services-list';
import { RevealLines } from '../../components/motion/lines';
import { PageTransition } from '../../components/motion/page-transition';
import { PropertyCard } from '../../components/properties/property-card';
import { IMG } from '../../data/properties';
import { formatArea, getFeaturedProperties, getProperty } from '../../lib/properties';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const ZONES = ['Puerto Madero', 'Recoleta', 'Palermo Chico', 'Nordelta', 'San Isidro', 'Belgrano R', 'Pilar', 'Los Cardales'];

export default function HomePage() {
  const featured = getFeaturedProperties();
  const jujuy = getProperty('local-av-jujuy-400');
  const caseros = getProperty('local-av-caseros-4000');

  return (
    <PageTransition>
      <HomeHero />

      {/* Manifiesto */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-32 md:px-12 md:py-44 lg:grid-cols-[14rem_1fr]">
          <div data-reveal="fade">
            <p className="eyebrow text-gold-deep">Nuestra mirada</p>
            <div data-reveal="draw" className="mt-6 h-px w-16 bg-gold" style={d(200)} />
          </div>
          <div>
            <Manifesto />
            <div className="mt-14 flex flex-wrap gap-4" data-reveal="fade" style={d(150)}>
              <Link href="/nosotros" className="btn btn-ghost-dark">
                Conocé Busico <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Colección destacada */}
      <section className="bg-paper pb-32 md:pb-44">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold-deep" data-reveal="fade">
                Colección privada
              </p>
              <RevealLines
                className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-ink"
                lines={[
                  'Propiedades',
                  <>
                    <em className="text-gold italic">seleccionadas</em>
                  </>,
                ]}
              />
            </div>
            <Link href="/propiedades" className="btn btn-ghost-dark self-start md:self-auto" data-reveal="fade">
              Ver todas <span className="btn-arrow">→</span>
            </Link>
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-12">
            {featured[0] ? (
              <div className="md:col-span-7">
                <PropertyCard property={featured[0]} aspect="aspect-[5/4]" sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
            ) : null}
            {featured[1] ? (
              <div className="md:col-span-5 md:mt-40">
                <PropertyCard property={featured[1]} delay={120} sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            ) : null}
            {featured[2] ? (
              <div className="md:col-span-5 md:-mt-16">
                <PropertyCard property={featured[2]} sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            ) : null}
            {featured[3] ? (
              <div className="md:col-span-6 md:col-start-7 md:mt-24">
                <PropertyCard
                  property={featured[3]}
                  aspect="aspect-[4/3]"
                  delay={120}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Banda de cifras con parallax */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={IMG.livingTerrace}
            alt=""
            fill
            sizes="100vw"
            className="parallax-img object-cover opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
        <div className="relative mx-auto max-w-[1600px] px-6 py-36 md:px-12 md:py-52">
          <RevealLines
            className="display mx-auto max-w-4xl text-center text-[clamp(2.4rem,5vw,5rem)]"
            lines={['Discreción, criterio', <em key="e" className="text-gold italic">y resultados</em>]}
          />
          <div className="mt-24 grid grid-cols-2 gap-y-14 border-t border-white/15 pt-14 lg:grid-cols-4">
            {[
              { to: 15, prefix: '+', label: 'Años de trayectoria' },
              { to: 120, prefix: 'USD ', suffix: 'M', label: 'En operaciones cerradas' },
              { to: 340, prefix: '+', label: 'Propiedades comercializadas' },
              { to: 98, suffix: '%', label: 'Clientes que nos recomiendan' },
            ].map((s, i) => (
              <div key={s.label} className="px-4 text-center" data-reveal="fade" style={d(i * 120)}>
                <p className="display text-[clamp(2.6rem,4.5vw,4.5rem)] text-gold">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="eyebrow mt-4 !text-[0.6rem] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-ink-2 text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow text-gold" data-reveal="fade">
                Servicios
              </p>
              <RevealLines
                className="display mt-5 text-[clamp(2.8rem,6vw,6rem)]"
                lines={['Un servicio', <em key="e" className="text-gold italic">a su medida</em>]}
              />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60 lg:justify-self-end" data-reveal="fade" style={d(150)}>
              Acompañamos cada operación de principio a fin con un equipo reducido, dedicado y con conocimiento
              profundo del mercado premium de Buenos Aires.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Espacios comerciales (los dos locales que hoy publican en Instagram) */}
      {jujuy && caseros ? (
        <section className="bg-bone">
          <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
                <p className="eyebrow text-gold-deep" data-reveal="fade">
                  Espacios comerciales
                </p>
                <RevealLines
                  className="display mt-5 text-[clamp(2.6rem,5vw,5rem)] text-ink"
                  lines={['Lugares donde', 'las marcas', <em key="e" className="text-gold italic">crecen</em>]}
                />
                <p className="mt-8 max-w-md text-sm leading-relaxed text-stone" data-reveal="fade" style={d(150)}>
                  Locales en avenidas de alto tránsito, con frentes amplios y plantas flexibles. Ideales para
                  gimnasios, retail, gastronomía, supermercados y estudios.
                </p>
                <Link
                  href="/propiedades?operacion=alquiler&tipo=local"
                  className="btn btn-ghost-dark mt-10"
                  data-reveal="fade"
                  style={d(250)}
                >
                  Ver comerciales <span className="btn-arrow">→</span>
                </Link>
              </div>

              <div className="space-y-24 lg:col-span-7">
                {[jujuy, caseros].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/propiedades/${p.slug}`}
                    className="group block"
                    data-cursor="view"
                  >
                    <div data-reveal="mask" className="zoom-media relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-8 text-white">
                        <div>
                          <p className="eyebrow text-gold-light">{p.neighborhood}</p>
                          <p className="display mt-2 text-4xl md:text-5xl">{p.address}</p>
                        </div>
                        <p className="display text-5xl text-gold md:text-6xl">{formatArea(p.area)}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="border border-ink/15 px-4 py-2 text-[0.7rem] tracking-wider text-ink/70">
                          {a}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Zonas */}
      <section className="overflow-hidden border-y border-ink/10 bg-paper py-10" aria-label="Zonas donde trabajamos">
        <div className="flex w-max animate-marquee">
          {[...ZONES, ...ZONES].map((z, i) => (
            <span key={i} className="display flex items-center gap-12 pr-12 text-5xl text-ink/85 md:text-7xl">
              {i % 2 ? <em className="italic">{z}</em> : z}
              <LogoMark className="h-8 w-auto opacity-80 md:h-10" />
            </span>
          ))}
        </div>
      </section>

      {/* Testimonio */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-32 text-center md:py-44">
          <p className="display text-8xl leading-none text-gold" aria-hidden="true">
            “
          </p>
          <RevealLines
            as="blockquote"
            className="display -mt-6 text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.15] text-ink"
            lines={[
              'Encontraron la casa que buscábamos',
              'antes de que saliera al mercado.',
              <em key="e" className="text-gold italic">Un trato impecable de principio a fin.</em>,
            ]}
          />
          <p className="eyebrow mt-12 text-stone" data-reveal="fade" style={d(300)}>
            Familia M. · Nordelta
          </p>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image src={IMG.nightBox} alt="" fill sizes="100vw" className="parallax-img object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-36 md:px-12 md:py-48 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-gold" data-reveal="fade">
              Vender con Busico
            </p>
            <RevealLines
              className="display mt-5 text-[clamp(2.8rem,6vw,6rem)]"
              lines={['¿Cuánto vale', <em key="e" className="text-gold italic">su propiedad?</em>]}
            />
          </div>
          <div className="lg:justify-self-end" data-reveal="fade" style={d(200)}>
            <p className="max-w-md text-sm leading-relaxed text-white/65">
              Solicite una tasación profesional y confidencial. Un asesor visitará su propiedad y le entregará un
              informe fundamentado en menos de 72 horas.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contacto?motivo=tasacion" className="btn btn-gold">
                Solicitar tasación <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contacto" className="btn btn-ghost-light">
                Hablar con un asesor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
