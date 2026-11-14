export type Operation = 'venta' | 'alquiler';
export type PropertyType = 'casa' | 'departamento' | 'penthouse' | 'local' | 'oficina';

export interface PropertyImage {
  readonly src: string;
  readonly alt: string;
}

/** Misma forma que la colección `properties` de Payload. */
export interface Property {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly operation: Operation;
  readonly type: PropertyType;
  readonly neighborhood: string;
  readonly city: string;
  readonly address?: string;
  readonly currency: 'USD' | 'ARS';
  /** `null` = precio a consultar. */
  readonly price: number | null;
  readonly area: number;
  readonly coveredArea?: number;
  readonly rooms?: number;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly garages?: number;
  readonly description: readonly string[];
  readonly amenities: readonly string[];
  readonly images: readonly PropertyImage[];
  readonly featured: boolean;
  readonly lat: number;
  readonly lng: number;
  /** Etiqueta corta sobre la foto: "Exclusiva", "Nuevo ingreso"… */
  readonly badge?: string;
}
