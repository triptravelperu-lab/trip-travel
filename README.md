# TRIP Travel — World Connections (versión corregida)

Web estática de TRIP Travel con base de atención en Lima y visión internacional. Incluye búsqueda orientativa, directorio de destinos, enlaces a proveedores de alojamiento/vuelos/experiencias/transporte, contacto y páginas corporativas.

## Qué se corrigió en esta entrega

- Se identificó un conflicto muy probable de caché/hoja de estilos anterior: el HTML actualizado utilizaba el mismo nombre `styles.css` que el sitio anterior, así que el navegador podía reutilizar estilos que no correspondían a las nuevas clases.
- La hoja se renombró a `trip-world-global-2026.css` y el script a `trip-world-global-2026.js`, ambos con versión en el enlace para evitar reutilizar archivos antiguos.
- Cada página lleva además una capa de estilos de seguridad en el HTML para mantener una maquetación coherente si el recurso externo no carga.
- Se conserva el logotipo proporcionado, las imágenes dentro de `assets/images/`, las páginas globales y el WhatsApp **+51 954 021 718**.
- Se mantuvo el diseño adaptable para móviles, con navegación colapsable y respeto a la preferencia de movimiento reducido.

## Publicación en GitHub Pages

1. Descomprime el ZIP.
2. Abre el repositorio `trip-travel` y reemplaza los archivos del sitio por **todo el contenido de esta carpeta**. `index.html` debe quedar directamente en la raíz del repositorio; no lo dejes dentro de una subcarpeta adicional.
3. Verifica que subiste los archivos `trip-world-global-2026.css`, `trip-world-global-2026.js` y toda la carpeta `assets/`.
4. Confirma los cambios y espera a que termine el despliegue de GitHub Pages.
5. Abre la web con recarga forzada (`Ctrl + F5` en Windows/Linux o `Cmd + Shift + R` en Mac).

No hace falta conservar `styles.css` ni `script.js` de la versión anterior. Las páginas de esta entrega usan los archivos con nombres nuevos.

## Estado real de las conexiones

El buscador construye enlaces de búsqueda hacia proveedores externos para que la persona continúe la consulta con el proveedor elegido. No se simulan inventarios, precios instantáneos, disponibilidad ni reservas confirmadas. Para ver y vender inventario en la propia web se necesita integrar API oficiales o programas comerciales autorizados, credenciales seguras y un backend.

## Pruebas realizadas

- Comprobación de sintaxis CSS.
- Verificación de referencias locales a páginas, hojas de estilo, scripts y recursos gráficos.
- Revisión de que todas las páginas enlacen la hoja y el script con nombre/versionado nuevos.
