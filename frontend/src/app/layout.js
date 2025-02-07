/**
 * Componente RootLayout
 *
 * Este componente define el diseño raíz de la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido dinámico que se renderiza dentro del layout.
 * @returns {JSX.Element} - Estructura de diseño principal de la aplicación.
 */

import "@/styles/globals.css"; // Importación de estilos globales
import Footer from "@/components/footer"; // Componente Footer

// Metadatos del sitio
export const metadata = {
    title: "Gamificación - Plataforma de Aprendizaje Interactivo",
    description: "Explora nuestra plataforma de gamificación para un aprendizaje interactivo y divertido.",
    keywords: "gamificación, aprendizaje, juegos educativos, educación interactiva",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="description" content={metadata.description}/>
            <meta name="keywords" content={metadata.keywords}/>
            <link
                href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700"
                rel="stylesheet"
            />
            <title>{metadata.title}</title>
        </head>
        <body className="text-gray-900 bg-base min-h-screen flex flex-col">
        <div className="flex-grow bg-base">
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}