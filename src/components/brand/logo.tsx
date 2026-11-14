import { useId } from 'react';

const BAR = 'M0 0C26 0 46 22 46 48V553C20 553 0 531 0 505Z';

/** Las tres barras doradas del isotipo, redibujadas en SVG para que escalen sin perder nitidez. */
export function LogoMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 180 653" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d69e14" />
          <stop offset="0.22" stopColor="#efc24a" />
          <stop offset="0.48" stopColor="#fbe7a6" />
          <stop offset="0.64" stopColor="#f0c446" />
          <stop offset="1" stopColor="#d39a12" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 67} ${i * 50})`}>
          <path
            d={BAR}
            fill={`url(#g-${id})`}
            className={animated ? 'logo-bar' : undefined}
            style={animated ? ({ '--i': i } as React.CSSProperties) : undefined}
          />
        </g>
      ))}
    </svg>
  );
}

export function Logo({
  className = '',
  tone = 'light',
  compact = false,
}: {
  className?: string;
  tone?: 'light' | 'dark';
  compact?: boolean;
}) {
  const color = tone === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <LogoMark className={compact ? 'h-8 w-auto' : 'h-10 w-auto'} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans font-extrabold tracking-[0.04em] ${compact ? 'text-[1.35rem]' : 'text-[1.6rem]'}`}
        >
          BUSICO
        </span>
        <span className="mt-[0.3em] text-[0.5rem] font-medium tracking-[0.62em] opacity-80">REAL ESTATE</span>
      </span>
    </span>
  );
}
