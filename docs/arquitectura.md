# Arquitectura REST API SIPC (Google Workspace Native)

## 1. Visión General
El proyecto opera bajo una arquitectura **Jamstack / RESTful Serverless** soportada íntegramente por herramientas de Google Workspace:
- **Base de Datos Relacional**: Google Sheets (`bd_ambientes_SIPC`).
- **REST Backend Engine**: Google Apps Script (Apps Script Web App execution context).
- **Frontend SPA**: HTML5/CSS3/JS expuesto públicamente.

## 2. Contrato de la API REST

### GET /exec?id={CODAMB}
Obtiene los detalles del ambiente escaneado.

**Respuesta Exitosa (200 OK):**
```json
{
  "status": 200,
  "data": {
    "codAmbiente": "2301P010072",
    "nombreAmbiente": "Consultorio Médico N.° 02",
    "dependencia": "Consulta Externa",
    "estado": "ACTIVO",
    "local": "Hospital I Félix Torrealva Gutiérrez",
    "red": "Red Asistencial Ica"
  }
}