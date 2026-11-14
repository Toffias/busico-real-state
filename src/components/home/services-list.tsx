'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { IMG } from '../../data/properties';

const SERVICES = [
  {
    n: '01',
    title: 'Compra',
    text: 'Búsqueda a medida, acceso a oportunidades off market y acompañamiento integral hasta la escritura.',
    href: '/propiedades?operacion=venta',
    img: IMG.livingWarm,
  },
  {
    n: '02',
    title: 'Venta',
    text: 'Tasación precisa, producción fotográfica profesional y una estrategia de comercialización discreta.',
    href: '/contacto?motivo=venta',
    img: IMG.villaWhite,
  },
  {
    n: '03',
    title: 'Alquileres',
    text: 'Residencias y pisos de categoría para estadías largas, con gestión y administración completas.',
    href: '/propiedades?operacion=alquiler',
    img: IMG.bedroomLuxe,
  },
  {
    n: '04',
    title: 'Comerciales',
    text: 'Locales y plantas de gran escala en ubicaciones de alto tránsito para marcas que buscan crecer.',
    href: '/propiedades?operacion=alquiler&tipo=local',
    img: IMG.retail,
  },
  {
    n: '05',
    title: 'Tasaciones',
    text: 'Valuaciones con fundamento de mercado, entregadas por escrito y con total confidencialidad.',
    href: '/contacto?motivo=tasacion',
    img: IMG.dining,
  },
] as const;

/**
 * Lista editorial de servicios. En desktop, una foto flotante sigue al puntero y cambia con un
 * fundido al pasar por cada fila.
 */
export function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const box = boxRef.current?.getBoundingClientRect();
    const prev = previewRef.current;
    if (!box || !prev) return;
    prev.style.transform = `translate3d(${e.clientX - box.left}px, ${e.clientY - box.top}px, 0)`;
  };

  return (
    <div ref={boxRef} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div
        ref={previewRef}
        className="pointer-events-none absolute top-0 left-0 z-10 hidden transition-transform duration-500 ease-(--ease-luxe) lg:block"
        aria-hidden="true"
      >
        <div
          className={`relative -mt-40 -ml-36 h-80 w-72 overflow-hidden transition-[clip-path,opacity] duration-700 ease-(--ease-luxe) ${
            active === null ? 'opacity-0 [clip-path:inset(50%_50%_50%_50%)]' : 'opacity-100 [clip-path:inset(0_0_0_0)]'
          }`}
        >
          {SERVICES.map((s, i) => (
            <Image
              key={s.n}
              src={s.img}
              alt=""
              fill
              sizes="288px"
              className={`object-cover transition-[opacity,transform] duration-700 ease-(--ease-luxe) ${active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
            />
          ))}
        </div>
      </div>

      <ul className="border-t border-white/10">
        {SERVICES.map((s, i) => (
          <li key={s.n} data-reveal="fade" style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
            <Link
              href={s.href}
              onPointerEnter={() => setActive(i)}
              className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-3 border-b border-white/10 py-9 md:grid-cols-[5rem_1fr_1.1fr_auto] md:py-11"
            >
              <span className="eyebrow text-gold">{s.n}</span>
              <span
                className={`display text-5xl transition-[color,transform] duration-700 ease-(--ease-luxe) md:text-7xl ${
                  active === null || active === i ? 'text-white' : 'text-white/25'
                } group-hover:translate-x-3`}
              >
                {s.title}
              </span>
              <span className="col-start-2 max-w-md text-sm leading-relaxed text-white/55 md:col-start-3">{s.text}</span>
              <span className="col-start-2 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-700 ease-(--ease-luxe) group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:col-start-4 md:flex">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
