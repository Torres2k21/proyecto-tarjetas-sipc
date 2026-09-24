/**
 * REST API SIPC - Google Apps Script Backend
 * Servicio RESTful para consulta y actualización de ambientes
 */

// Headers CORS para permitir peticiones HTTP desde el frontend web
function setCorsHeaders(output) {
  return output
    .setMimeType(ContentService.MimeType.JSON);
}

// ENDPOINT GET: Recibir consultas por código de ambiente (?id=2301P010072)
function doGet(e) {
  var idBuscado = e.parameter.id;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  // Índices de columnas según la base SIPC
  var idxAmbiente = headers.indexOf("CODAMB");
  var idxNomAmbiente = headers.indexOf("AMBIENTE");
  var idxDependencia = headers.indexOf("DEPENDENCIA");
  var idxEstado = headers.indexOf("ESTADO");

  if (!idBuscado) {
    return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
      status: 400,
      error: "Bad Request: Falta el parámetro 'id' (CODAMB)"
    })));
  }

  // Búsqueda en la base de datos
  for (var i = 1; i < data.length; i++) {
    var codAmbiente = String(data[i][idxAmbiente]).trim();
    if (codAmbiente === String(idBuscado).trim()) {
      var payload = {
        status: 200,
        data: {
          codAmbiente: data[i][idxAmbiente],
          nombreAmbiente: data[i][idxNomAmbiente],
          dependencia: data[i][idxDependencia],
          estado: data[i][idxEstado] || "?",
          local: "Hospital I Félix Torrealva Gutiérrez",
          red: "Red Asistencial Ica"
        }
      };
      return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(payload)));
    }
  }

  return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
    status: 404,
    error: "NotFound: Código de ambiente no registrado en SIPC"
  })));
}

// ENDPOINT POST: Actualización de datos desde el panel web
function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var codBuscado = contents.codAmbiente;
    var nuevoEstado = contents.estado;

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var headers = data[0];

    var idxAmbiente = headers.indexOf("CODAMB");
    var idxEstado = headers.indexOf("ESTADO");

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][idxAmbiente]).trim() === String(codBuscado).trim()) {
        // Actualizar la celda en Google Sheets
        sheet.getRange(i + 1, idxEstado + 1).setValue(nuevoEstado);

        return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
          status: 200,
          message: "Ambiente actualizado con éxito en Google Sheets"
        })));
      }
    }

    return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
      status: 404,
      error: "Ambiente no encontrado para actualizar"
    })));

  } catch (err) {
    return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
      status: 500,
      error: "Internal Server Error: " + err.toString()
    })));
  }
}