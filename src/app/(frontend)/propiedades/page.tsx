import type { Metadata } from 'next';

import { PageHero } from '../../../components/layout/page-hero';
import { PageTransition } from '../../../components/motion/page-transition';
import { Listing, type ListingFilters } from '../../../components/properties/listing';
import { IMG } from '../../../data/properties';
import { getProperties } from '../../../lib/properties';

export const metadata: Metadata = {
  title: 'Propiedades',
  description: 'Casas, penthouses, departamentos y locales comerciales seleccionados en Buenos Aires.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const op = one(sp.operacion);
  const tipo = one(sp.tipo);
  const orden = one(sp.orden);

  const initial: ListingFilters = {
    operacion: op === 'venta' || op === 'alquiler' ? op : '',
    tipo: ['casa', 'departamento', 'penthouse', 'local', 'oficina'].includes(tipo)
      ? (tipo as ListingFilters['tipo'])
      : '',
    zona: one(sp.zona),
    orden: ['precio-asc', 'precio-desc', 'superficie'].includes(orden)
      ? (orden as ListingFilters['orden'])
      : 'destacadas',
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="Portfolio"
        image={IMG.villaPool}
        lines={['Nuestras', <em key="e" className="text-gold italic">propiedades</em>]}
      >
        <p className="max-w-lg text-sm leading-relaxed text-white/65">
          Una selección curada de residencias, pisos y espacios comerciales. Algunas propiedades se ofrecen de
          forma reservada: consúltenos por oportunidades off market.
        </p>
      </PageHero>
      <div className="bg-paper">
        <Listing properties={getProperties()} initial={initial} />
      </div>
    </PageTransition>
  );
}
