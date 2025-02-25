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
import { Star, Plus } from "lucide-react"
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
        <main className="flex flex-col justify-around min-h-screen min-w-full bg-[#563585] bg-[radial-gradient(circle_at_center,#2D1B47_10%,transparent_55%),repeating-conic-gradient(from_10deg_at_center,#2D1B47_0deg,#2D1B47_22.5deg,transparent_22.5deg,transparent_45deg)] relative overflow-hidden">

            {/* Decorative elements */}
      <div className="absolute inset-0">
        <Star className="absolute  text-yellow-400 w-8 h-8 left-[15%] top-[20%]" fill="currentColor" />
        <Star className="absolute  text-yellow-400 w-8 h-8 right-[30%] top-[25%]" fill="currentColor" />
        <Star className="absolute  text-white w-8 h-8 right-[15%] top-[35%]" fill="currentColor" />
        <Plus className="absolute  text-white w-8 h-8 left-[10%] top-[10%] opacity-50" />
        <Plus className="absolute  text-white w-8 h-8 right-[10%] bottom-[20%] opacity-50" />
      </div>
            {/* Título y descripción de la página */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white">Selecciona un Tipo de Juego</h1>
                <p className="text-gray-50 mt-2">Elige el tipo de juego que deseas configurar y comienza a jugar.</p>
            </div>

            {/* Sección de selección de juegos */}
            <section className="mb-8">
                <div className="flex flex-wrap gap-16 justify-center items-center">
                    {/* Tarjeta para el tipo de juego "Crucigrama" */}
                    <GameCard game_type={"Crucigrama"} />
                    {/* Tarjeta para el tipo de juego "Sopa de Letras" */}
                    <GameCard game_type={"Sopa de Letras"} />
                </div>
            </section>
        </main>
    );
}
