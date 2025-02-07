# 📚 Gamificación
Este proyecto implementa una plataforma de gamificación para reforzar el aprendizaje mediante juegos interactivos como crucigramas, sopas de letras y quizzes. Está dividido en dos partes principales: un frontend basado en Next.js y un backend basado en FastAPI, con Firebase como base de datos.

# 🌟 Estructura del Proyecto

```bash
gamificacion/
├── backend/               # Backend implementado con FastAPI
│   ├── main.py            # Código principal del backend
│   ├── venv/              # Entorno virtual para el backend
│   ├── requirements.txt   # Dependencias del backend
│   ├── firebase/          # Configuración de Firebase
│   │   ├── gamification-40fea-firebase-adminsdk-4neas-3c59f8
│   │   └── prueba.txt
│   └── .env               # Variables de entorno
├── frontend/              # Frontend implementado con Next.js
│   ├── .next/             # Carpeta de compilación de Next.js
│   ├── node_modules/      # Dependencias de Node.js
│   ├── public/            # Archivos estáticos (imágenes, etc.)
│   ├── src/               # Código principal del frontend
│   │   ├── app/           # Rutas y páginas de la aplicación
│   │   │   ├── (games)/   # Ruta dinámica para juegos
│   │   │   │   └── [id]/  # Página dinámica para cada juego
│   │   │   │       ├── layout.js
│   │   │   │       └── page.js
│   │   │   ├── (main)/    # Ruta principal
│   │   │   │   ├── create/
│   │   │   │   │   ├── metadata.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── layout.js
│   │   │   │   └── not-found.js
│   │   ├── components/    # Componentes reutilizables
│   │   │   ├── createComponents/
│   │   │   ├── games/
│   │   │   ├── errorPage.js
│   │   │   ├── footer.js
│   │   │   └── game_card.js
│   │   ├── libs/          # Librerías y utilidades
│   │   │   └── fontawesome.js
│   │   ├── styles/        # Estilos CSS
│   │   │   ├── animations.module.css
│   │   │   ├── globals.css
│   │   │   └── sopa_letras.module.css
│   ├── eslint.config.mjs  # Configuración de ESLint
│   ├── jsconfig.json      # Configuración de JavaScript
│   ├── next.config.mjs    # Configuración de Next.js
│   ├── package.json       # Dependencias de Node.js
│   ├── package-lock.json  # Versiones exactas de las dependencias
│   ├── postcss.config.mjs # Configuración de PostCSS
│   └── tailwind.config.mjs # Configuración de Tailwind CSS
├── .gitignore             # Archivos y carpetas ignorados por Git
└── README.md              # Documentación del proyecto
```

## **Instalación del Frontend**

### **Requisitos Previos**
Antes de comenzar, asegúrate de tener instalado:

- Una cuenta de Google Cloud configurada con Firestore habilitado
- Un archivo de credenciales JSON descargado desde Google Cloud
- **Node.js y npm**

---

### **Pasos para Configurar el Frontend**

1. **Clonar el Repositorio**

   Clona el repositorio en tu máquina local y navega a la carpeta `frontend`:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio/frontend

2. **Instalar Dependencias**

   ```bash
   npm install

3. **Ejecutar el Proyecto**

   ```bash
   npm run dev

4. **Acceder a la Aplicación Abre tu navegador y visita:** http://localhost:3000

### **Descripción de la Funcionalidad**

El frontend de **Next.js** utiliza un enfoque modular para organizar componentes y páginas. Aquí hay un resumen de las carpetas más importantes:

- **`src/app`**: Contiene las rutas del proyecto. Por ejemplo:
   - **`create/`**: Página para crear juegos.
   - **`games/`**: Página para listar juegos y sus detalles.
   - **`sopa_letras/`**: Página específica para la sopa de letras.

- **`src/components`**: Componentes reutilizables como botones, formularios y layouts.

- **`src/styles`**: Archivos CSS que utilizan módulos para estilos específicos.

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
    

