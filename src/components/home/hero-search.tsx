'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OPS = [
  { value: 'venta', label: 'Comprar' },
  { value: 'alquiler', label: 'Alquilar' },
] as const;

const TYPES = [
  { value: '', label: 'Todas las propiedades' },
  { value: 'casa', label: 'Casas' },
  { value: 'departamento', label: 'Departamentos' },
  { value: 'penthouse', label: 'Penthouses' },
  { value: 'local', label: 'Locales comerciales' },
  { value: 'oficina', label: 'Oficinas' },
] as const;

const ZONES = ['', 'Nordelta', 'Recoleta', 'Puerto Madero', 'San Isidro', 'Palermo', 'Belgrano', 'Pilar'];

/** Buscador de vidrio del hero: arma la URL del listado con los filtros elegidos. */
export function HeroSearch() {
  const router = useRouter();
  const [op, setOp] = useState<'venta' | 'alquiler'>('venta');
  const [type, setType] = useState('');
  const [zone, setZone] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ operacion: op });
    if (type) q.set('tipo', type);
    if (zone) q.set('zona', zone);
    router.push(`/propiedades?${q.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-4xl border border-white/15 bg-white/[0.06] p-2 backdrop-blur-2xl"
      aria-label="Buscar propiedades"
    >
      <div className="flex gap-1 px-3 pt-2 pb-3">
        {OPS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setOp(o.value)}
            aria-pressed={op === o.value}
            className={`eyebrow relative px-3 py-2 transition-colors duration-500 ${op === o.value ? 'text-white' : 'text-white/45 hover:text-white/80'}`}
          >
            {o.label}
            <span
              className={`absolute right-3 bottom-0 left-3 h-px bg-gold transition-transform duration-700 ease-(--ease-luxe) ${op === o.value ? 'scale-x-100' : 'scale-x-0'}`}
            />
          </button>
        ))}
      </div>
      <div className="grid gap-px bg-white/10 md:grid-cols-[1fr_1fr_auto]">
        <label className="flex flex-col bg-ink/40 px-5 py-4">
          <span className="eyebrow !text-[0.55rem] text-gold-light/80">Tipo</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 appearance-none bg-transparent text-sm text-white outline-none [&>option]:text-ink"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col bg-ink/40 px-5 py-4">
          <span className="eyebrow !text-[0.55rem] text-gold-light/80">Zona</span>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="mt-1 appearance-none bg-transparent text-sm text-white outline-none [&>option]:text-ink"
          >
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z || 'Todas las zonas'}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-gold justify-center !px-10">
          Buscar
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
