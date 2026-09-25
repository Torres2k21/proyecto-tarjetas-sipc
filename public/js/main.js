const REST_API_URL = 'https://script.google.com/macros/s/AKfycbyWflPorIwx46Q65c4VsL9CweA9aPx8UtmlYCSyQvVfkGn87uQL9y-aRMrWGfkG3bVhYw/exec';

function fetchAmbienteJSONP() {
  const urlParams = new URLSearchParams(window.location.search);
  const codAmbiente = urlParams.get('id') || '2301P010072';

  // Renderizar QR dinámico
  const qrImg = document.getElementById('val-qr-img');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(window.location.href)}`;
  }
  
  const codElem = document.getElementById('val-cod-ambiente');
  if (codElem) {
    codElem.innerText = codAmbiente;
  }

  // Nombre de función callback global para JSONP
  window.sipcCallback = function(result) {
    const loadingElem = document.getElementById('loading');
    if (loadingElem) loadingElem.style.display = 'none';

    if (result && result.status === 200) {
      const item = result.data;
      document.getElementById('val-ambiente').innerText = item.nombreAmbiente || '---';
      document.getElementById('val-local').innerText = item.local;
      document.getElementById('val-servicio').innerText = item.dependencia || '---';
      document.getElementById('val-estado').innerText = item.estado;
    } else {
      console.error("Error en datos recibidos:", result);
      document.getElementById('val-ambiente').innerText = "Ambiente No Encontrado";
    }
  };

  // Inyección del script dinámico
  const script = document.createElement('script');
  script.src = `${REST_API_URL}?id=${encodeURIComponent(codAmbiente)}&callback=sipcCallback`;
  script.onerror = function() {
    const loadingElem = document.getElementById('loading');
    if (loadingElem) loadingElem.style.display = 'none';
    document.getElementById('val-ambiente').innerText = "Error de Conexión";
  };
  
  document.body.appendChild(script);
}

window.addEventListener('DOMContentLoaded', fetchAmbienteJSONP);