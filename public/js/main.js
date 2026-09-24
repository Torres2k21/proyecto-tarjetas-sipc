const APPS_SCRIPT_URL = 'AQUI_TU_URL_DE_APPS_SCRIPT';

async function cargarDatosAmbiente() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || '2301P010072';

  // Asignar QR y Código en la vista
  document.getElementById('val-qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(window.location.href)}`;
  document.getElementById('val-cod-ambiente').innerText = id;

  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?id=${id}`);
    const data = await response.json();

    if (!data.error) {
      document.getElementById('val-ambiente').innerText = data.nombreAmbiente || '---';
      document.getElementById('val-local').innerText = data.local || 'Hospital I Félix Torrealva Gutiérrez';
      document.getElementById('val-servicio').innerText = data.dependencia || '---';
      document.getElementById('val-estado').innerText = data.estado || 'ACTIVO';
    }
  } catch (err) {
    console.warn("Llamada API pendiente de URL válida de Apps Script.");
  } finally {
    const loadingElem = document.getElementById('loading');
    if (loadingElem) loadingElem.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', cargarDatosAmbiente);