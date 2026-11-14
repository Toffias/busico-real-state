'use client';

import { useState } from 'react';

/**
 * Formulario de consulta. En esta maqueta no envía nada: simula el envío y muestra la confirmación.
 */
export function ContactForm({
  defaultMessage = '',
  tone = 'light',
  compact = false,
  submitLabel = 'Enviar consulta',
}: {
  defaultMessage?: string;
  tone?: 'light' | 'dark';
  compact?: boolean;
  submitLabel?: string;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const dark = tone === 'dark';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    window.setTimeout(() => setState('sent'), 1100);
  };

  if (state === 'sent') {
    return (
      <div className="py-10 text-center" role="status">
        <svg viewBox="0 0 52 52" className="mx-auto h-14 w-14" aria-hidden="true">
          <circle cx="26" cy="26" r="25" fill="none" stroke="var(--color-gold)" strokeWidth="1" className="[stroke-dasharray:160] [animation:dash_1.2s_var(--ease-luxe)_both]" />
          <path d="M16 27l7 7 14-15" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" className="[stroke-dasharray:160] [animation:dash_0.8s_var(--ease-luxe)_0.5s_both]" />
        </svg>
        <p className={`display mt-6 text-4xl ${dark ? 'text-white' : 'text-ink'}`}>Gracias por escribirnos</p>
        <p className={`mt-3 text-sm ${dark ? 'text-white/60' : 'text-stone'}`}>
          Un asesor se comunicará con usted a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${dark ? 'text-white' : 'text-ink'} ${compact ? 'space-y-3' : 'space-y-5'}`}>
      <div className={compact ? 'space-y-3' : 'grid gap-5 md:grid-cols-2'}>
        <div className="field">
          <input id="nombre" name="nombre" required placeholder=" " autoComplete="name" />
          <label htmlFor="nombre">Nombre y apellido</label>
        </div>
        <div className="field">
          <input id="telefono" name="telefono" type="tel" placeholder=" " autoComplete="tel" />
          <label htmlFor="telefono">Teléfono</label>
        </div>
      </div>
      <div className="field">
        <input id="email" name="email" type="email" required placeholder=" " autoComplete="email" />
        <label htmlFor="email">Email</label>
      </div>
      <div className="field">
        <textarea id="mensaje" name="mensaje" rows={compact ? 3 : 4} placeholder=" " defaultValue={defaultMessage} />
        <label htmlFor="mensaje">Mensaje</label>
      </div>
      <button type="submit" disabled={state === 'sending'} className="btn btn-gold mt-4 w-full justify-center">
        {state === 'sending' ? 'Enviando…' : submitLabel}
        <span className="btn-arrow">→</span>
      </button>
      <p className={`text-center text-[0.68rem] ${dark ? 'text-white/40' : 'text-stone'}`}>
        Sus datos se tratan con absoluta confidencialidad.
      </p>
    </form>
  );
}
