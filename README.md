# 📚 Gamificación
Este proyecto implementa una plataforma de gamificación para reforzar el aprendizaje mediante juegos interactivos como crucigramas, sopas de letras y quizzes. Está dividido en dos partes principales: un frontend basado en Django y un backend basado en FastAPI, con Firebase como base de datos.

# 🌟 Estructura del Proyecto

gamificacion/                                                     
├── backend/               # Backend implementado con FastAPI     
│   ├── app/               # Código principal del backend         
│   │   ├── main.py        # Punto de entrada para FastAPI        
│   │   ├── models/        # Modelos de datos (Pydantic)          
│   │   ├── routes/        # Endpoints de la API                  
│   │   ├── services/      # Lógica de negocio                    
│   │   └── utils/         # Funciones auxiliares                 
│   ├── env/               # Entorno virtual para el backend      
│   ├── requirements.txt   # Dependencias del backend             
│   └── tests/             # Pruebas unitarias del backend        
├── frontend/              # Frontend implementado con Django     
│   ├── src/               # Código principal del frontend        
│   │   ├── settings.py    # Configuración de Django              
│   │   ├── urls.py        # Rutas del frontend                   
│   │   ├── templates/     # Plantillas HTML para las vistas      
│   │   ├── static/        # Archivos estáticos (CSS, JS)         
│   │   └── views.py       # Vistas de Django                     
│   ├── env/               # Entorno virtual para el frontend     
│   ├── package.json       # Dependencias para Tailwind CSS       
│   ├── postcss.config.js  # Configuración de PostCSS             
│   └── tests/             # Pruebas unitarias del frontend       
├── firebase/              # Configuración de Firebase            
│   ├── rules/             # Reglas de seguridad para Firestore   
│   └── config.json        # Archivo de configuración de Firebase 
└── README.md              # Documentación del proyecto           

