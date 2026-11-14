import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Título que entra línea por línea desde una máscara al aparecer en pantalla.
 * Cada elemento de `lines` es una línea; puede ser texto o nodos (para resaltar en dorado).
 */
export function RevealLines({
  as: Tag = 'h2',
  lines,
  className = '',
  delay = 0,
}: {
  as?: ElementType;
  lines: readonly ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <Tag data-reveal="lines" className={className} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span style={{ '--i': i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

export function delay(ms: number): CSSProperties {
  return { '--d': `${ms}ms` } as CSSProperties;
}
