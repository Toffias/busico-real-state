import { PROPERTIES } from '../data/properties';
import type { Operation, Property, PropertyType } from './types';

/** Única puerta de acceso a las propiedades: hoy mock, mañana la Local API de Payload. */
export function getProperties(): readonly Property[] {
  return PROPERTIES;
}

export function getFeaturedProperties(): readonly Property[] {
  return PROPERTIES.filter((p) => p.featured);
}

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getRelated(property: Property, limit = 3): readonly Property[] {
  return PROPERTIES.filter((p) => p.slug !== property.slug)
    .sort((a, b) => score(b, property) - score(a, property))
    .slice(0, limit);
}

function score(p: Property, ref: Property): number {
  return (p.operation === ref.operation ? 2 : 0) + (p.type === ref.type ? 1 : 0);
}

export const OPERATION_LABEL: Record<Operation, string> = { venta: 'Venta', alquiler: 'Alquiler' };

export const TYPE_LABEL: Record<PropertyType, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  penthouse: 'Penthouse',
  local: 'Local comercial',
  oficina: 'Oficina',
};

export function formatPrice(p: Property): string {
  if (p.price === null) return 'Consultar valor';
  const n = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(p.price);
  return `${p.currency} ${n}${p.operation === 'alquiler' ? ' / mes' : ''}`;
}

export function formatArea(m2: number): string {
  return `${new Intl.NumberFormat('es-AR').format(m2)} m²`;
}
