import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '../../components/layout/site-footer';
import { SiteHeader } from '../../components/layout/site-header';
import { WhatsAppFloat } from '../../components/layout/whatsapp-float';
import { Intro } from '../../components/motion/intro';
import { MotionRuntime } from '../../components/motion/motion-runtime';

export const metadata: Metadata = {
  title: {
    default: 'Busico Real Estate · Propiedades exclusivas en Buenos Aires',
    template: '%s · Busico Real Estate',
  },
  description:
    'Propiedades de categoría, residencias de autor y espacios comerciales en Buenos Aires. Asesoramiento inmobiliario personalizado y discreto.',
  icons: { icon: '/brand/busico-logo.png' },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0a',
};

/*
 * Antes de pintar: marca que hay JS (activa los reveals) y, si la intro ya se vio en esta sesión,
 * la saltea para no hacer esperar en cada recarga.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('busico-intro')){d.classList.add('no-intro','is-ready')}}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-intro','is-ready')}})();`;

export default function FrontendLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className="min-h-dvh">
        <Intro />
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <MotionRuntime />
      </body>
    </html>
  );
}
