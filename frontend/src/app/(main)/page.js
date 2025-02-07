/**
 * Página principal (IndexPage)
 *
 * Esta página presenta la interfaz principal donde el usuario puede seleccionar
 * el tipo de juego que desea configurar. Utiliza el componente `GameCard` para
 * mostrar las opciones disponibles.
 *
 * @returns {JSX.Element} - Interfaz principal con opciones de selección de juegos.
 */

import GameCard from "@/components/game_card"; // Importación del componente GameCard

// Metadatos para SEO
export const metadata = {
    title: "Inicio - Gamificación",
    description: "Selecciona el tipo de juego que deseas configurar en nuestra plataforma de gamificación.",
    keywords: "gamificación, juegos educativos, crucigrama, sopa de letras",
};

export default function IndexPage() {
    return (
        /**
         * Sección principal de la página
         * - Contiene un título y una cuadrícula con las tarjetas de selección de juegos.
         */
        <main className="container mx-auto p-4">
            {/* Título y descripción de la página */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Selecciona un Tipo de Juego</h1>
                <p className="text-gray-600 mt-2">Elige el tipo de juego que deseas configurar y comienza a jugar.</p>
            </div>

            {/* Sección de selección de juegos */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {/* Tarjeta para el tipo de juego "Crucigrama" */}
                    <GameCard game_type={"Crucigrama"} />
                    {/* Tarjeta para el tipo de juego "Sopa de Letras" */}
                    <GameCard game_type={"Sopa de Letras"} />
                </div>
            </section>
        </main>
    );
}
