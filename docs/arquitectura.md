proyecto-tarjetas-sipc/
├── .github/                       # (Opcional) CI/CD o despliegues automáticos
│   └── workflows/
├── docs/                          # Documentación del proyecto
│   ├── arquitectura.md
│   └── manual_usuario.md
├── scripts/                       # Scripts auxiliares para automatizaciones
│   ├── apps_script_backend.js     # Código de Apps Script (Backend)
│   └── generador_qr_masivo.py    # Script ejecutable en Python para impresión de QRs
├── public/                        # Archivos estáticos a desplegar en GitHub Pages/Netlify/Vercel
│   ├── css/                       # Hoja de estilos (si decides separarlo de HTML)
│   │   └── styles.css
│   ├── js/                        # Archivos JavaScript cliente
│   │   ├── app.js
│   │   └── qrcode.min.js
│   ├── assets/                    # Recursos gráficos
│   │   ├── logo-essalud.png
│   │   └── favicon.ico
│   └── index.html                 # Aplicación Web Frontend (Interfaz de la Tarjeta)
├── .gitignore
├── README.md                      # Descripción del repositorio y configuración básica
└── package.json                   # Dependencias opcionales (si usas servidores Node.js)