# 🛠️ Centro de Recursos Tecnológicos — Web

Catálogo web **estático** que muestra el repositorio de recursos (herramientas, guías, comandos y descargas) organizados por categoría, con búsqueda, filtros y vista detallada.

Construido con **React + Vite + Tailwind CSS v4**. No requiere backend: los datos viven en un archivo JS y el build genera HTML/CSS/JS puros listos para alojar en cualquier servidor estático (GitHub Pages, Netlify, etc.).

---

## 🚀 Puesta en marcha

```bash
cd web
npm install      # solo la primera vez
npm run dev      # desarrollo con recarga en caliente → http://localhost:5173
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ localmente para verificar
```

> El `vite.config.js` usa `base: './'`, por lo que `dist/` funciona en cualquier ruta o subcarpeta sin configuración extra.

---

## 🧱 Stack

| Tecnología | Uso |
|---|---|
| React 18 | UI declarativa por componentes |
| Vite 5 | Bundler / dev server |
| Tailwind CSS 4 | Estilos (plugin `@tailwindcss/vite`, tokens en `@theme`) |
| lucide-react | Iconografía SVG |

---

## 📁 Estructura

```
web/
├── index.html                     # Plantilla raíz (favicon SVG, metadatos)
├── vite.config.js                 # Plugins React + Tailwind, base './'
└── src/
    ├── main.jsx                   # Montaje de la app
    ├── App.jsx                    # Estado global: búsqueda, filtros, orden,
    │                              # vista, etiquetas activas, modal
    ├── index.css                  # Tema Tailwind (colores, animaciones) + fondo
    ├── iconMap.jsx                # Icono por categoría/tipo (lucide)
    ├── utils.js                   # copyText() con fallback
    ├── data/
    │   └── resources.js           # ★ DATOS DEL CATÁLOGO (categorías, tipos, recursos)
    └── components/
        ├── ResourceCard.jsx       # Tarjeta (modos grid/lista) + caja de comando
        ├── GuideModal.jsx         # Modal de detalle: pasos, requisitos, archivos
        └── Reveal.jsx             # Animación de aparición al hacer scroll
```

---

## ✨ Funcionalidades

- **Categorías**: Todos · PC · Celulares · Otros (con contador de recursos).
- **Tipos de recurso**: Herramientas · Guías · Comandos · Descargas.
- **Búsqueda instantánea** insensible a acentos y mayúsculas (nombre, descripción, origen y tags).
- **Filtro por etiquetas**: los `#tags` de cada tarjeta son clicables; se acumulan como chips removibles.
- **Vista grid/lista**: cuadrícula de tarjetas o filas compactas.
- **Ordenamiento**: predeterminado, nombre A-Z, Z-A.
- **Modal de detalle**: pasos numerados, comandos con copiado al portapapeles, requisitos, archivo del repositorio y enlace externo.
- **Animaciones scroll**: aparición escalonada con IntersectionObserver (`Reveal`).
- **Diseño responsive** (1 → 2 → 3 columnas) con tema oscuro tecnológico (acento cian).

---

## 🗂️ Modelo de datos

Todo el catálogo vive en `src/data/resources.js`. Cada recurso es un objeto:

```js
{
  id: 'rufus',                      // único, minúsculas
  name: 'Rufus',
  category: 'pc',                   // pc | celulares | otros
  type: 'herramienta',              // herramienta | guia | comando | descarga
  source: 'archivo-origen.txt',     // archivo del repositorio de donde proviene
  url: 'https://rufus.ie/',         // opcional → botón "Visitar sitio"
  urlLabel: 'Descargar',            // opcional → texto del botón
  command: 'irm ... | iex',         // opcional → caja con copiar (type: comando)
  requirement: 'PowerShell Admin',  // opcional → aviso en el modal
  description: 'Descripción de qué hace y para qué sirve.',
  steps: [                          // opcional → botón "Ver detalles" + modal
    { text: 'Paso uno.' },
    { text: 'Verificar:', cmd: 'Win+R' },   // cmd = clic para copiar
  ],
  file: 'PC/rufus.exe',             // opcional → archivo local del repositorio
  tags: ['usb', 'booteable'],       // clicables = filtro por etiqueta
}
```

Los campos opcionales habilitan automáticamente sus botones/secciones en la tarjeta y el modal.

### Agregar una categoría nueva
1. Objeto nuevo en `categories` (con `color` propio).
2. Su icono en `src/iconMap.jsx` (`categoryIcons`).

### Tipos nuevos
Igual: entrada en `types` + icono en `typeIcons`.

Después de editar, `npm run dev` recarga al instante; para producción ejecutar `npm run build`.

---

## 🎨 Tema

Los colores base se definen como tokens de Tailwind en `src/index.css`:

| Token | Valor | Uso |
|---|---|---|
| `night` | `#09090b` | Fondo general |
| `panel` / `card` / `cardh` | `#101014` / `#14141a` / `#1b1b23` | Superficies |
| `line` | `#27272f` | Bordes |
| `ink` / `mute` | `#f4f4f5` / `#a1a1aa` | Texto principal / secundario |
| `accent` | `#06b6d4` | Cian principal (botones, foco, logo) |

Colores por categoría: PC `#38bdf8` · Celulares `#34d399` · Otros `#a78bfa`
(animaciones `animate-fade-in` / `animate-slide-up` también definidas en `@theme`).

---

## 📦 Contenido actual del catálogo

| Recurso | Categoría | Tipo |
|---|---|---|
| Driver Booster | PC | Herramienta |
| Revo Uninstaller Pro | PC | Herramienta |
| Ninite | PC | Herramienta |
| WinUtil (Chris Titus Tech) | PC | Comando |
| Habilitar Editor de Directivas de Grupo Local | PC | Guía |
| USB Doble Partición | PC | Guía |
| Solución: No ejecuta App .exe | PC | Guía |
| ADB AppControl | Celulares | Herramienta |
| Drivers de todas las impresoras (Zofti) | Otros | Herramienta |
| VMware Workstation Pro 26H1 | Otros | Descarga |

> Nota: las entradas relacionadas con activación/cracks del repositorio original (KMS Tools, MAS, descarga.xyz) no fueron incluidas; pueden añadirse manualmente desde `resources.js` si se desea.

---

## 🌐 Despliegue

```bash
npm run build
```

Sube el contenido de `dist/` a cualquier hosting estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages…). No hay procesos de servidor ni variables de entorno.
