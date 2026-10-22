# TRIP Travel — sitio web

Sitio estático (HTML/CSS/JS, sin frameworks ni build step) para **TRIP TRAVEL S.A.C.**, agencia de viajes con sede en Trujillo, La Libertad.

## Estructura

```
index.html          Inicio
tours.html           Tours, paquetes (La Libertad + Perú) y boletos
transporte.html       Transporte, traslados y alquiler de vehículos
corporativo.html      Turismo corporativo, eventos y consultoría
nosotros.html         Historia y datos legales (RUC, SUNAT)
contacto.html         Formulario + datos de contacto
styles.css             Hoja de estilos única, compartida por todas las páginas
script.js              Menú móvil, filtros de tours, formulario -> WhatsApp
assets/                Logos (SVG), favicon
fonts/                 Fraunces y Archivo, autohospedadas (.ttf)
```

Abre `index.html` directamente en un navegador para verlo, o súbelo tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages, un hosting compartido con FTP, etc.) — no requiere build ni servidor.

## Identidad visual

La marca está anclada en la identidad de Trujillo: el friso escalonado de "ola marina" de Chan Chan, el caballito de totora de Huanchaco y la luz del atardecer en el Pacífico — en vez del clásico ícono genérico de maleta + avión.

- **Paleta (estrategia 70/20/10):** 70% dominante `--paper` #FBF8F3 (blanco cálido), 20% secundario `--tide` #0D7D87 (turquesa del Pacífico, usado en footer/CTA/íconos), 10% acento `--gold` #FF6A3D (coral de atardecer, solo en botones principales y precios). `--ink` #0F2A33 es el color de texto; `--clay` #D9522B y `--reed` #6B8286 son tonos de apoyo menores (ver `:root` en `styles.css`).
- **Tipografía:** Fraunces (titulares) + Archivo (texto/UI), ambas variables y autohospedadas en `fonts/`.
- **Logos** en `assets/`: `logo-mark.svg` (ícono), `logo-horizontal.svg` (fondo claro), `logo-horizontal-reversed.svg` (fondo oscuro), `favicon.svg`. Los archivos usan `font-family: Fraunces/Archivo` con reemplazo a serif/sans del sistema si se abren sin esas fuentes instaladas (p. ej. en Illustrator).

## ⚠ Antes de publicar — reemplazar

El sitio se entrega con datos de ejemplo que **debes reemplazar** antes de ponerlo en producción:

1. **Número de WhatsApp**: actualmente `51900000000` (placeholder) en `styles.css` (`--wa-number`), en el atributo `data-wa` del `<body>` de cada página, y en todos los enlaces `wa.me/51900000000` repartidos en cada HTML (botones "Cotizar", flotante, CTA). Un buscar-y-reemplazar de `51900000000` por el número real en todos los `.html` + `styles.css` es suficiente.
2. **Correo**: `reservas@triptravel.pe` es un placeholder — reemplázalo si el dominio o el correo real son otros.
3. **Dominio**: se asumió `triptravel.pe` en `sitemap.xml`, `robots.txt` y el correo de ejemplo — ajústalo al dominio real una vez lo registren.
4. **Redes sociales**: los íconos de Instagram/Facebook en el footer enlazan a `#` — súmales las URLs reales o quítalos.
5. **Precios de paquetes** (`tours.html`): son valores referenciales de mercado, no precios reales cotizados — revísalos antes de publicar.

## Nota sobre SUNAT

La ficha de "Nosotros" muestra RUC, razón social, domicilio fiscal y actividades económicas (todo verificado en la consulta RUC de SUNAT). Deliberadamente **no se muestra la condición "NO HABIDO"** que aparece en SUNAT — es un dato interno de cumplimiento tributario, no algo para el público, pero conviene regularizarlo pronto en los Centros de Servicios al Contribuyente para poder emitir comprobantes sin restricciones.
