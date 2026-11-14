# Busico Real Estate — web

Propuesta de sitio para Busico Real Estate: Next.js 16 + Payload CMS 3 (SQLite local).

## Correr en local

```bash
pnpm install
cp .env.example .env   # completar PAYLOAD_SECRET
pnpm dev               # http://localhost:3100
```

- Sitio: `http://localhost:3100`
- Admin de Payload: `http://localhost:3100/admin` (la primera vez pide crear el usuario). La base `busico.db` se crea sola.

## Estructura

| Ruta | Qué hay |
| --- | --- |
| `src/app/(frontend)` | Sitio público: home, `/propiedades`, ficha, `/nosotros`, `/contacto` |
| `src/app/(payload)` | Admin y API de Payload (archivos generados, no se editan a mano) |
| `src/payload/collections` | Colecciones: `properties`, `media`, `users` |
| `src/data/properties.ts` | **Data mockeada** de propiedades (misma forma que la colección) |
| `src/lib/properties.ts` | Única puerta de acceso a las propiedades: para pasar a datos reales se cambia acá por la Local API de Payload |
| `src/components/motion` | Intro de marca, scroll suave (Lenis), reveals, cursor y transiciones entre páginas |

## Identidad

- Negro profundo + dorado metálico (las tres barras del logo, redibujadas en SVG en `components/brand/logo.tsx`) + arena cálido de sus piezas de Instagram.
- Cormorant Garamond para títulos, Montserrat para la interfaz.

## Pendiente para producción

- Fotos: hoy son de Unsplash (ilustrativas), salvo las dos piezas de Instagram de los locales.
- Teléfono, mail, cifras de la banda de "Discreción, criterio y resultados" y el testimonio son de ejemplo.
- El formulario de contacto simula el envío.
