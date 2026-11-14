import Link from 'next/link';

import { LogoMark } from '../../components/brand/logo';

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center justify-center bg-ink px-6 text-center text-white">
      <div>
        <LogoMark className="mx-auto h-20 w-auto" />
        <p className="display mt-10 text-6xl md:text-8xl">
          Esta página <em className="text-gold italic">no existe</em>
        </p>
        <Link href="/" className="btn btn-ghost-light mt-12">
          Volver al inicio <span className="btn-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
