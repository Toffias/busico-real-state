'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BUSINESS } from '../../lib/business';
import { Logo } from '../brand/logo';

const NAV = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/propiedades?operacion=alquiler&tipo=local', label: 'Comerciales' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const;

/**
 * Header transparente sobre el hero; al bajar se vuelve un vidrio oscuro y se esconde,
 * y reaparece apenas se sube. En mobile abre un menú a pantalla completa.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        style={{ viewTransitionName: 'site-header' }}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,padding] duration-700 ease-(--ease-luxe) ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled && !open ? 'bg-ink/75 py-3 backdrop-blur-xl' : 'bg-transparent py-6'}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" aria-label="Busico Real Estate, inicio" className="relative z-10">
            <Logo compact />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-11 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="link-line eyebrow pb-1 text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-light hidden !py-3 !px-5 md:inline-flex"
            >
              Agendar visita
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="relative z-10 flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
            >
              <span
                className={`block h-px bg-white transition-all duration-500 ${open ? 'w-7 translate-y-[4px] rotate-45' : 'w-7'}`}
              />
              <span
                className={`block h-px bg-gold transition-all duration-500 ${open ? 'w-7 -translate-y-[4px] -rotate-45' : 'w-4'}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-14 transition-[clip-path] duration-1000 ease-(--ease-curtain) lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Menú móvil" className="flex flex-col gap-2">
          {[{ href: '/', label: 'Inicio' }, ...NAV].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className="display overflow-hidden text-5xl text-white"
            >
              <span
                className="inline-block transition-transform duration-1000 ease-(--ease-luxe)"
                style={{
                  transform: open ? 'none' : 'translateY(110%)',
                  transitionDelay: open ? `${200 + i * 70}ms` : '0ms',
                }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="rule-gold mt-10 mb-6 opacity-60" />
        <div className="flex justify-between text-xs tracking-widest text-white/60">
          <a href={BUSINESS.instagram} target="_blank" rel="noreferrer">
            {BUSINESS.instagramHandle}
          </a>
          <span>{BUSINESS.phone}</span>
        </div>
      </div>
    </>
  );
}
