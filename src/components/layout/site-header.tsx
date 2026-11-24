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
    // `last` solo se mueve cuando el desplazamiento acumulado supera el umbral: así los
    // micro-deltas de la inercia de Lenis no hacen que el header aparezca y desaparezca.
    const THRESHOLD = 12;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 240) {
        setHidden(false);
        last = y;
        return;
      }
      const delta = y - last;
      if (Math.abs(delta) < THRESHOLD) return;
      setHidden(delta > 0);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        style={{ viewTransitionName: 'site-header' }}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-(--ease-luxe) will-change-transform ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Fondo en su propia capa: se anima solo la opacidad (animar backdrop-filter parpadea). */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-ink/75 backdrop-blur-xl transition-opacity duration-500 ${
            scrolled && !open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-[padding] duration-500 ease-(--ease-luxe) md:px-12 ${
            scrolled && !open ? 'py-3' : 'py-6'
          }`}
        >
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
