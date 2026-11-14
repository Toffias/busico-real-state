'use client';

import { usePathname, useRouter } from 'next/navigation';
import { startTransition, useMemo, useState, ViewTransition } from 'react';

import { OPERATION_LABEL, TYPE_LABEL } from '../../lib/properties';
import type { Operation, Property, PropertyType } from '../../lib/types';
import { PropertyCard } from './property-card';

export interface ListingFilters {
  operacion: Operation | '';
  tipo: PropertyType | '';
  zona: string;
  orden: 'destacadas' | 'precio-asc' | 'precio-desc' | 'superficie';
}

const SORTS: { value: ListingFilters['orden']; label: string }[] = [
  { value: 'destacadas', label: 'Destacadas' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'superficie', label: 'Mayor superficie' },
];

/**
 * Listado con filtros instantáneos. Cada cambio se aplica dentro de una transición de React,
 * así las tarjetas se reacomodan con una animación (View Transitions) y la URL queda compartible.
 */
export function Listing({ properties, initial }: { properties: readonly Property[]; initial: ListingFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [f, setF] = useState<ListingFilters>(initial);

  const zones = useMemo(
    () => Array.from(new Set(properties.map((p) => p.neighborhood))).sort((a, b) => a.localeCompare(b)),
    [properties],
  );

  const result = useMemo(() => {
    const list = properties.filter(
      (p) =>
        (!f.operacion || p.operation === f.operacion) &&
        (!f.tipo || p.type === f.tipo) &&
        (!f.zona || p.neighborhood.toLowerCase().includes(f.zona.toLowerCase())),
    );
    const price = (p: Property) => p.price ?? -1;
    switch (f.orden) {
      case 'precio-asc':
        return [...list].sort((a, b) => price(a) - price(b));
      case 'precio-desc':
        return [...list].sort((a, b) => price(b) - price(a));
      case 'superficie':
        return [...list].sort((a, b) => (b.coveredArea ?? b.area) - (a.coveredArea ?? a.area));
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [properties, f]);

  const update = (patch: Partial<ListingFilters>) => {
    const next = { ...f, ...patch };
    startTransition(() => setF(next));
    const q = new URLSearchParams();
    if (next.operacion) q.set('operacion', next.operacion);
    if (next.tipo) q.set('tipo', next.tipo);
    if (next.zona) q.set('zona', next.zona);
    if (next.orden !== 'destacadas') q.set('orden', next.orden);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-4 px-6 py-5 md:px-12">
          <div className="flex gap-1" role="group" aria-label="Operación">
            {(['', 'venta', 'alquiler'] as const).map((op) => (
              <button
                key={op || 'todas'}
                type="button"
                aria-pressed={f.operacion === op}
                onClick={() => update({ operacion: op })}
                className={`eyebrow relative px-3 py-2 transition-colors duration-500 ${f.operacion === op ? 'text-ink' : 'text-stone hover:text-ink'}`}
              >
                {op ? OPERATION_LABEL[op] : 'Todas'}
                <span
                  className={`absolute right-3 bottom-0 left-3 h-px bg-gold transition-transform duration-700 ease-(--ease-luxe) ${f.operacion === op ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            ))}
          </div>

          <span className="hidden h-6 w-px bg-ink/15 md:block" />

          <Select
            label="Tipo"
            value={f.tipo}
            onChange={(v) => update({ tipo: v as ListingFilters['tipo'] })}
            options={[{ value: '', label: 'Todos' }, ...Object.entries(TYPE_LABEL).map(([value, label]) => ({ value, label }))]}
          />
          <Select
            label="Zona"
            value={f.zona}
            onChange={(v) => update({ zona: v })}
            options={[{ value: '', label: 'Todas' }, ...zones.map((z) => ({ value: z, label: z }))]}
          />

          <div className="ml-auto flex items-center gap-6">
            <Select
              label="Orden"
              value={f.orden}
              onChange={(v) => update({ orden: v as ListingFilters['orden'] })}
              options={SORTS}
            />
            <p className="eyebrow text-stone" aria-live="polite">
              {result.length} {result.length === 1 ? 'propiedad' : 'propiedades'}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        {result.length ? (
          <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {result.map((p, i) => (
              <ViewTransition key={p.slug} default="none" enter="card-in" exit="card-out" update="card-move">
                <div className={i % 3 === 1 ? 'lg:mt-16' : ''}>
                  <PropertyCard property={p} delay={(i % 3) * 100} priority={i < 3} />
                </div>
              </ViewTransition>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="display text-5xl text-ink">Sin resultados por ahora</p>
            <p className="mt-4 text-sm text-stone">
              Muchas de nuestras propiedades se ofrecen de forma reservada. Escribanos y le contamos qué tenemos.
            </p>
            <button
              type="button"
              className="btn btn-ghost-dark mt-10"
              onClick={() => update({ operacion: '', tipo: '', zona: '' })}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="eyebrow !text-[0.58rem] text-gold-deep">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent pr-6 text-sm text-ink outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-[0.6rem] text-stone">▼</span>
      </span>
    </label>
  );
}
