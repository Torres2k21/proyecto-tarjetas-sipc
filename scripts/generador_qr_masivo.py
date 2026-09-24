import os
import pandas as pd
import qrcode

# 1. URL de la web donde se aloja el index.html (cambia la dominio si usas GitHub Pages)
DOMINIO_WEB = "http://127.0.0.1:5500/public/index.html?id="

# 2. Nombre exacto de la base de datos descargada de Google Drive
EXCEL_PATH = "SISTEMA SIPC ETIQ.CELESTE RAICA AL 31.12.2025 PARA INICIAR INVENT.2025.xlsx"
OUTPUT_DIR = "./qrs_generados"

# Crear carpeta de salida si no existe
os.makedirs(OUTPUT_DIR, exist_ok=True)

try:
    print("Leyendo la base de datos de Google Drive...")
    # Cargar la hoja donde se encuentran los ambientes y sus códigos
    df = pd.read_excel(EXCEL_PATH, sheet_name="Exportar Hoja de Trabajo")
    
    # Filtrar códigos únicos de ambiente (CODAMB) para no duplicar QRs
    ambientes = df['CODAMB'].dropna().unique()
    print(f"Se encontraron {len(ambientes)} ambientes únicos en el Hospital I Félix Torrealva Gutiérrez.")

    for i, cod_amb in enumerate(ambientes, 1):
        cod_clean = str(cod_amb).strip()
        target_url = f"{DOMINIO_WEB}{cod_clean}"
        
        # Crear la estructura gráfica del QR
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=2,
        )
        qr.add_data(target_url)
        qr.make(fit=True)

        # Generar imagen en blanco y negro
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Guardar imagen PNG etiquetada con el código del ambiente
        img_path = os.path.join(OUTPUT_DIR, f"{cod_clean}.png")
        img.save(img_path)
        
        if i % 50 == 0:
            print(f"Progreso: {i}/{len(ambientes)} imágenes QR generadas...")

    print(f"\n¡Proceso completado! Los códigos QR se guardaron en: {os.path.abspath(OUTPUT_DIR)}")

except Exception as e:
    print(f"\nError durante la ejecución: {e}")