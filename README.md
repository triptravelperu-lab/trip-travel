# TRIP Travel — World Connections 2026

**Sitio estático para GitHub Pages.** Esta edición evoluciona la marca desde una web enfocada en viajes por Perú hacia una experiencia para explorar destinos, alojamientos, vuelos, actividades y transporte en diferentes países. La base de atención comunicada es Lima, Perú; la visión de marca es global.

## Qué incluye

- `index.html`: experiencia global, selector de servicios y buscador de conexiones.
- `destinos.html`: atlas de inspiración con destinos internacionales y peruanos.
- `hoteles.html`: buscador que prepara búsquedas para Booking.com, Airbnb, Google Hotels y Expedia.
- `vuelos.html`: enlaces a buscadores de vuelos con origen, destino y fechas.
- `experiencias.html`: búsqueda de tours, entradas, lugares y actividades.
- `conexiones.html`: rutas de puerta a puerta, transporte público, movilidad local y autos.
- `tours.html`: estudio para viajes e itinerarios personalizados.
- `transporte.html`: servicios y conceptos de movilidad global.
- `corporativo.html`: viajes de trabajo, reuniones y eventos.
- `nosotros.html`: identidad de TRIP Travel, base en Lima y enfoque internacional.
- `contacto.html`: formulario que prepara un mensaje para WhatsApp.
- `styles.css`, `script.js`, `assets/images/`: sistema visual adaptable, lógica del buscador e imágenes locales.

## WhatsApp

Todos los accesos principales utilizan **+51 954 021 718** (`51954021718`).

## Qué significa «conectarse» en esta versión

El buscador recopila destino, origen, fechas, tipo de servicio y número de viajeros; genera enlaces de búsqueda y abre el proveedor correspondiente en otra pestaña. Así, el usuario puede continuar con un buscador externo. La disponibilidad, los precios, los impuestos, la moneda, la política de cancelación y el cobro se verifican en el sitio que presta el servicio.

**Esta versión no consulta inventario por API en tiempo real, no procesa pagos, no confirma reservas dentro de TRIP Travel y no declara acuerdos comerciales o de afiliación con proveedores.** Los enlaces son accesos genéricos, no enlaces de afiliado.

### Para una plataforma de reservas integrada en una fase futura

1. Definir los proveedores y mercados prioritarios (alojamiento, vuelos, tours, seguros, transporte y pagos).
2. Solicitar acceso oficial a APIs, programas de afiliación o inventario de cada proveedor y aceptar sus condiciones.
3. Crear un backend seguro para las claves API, la normalización de disponibilidad/precios, el tratamiento de errores y las políticas de privacidad.
4. Crear el flujo de reserva con confirmación, soporte, impuestos y reglas claras. No incluir secretos API en el JavaScript público de GitHub Pages.
5. Probar por país, moneda, idioma, dispositivos y accesibilidad antes del lanzamiento comercial.

GitHub Pages por sí solo es alojamiento estático; las conexiones a inventario en tiempo real y las claves privadas requerirán un servicio de backend o plataforma especializada.

## Diseño y funcionamiento

- Diseño responsive de móvil a escritorio.
- Selector de idioma de interfaz ES/EN para navegación y secciones preparadas.
- Búsquedas dinámicas a través de enlaces de proveedores, filtros del atlas e integración de WhatsApp.
- Fotografías principales incluidas dentro de `assets/images/`; no dependen de una URL de foto externa.
- Las panorámicas internacionales son composiciones visuales creadas para inspirar el diseño; no deben interpretarse como fotografías documentales exactas de cada lugar.
- Respeta `prefers-reduced-motion` y no sustituye fotos fallidas con la misma imagen genérica.

## Publicar en GitHub Pages

1. Descarga y descomprime `TRIP-Travel-Mundo-2026.zip`.
2. Sube el **contenido completo** de la carpeta a la raíz del repositorio de Pages (`index.html`, el resto de páginas, `styles.css`, `script.js`, `assets/`, `robots.txt` y `sitemap.xml`).
3. Confirma los cambios. En GitHub, abre **Settings → Pages** y valida la rama/carpeta de publicación.
4. Al terminar el despliegue, recarga con `Ctrl+F5` o limpia la caché del navegador móvil.

## Búsqueda de terceros

- [Booking.com](https://www.booking.com/)
- [Airbnb](https://www.airbnb.com/)
- [Google Hotels](https://www.google.com/travel/hotels)
- [Google Flights](https://www.google.com/travel/flights)
- [KAYAK](https://www.kayak.com/)
- [Skyscanner](https://www.skyscanner.com/)
- [GetYourGuide](https://www.getyourguide.com/)
- [Viator](https://www.viator.com/)
- [Rome2Rio](https://www.rome2rio.com/)
- [Google Maps](https://maps.google.com/)

---

**Nota comercial:** antes de lanzar una campaña internacional o publicar tarifas, confirmar datos empresariales, cobertura real, términos de servicio, privacidad, cookies, requisitos por país y cualquier acreditación o acuerdo que se quiera comunicar públicamente.
