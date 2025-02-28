/**
 * Página principal (IndexPage)
 *
 * Esta página presenta la interfaz principal donde el usuario puede seleccionar
 * el tipo de juego que desea configurar. Utiliza el componente GameCard para
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
        <main className="flex flex-col justify-around min-h-screen min-w-full relative overflow-hidden">
            {/* Capa de fondo base (color púrpura sólido) */}
            <div className="absolute inset-0 bg-[#563585]"></div>

            {/* Capa de gradiente radial (estática) */}
            <div className="absolute inset-0 bg-transparent" style={{
                backgroundImage: 'radial-gradient(circle at center, #2D1B47 10%, transparent 55%)'
            }}></div>

            {/* Capa de rayos (con animación) */}
            <div className="absolute inset-0 rays-only"></div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <Star className="star text-yellow-400 w-8 h-8 left-[15%] top-[20%]" />
                <Star className="star text-yellow-400 w-8 h-8 right-[30%] top-[25%]" />
                <Star className="star text-white w-8 h-8 right-[15%] top-[35%]" />
                <Star className="star text-white w-8 h-8 left-[60%] top-[50%]" />
                <Star className="star text-white w-8 h-8 left-[80%] bottom-[40%]" />
                <Plus className="plus text-white w-8 h-8 left-[10%] top-[10%] opacity-50" />
                <Plus className="plus text-white w-8 h-8 right-[10%] bottom-[20%] opacity-50" />
                <Plus className="plus text-white w-8 h-8 left-[70%] top-[30%] opacity-50" />
            </div>

            {/* Título y descripción de la página */}
            <div className="text-center mb-8 relative z-10">
                <h1 className="text-3xl font-bold text-white">Selecciona un Tipo de Juego</h1>
                <p className="text-gray-50 mt-2">Elige el tipo de juego que deseas configurar y comienza a jugar.</p>
            </div>

            {/* Sección de selección de juegos */}
            <section className="mb-8 relative z-10">
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