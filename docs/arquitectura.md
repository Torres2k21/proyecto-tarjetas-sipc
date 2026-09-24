# Arquitectura del Sistema SIPC - Tarjetas Dinámicas QR

## 1. Módulos
- **Frontend SPA**: Ubicado en `/public`, HTML5/CSS3/JS vainilla desplegado en GitHub Pages.
- **Backend API**: Servidor Serverless en Google Apps Script enlazado a la hoja `bd_ambientes_SIPC` de Google Sheets.
- **Generador Batch**: Script de Python ubicado en `/scripts` para exportar masivamente placas de impresión QR.

## 2. Flujo de Datos
1. Usuario escanea el QR en la puerta: `https://<usuario>.github.io/<repo>/?id=2301P010072`
2. `public/js/main.js` captura el parámetro `id`.
3. Petición GET asíncrona enviada a Google Apps Script.
4. Respuesta JSON renderizada en la tarjeta física invariable.