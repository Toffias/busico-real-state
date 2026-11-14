import Link from 'next/link';

import { BUSINESS } from '../../lib/business';
import { Logo, LogoMark } from '../brand/logo';

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-white/70">
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-40 h-[38rem] w-auto opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1600px] px-6 pt-28 pb-10 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="display mt-10 max-w-sm text-3xl text-white/90">
              Propiedades extraordinarias para <em className="text-gold not-italic">vidas extraordinarias</em>.
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold">Explorar</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link className="link-line hover:text-white" href="/propiedades?operacion=venta">
                  Comprar
                </Link>
              </li>
              <li>
                <Link className="link-line hover:text-white" href="/propiedades?operacion=alquiler">
                  Alquilar
                </Link>
              </li>
              <li>
                <Link className="link-line hover:text-white" href="/propiedades?operacion=alquiler&tipo=local">
                  Locales comerciales
                </Link>
              </li>
              <li>
                <Link className="link-line hover:text-white" href="/contacto?motivo=tasacion">
                  Tasar mi propiedad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold">Busico</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link className="link-line hover:text-white" href="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link className="link-line hover:text-white" href="/contacto">
                  Contacto
                </Link>
              </li>
              <li>
                <Link className="link-line hover:text-white" href="/admin">
                  Acceso equipo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold">Contacto</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a className="link-line hover:text-white" href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a className="link-line hover:text-white" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a className="link-line hover:text-white" href={BUSINESS.instagram} target="_blank" rel="noreferrer">
                  Instagram {BUSINESS.instagramHandle}
                </a>
              </li>
              <li>{BUSINESS.address}</li>
            </ul>
          </div>
        </div>

        <div className="rule-gold mt-24 opacity-40" />
        <div className="mt-8 flex flex-col justify-between gap-4 text-[0.68rem] tracking-[0.2em] text-white/40 uppercase md:flex-row">
          <p>© {new Date().getFullYear()} Busico Real Estate. Todos los derechos reservados.</p>
          <p>Buenos Aires · Argentina</p>
        </div>
      </div>
    </footer>
  );
}
