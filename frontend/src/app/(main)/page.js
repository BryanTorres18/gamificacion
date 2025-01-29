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

export default function IndexPage() {
    return (
        /**
         * Sección principal de la página
         * - Contiene un título y una cuadrícula con las tarjetas de selección de juegos.
         */
        <section>
            {/* Título principal */}
            <h1 className="text-2xl font-bold mb-4">Selecciona un Tipo de Juego</h1>

            {/* Cuadrícula con tarjetas de selección de juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {/* Tarjeta para el tipo de juego "Crucigrama" */}
                <GameCard game_type={"Crucigrama"} />
                {/* Tarjeta para el tipo de juego "Sopa de Letras" */}
                <GameCard game_type={"Sopa de Letras"} />
            </div>
        </section>
    );
}
