"use client";

// Importación del hook useRouter de Next.js para la navegación entre páginas.
import { useRouter } from "next/navigation";

/**
 * Componente funcional GameCard
 *
 * Este componente representa una tarjeta que permite al usuario navegar
 * hacia la página de configuración de un juego específico basado en el tipo de juego seleccionado.
 *
 * @param {Object} props - Las propiedades recibidas por el componente.
 * @param {string} props.game_type - El tipo de juego que se mostrará en la tarjeta
 *                                    (por ejemplo, "Crucigrama", "Sopa de letras").
 * @returns {JSX.Element} - Una tarjeta interactiva con información sobre el tipo de juego.
 */
export default function GameCard({ game_type }) {
    // Hook para manejar la navegación dentro de la aplicación.
    const router = useRouter();

    /**
     * handleNavigation
     *
     * Función para manejar el evento de clic en la tarjeta. Redirige al usuario
     * a la página de configuración del juego correspondiente.
     */
    const handleNavigation = () => {
        router.push(`/create?game_type=${game_type}`);
    };

    return (
        // Tarjeta principal con estilos y evento onClick para navegación.
        <div
            onClick={handleNavigation} // Navega al hacer clic en la tarjeta.
            className="block border rounded-lg shadow-md p-4 hover:bg-gray-200 transition cursor-pointer"
        >
            {/* Título de la tarjeta con el tipo de juego */}
            <h2 className="text-lg font-semibold mb-2">{game_type}</h2>

            {/* Descripción debajo del título */}
            <p className="text-sm text-gray-700">
                Haz clic para configurar un {game_type}
            </p>
        </div>
    );
}

