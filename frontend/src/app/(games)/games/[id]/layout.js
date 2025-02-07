/**
 * Componente GameLayout
 *
 * Este componente define el diseño específico para la sección de juegos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido dinámico que se renderiza dentro del layout.
 * @returns {JSX.Element} - Estructura de diseño para la sección de juegos.
 */

export const metadata = {
    title: "Juegos - Gamificación",
    description: "Descubre nuestra colección de juegos educativos en la plataforma de gamificación.",
    keywords: "juegos educativos, gamificación, aprendizaje interactivo",
};

export default function GameLayout({ children }) {
    return (
        <div className="min-h-screen bg-red-200">
            <main className="min-h-screen bg-red-200">
                <div className="container mx-auto flex-grow p-4">
                    {children}
                </div>
            </main>
        </div>
    );
}