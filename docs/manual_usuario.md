# Manual de Despliegue y Mantenimiento

## 1. Configuración de Google Apps Script
1. Abrir la hoja de Google Sheets.
2. Ir a **Extensiones > Apps Script**.
3. Pegar el código de backend y ejecutar **Desplegar > Nuevo despliegue**.
4. Copiar la URL generada e incluirla en `public/js/main.js`.

## 2. Generar QRs
Ejecutar el script desde la consola local:
```bash
python scripts/generador_qr_masivo.py