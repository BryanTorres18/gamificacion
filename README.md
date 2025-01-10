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

## **Instalación del Frontend**

### **Requisitos Previos**
Antes de comenzar, asegúrate de tener instalado:

- **Python 3.10** o superior
- Una cuenta de Google Cloud configurada con Firestore habilitado
- Un archivo de credenciales JSON descargado desde Google Cloud
- pip para la gestión de paquetes
- **Node.js y npm** (necesarios para Tailwind CSS)

---

### **Pasos para Configurar el Frontend**

1. **Clonar el Repositorio**

   Clona el repositorio en tu máquina local y navega a la carpeta `frontend`:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio/frontend

2. **Crear y Activar un Entorno Virtual**

   - **Para Windows**:
     ```bash
     python -m venv env
     env\Scripts\activate
     ```
   - **Para Mac/Linux**:
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```

3. **Instalar Django**

   Con el entorno virtual activado, instala Django:
   ```bash
   pip install django
   
### **Configuración de Tailwind CSS**

1. **Inicializar npm**

   En la carpeta principal del frontend, inicializa un proyecto npm:
   ```bash
   npm init -y

2. **Instalar Tailwind CSS y Dependencias**

    Instala Tailwind CSS junto con sus dependencias PostCSS y Autoprefixer:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
   
3. **Crear el Archivo de Configuración de Tailwind**

    Genera el archivo tailwind.config.js con el siguiente comando:
    ```bash
    npx tailwindcss init
   
4. **Configurar el Archivo `tailwind.config.js`**

   Edita el archivo generado `tailwind.config.js` y ajusta las rutas para que Tailwind pueda procesar tus plantillas HTML:

   ```javascript
   module.exports = {
       content: [
           './src/templates/**/*.html',  // Rutas de las plantillas HTML
       ],
       theme: {
           extend: {},  // Configuración adicional opcional
       },
       plugins: [],  // Puedes agregar plugins si es necesario
   };

5. **Crear el Archivo CSS Principal**

   Crea un archivo llamado `style.css` dentro de la carpeta `static/css` y agrega las directivas principales de Tailwind CSS:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

## **Pasos para configurar el Backend**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-proyecto.git
   cd tu-proyecto

2. Crea un entorno virtual
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/MacOS
    venv\Scripts\activate     # Windows

3. Instalar las dependencias
    ```bash
    pip install -r requirements.txt

4. Configurar las variables de entorno
    - Crea un archivo .env en `backend/` con el siguiente contenido:
    
    ```
    GOOGLE_APPLICATION_CREDENTIALS=gamificacion-credencial.json
    ```
5. Ejecutar el servidor
    ```bash
    uvicorn main:app --reload

6. Acceder a la documentacion interactiva

    - Abrir navegador y visitar: http://127.0.0.1:8000/docs
    

