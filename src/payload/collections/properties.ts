import type { CollectionConfig } from 'payload';

/**
 * Propiedades. Hoy el sitio público lee la data mockeada de `src/data/properties.ts`,
 * que respeta esta misma forma: cuando se cargue contenido real, se cambia la fuente
 * de `src/lib/properties.ts` por la Local API de Payload.
 */
export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Propiedad', plural: 'Propiedades' },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'operation', 'type', 'neighborhood', 'price', 'featured'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'operation',
          label: 'Operación',
          type: 'select',
          required: true,
          options: [
            { label: 'Venta', value: 'venta' },
            { label: 'Alquiler', value: 'alquiler' },
          ],
        },
        {
          name: 'type',
          label: 'Tipo',
          type: 'select',
          required: true,
          options: [
            { label: 'Casa', value: 'casa' },
            { label: 'Departamento', value: 'departamento' },
            { label: 'Penthouse', value: 'penthouse' },
            { label: 'Local comercial', value: 'local' },
            { label: 'Oficina', value: 'oficina' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'neighborhood', label: 'Barrio', type: 'text', required: true },
        { name: 'address', label: 'Dirección', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'currency',
          label: 'Moneda',
          type: 'select',
          defaultValue: 'USD',
          options: ['USD', 'ARS'],
        },
        { name: 'price', label: 'Precio (vacío = consultar)', type: 'number' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'area', label: 'Superficie total (m²)', type: 'number' },
        { name: 'coveredArea', label: 'Superficie cubierta (m²)', type: 'number' },
        { name: 'rooms', label: 'Ambientes', type: 'number' },
        { name: 'bedrooms', label: 'Dormitorios', type: 'number' },
        { name: 'bathrooms', label: 'Baños', type: 'number' },
        { name: 'garages', label: 'Cocheras', type: 'number' },
      ],
    },
    { name: 'tagline', label: 'Bajada', type: 'text' },
    { name: 'description', label: 'Descripción', type: 'textarea' },
    {
      name: 'amenities',
      label: 'Destacados',
      type: 'array',
      fields: [{ name: 'label', label: 'Texto', type: 'text', required: true }],
    },
    {
      name: 'images',
      label: 'Fotos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'featured',
      label: 'Destacada en la home',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'lat', label: 'Latitud', type: 'number' },
        { name: 'lng', label: 'Longitud', type: 'number' },
      ],
    },
  ],
};
