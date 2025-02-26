"use client";

// Importación del hook useRouter de Next.js para la navegación entre páginas.
import { useRouter } from "next/navigation";
import Image from "next/image";

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
            className="z-[1] block border-4 border-[#6f00a8] rounded-3xl shadow-md p-4 bg-purple-900 hover:bg-[#dec5e3] transition cursor-pointer"
        >

            <Image
                src="/placeholder.svg?height=250&width=250"
                alt={`${game_type} thumbnail`}
                width={250}
                height={250}
                className="rounded-lg mb-4 aspect-square"
            />
            {/* Título de la tarjeta con el tipo de juego */}
            <h2 className="text-lg font-semibold mb-2 text-white">{game_type}</h2>

            {/* Descripción debajo del título */}
            <p className="text-sm text-white">
                Haz clic para configurar un {game_type}
            </p>
        </div>
    );
}

