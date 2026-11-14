import type { Metadata } from 'next';

import { ContactForm } from '../../../components/forms/contact-form';
import { PageHero } from '../../../components/layout/page-hero';
import { PageTransition } from '../../../components/motion/page-transition';
import { IMG } from '../../../data/properties';
import { BUSINESS } from '../../../lib/business';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Hable con un asesor de Busico Real Estate. Compra, venta, alquileres, comerciales y tasaciones.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const MESSAGES: Record<string, string> = {
  tasacion: 'Hola, quisiera solicitar la tasación de mi propiedad.',
  venta: 'Hola, quisiera vender mi propiedad con Busico.',
};

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const motivo = (await searchParams).motivo;
  const message = typeof motivo === 'string' ? (MESSAGES[motivo] ?? '') : '';

  return (
    <PageTransition>
      <PageHero
        eyebrow="Contacto"
        image={IMG.livingWarm}
        lines={['Conversemos', <em key="e" className="text-gold italic">sin compromiso</em>]}
      />
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-20 px-6 py-28 md:px-12 md:py-36 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-12">
            {[
              { label: 'WhatsApp', value: BUSINESS.phone, href: BUSINESS.whatsapp },
              { label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
              { label: 'Instagram', value: BUSINESS.instagramHandle, href: BUSINESS.instagram },
              { label: 'Oficina', value: BUSINESS.address },
            ].map((c, n) => (
              <div key={c.label} data-reveal="fade" style={{ '--d': `${n * 90}ms` } as React.CSSProperties}>
                <p className="eyebrow text-gold-deep">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="display link-line mt-3 inline-block text-4xl text-ink">
                    {c.value}
                  </a>
                ) : (
                  <p className="display mt-3 text-4xl text-ink">{c.value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white p-8 shadow-[0_40px_120px_-60px_rgba(11,11,10,0.35)] md:p-14" data-reveal="fade" style={{ '--d': '150ms' } as React.CSSProperties}>
            <p className="eyebrow text-gold-deep">Escríbanos</p>
            <p className="display mt-4 mb-8 text-4xl text-ink">¿En qué podemos ayudarle?</p>
            <ContactForm defaultMessage={message} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
