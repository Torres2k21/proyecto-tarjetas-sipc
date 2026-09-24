import os
import pandas as pd
import qrcode

# Dominio público asignado por GitHub Pages
DOMINIO_WEB = "https://TU-USUARIO.github.io/TU-REPOSiTORIO/?id="
EXCEL_PATH = "SISTEMA SIPC ETIQ.CELESTE RAICA AL 31.12.2025 PARA INICIAR INVENT.2025.xlsx"
OUTPUT_DIR = "./qrs_generados"

os.makedirs(OUTPUT_DIR, exist_ok=True)

try:
    df = pd.read_excel(EXCEL_PATH, sheet_name="Exportar Hoja de Trabajo")
    ambientes = df['CODAMB'].dropna().unique()

    print(f"Generando {len(ambientes)} códigos QR...")

    for cod_amb in ambientes:
        cod_clean = str(cod_amb).strip()
        target_url = f"{DOMINIO_WEB}{cod_clean}"
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=2,
        )
        qr.add_data(target_url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save(os.path.join(OUTPUT_DIR, f"{cod_clean}.png"))

    print(f"Proceso finalizado. Imágenes guardadas en '{OUTPUT_DIR}'.")
except Exception as e:
    print(f"Error procesando el archivo: {e}")