import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { PageHero } from '../../../components/layout/page-hero';
import { RevealLines } from '../../../components/motion/lines';
import { PageTransition } from '../../../components/motion/page-transition';
import { IMG } from '../../../data/properties';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Una inmobiliaria boutique con foco en propiedades de categoría y espacios comerciales.',
};

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const VALUES = [
  {
    title: 'Discreción',
    text: 'Muchas de nuestras operaciones se cierran sin publicarse. Cuidamos la privacidad de cada cliente como propia.',
  },
  {
    title: 'Criterio',
    text: 'No sumamos propiedades por volumen. Cada inmueble del portfolio pasa por una selección exigente.',
  },
  {
    title: 'Cercanía',
    text: 'Un único asesor lo acompaña de principio a fin: una sola voz, disponible y con respuestas claras.',
  },
] as const;

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Nosotros"
        image={IMG.livingStair}
        lines={['Una inmobiliaria', <em key="e" className="text-gold italic">boutique</em>]}
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-32 md:px-12 md:py-44 lg:grid-cols-2 lg:items-center">
          <div data-reveal="mask" className="relative aspect-[4/5] overflow-hidden">
            <Image src={IMG.dining} alt="Interior de una residencia" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:pl-12">
            <p className="eyebrow text-gold-deep" data-reveal="fade">
              Nuestra historia
            </p>
            <RevealLines
              className="display mt-5 text-[clamp(2.6rem,5vw,4.8rem)] text-ink"
              lines={['Tu estilo,', 'tu esencia,', <em key="e" className="text-gold italic">tu lugar.</em>]}
            />
            <div className="mt-10 max-w-lg space-y-6 text-[0.98rem] leading-[1.9] text-ink/75">
              <p data-reveal="fade">
                Busico Real Estate nace con una idea simple: tratar cada propiedad como una pieza única y a cada
                cliente con la atención que merece. Trabajamos con un portfolio acotado de residencias, pisos y
                locales comerciales en las zonas más buscadas de Buenos Aires.
              </p>
              <p data-reveal="fade" style={d(120)}>
                Combinamos conocimiento profundo del mercado, producción visual de primer nivel y una red de
                contactos que nos permite acceder a oportunidades que nunca llegan a los portales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grain relative bg-ink text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
          <p className="eyebrow text-gold" data-reveal="fade">
            Lo que nos define
          </p>
          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {VALUES.map((v, n) => (
              <div key={v.title} className="group bg-ink p-10 md:p-14" data-reveal="fade" style={d(n * 120)}>
                <p className="eyebrow text-gold">0{n + 1}</p>
                <p className="display mt-10 text-5xl transition-colors duration-700 group-hover:text-gold-light">{v.title}</p>
                <div className="mt-6 h-px w-10 bg-gold transition-all duration-1000 ease-(--ease-luxe) group-hover:w-24" />
                <p className="mt-6 text-sm leading-relaxed text-white/60">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center" data-reveal="fade">
            <Link href="/contacto" className="btn btn-gold">
              Hablemos <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
