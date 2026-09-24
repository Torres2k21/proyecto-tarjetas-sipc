// URL de la REST API desplegada en Google Apps Script
const REST_API_URL = 'https://script.google.com/macros/s/AKfycbxgPVoimlgjjTHhaVD-3coKhnOaZv0Ne84Z5wrNAhUWVwYVZL0d3V4TCsuexipqSKGUjg/exec';

/**
 * Cliente HTTP REST para obtener el ambiente mediante GET
 */
async function fetchAmbienteREST() {
  const urlParams = new URLSearchParams(window.location.search);
  const codAmbiente = urlParams.get('id') || '2301P010072';

  // Renderizar QR apuntando a la URL dinámica de la tarjeta
  document.getElementById('val-qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(window.location.href)}`;
  document.getElementById('val-cod-ambiente').innerText = codAmbiente;

  try {
    const response = await fetch(`${REST_API_URL}?id=${codAmbiente}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const result = await response.json();

    if (result.status === 200) {
      const item = result.data;
      document.getElementById('val-ambiente').innerText = item.nombreAmbiente || '---';
      document.getElementById('val-local').innerText = item.local;
      document.getElementById('val-servicio').innerText = item.dependencia || '---';
      document.getElementById('val-estado').innerText = item.estado;
    } else {
      console.error("Error REST API:", result.error);
      document.getElementById('val-ambiente').innerText = "Ambiente No Encontrado";
    }
  } catch (err) {
    console.error("Falla de conexión REST con Google Apps Script:", err);
  } finally {
    const loadingElem = document.getElementById('loading');
    if (loadingElem) loadingElem.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', fetchAmbienteREST);