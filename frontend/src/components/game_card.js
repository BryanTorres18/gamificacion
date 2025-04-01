"use client";

// Importación del hook useRouter de Next.js para la navegación entre páginas.
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GameCard({ game_type }) {
    // Hook para manejar la navegación dentro de la aplicación.
    const router = useRouter();

    /**
     * getImagePath
     *
     * Función que determina la ruta de la imagen según el tipo de juego.
     * @returns {string} Ruta de la imagen correspondiente al tipo de juego.
     */
    const getImagePath = () => {
        switch(game_type) {
            case "Crucigrama":
                return "/logos/logoCrucigrama.png";
            case "Sopa de Letras":
                return "/logos/logoSopaDeLetras.png";
            default:
                return "/placeholder.svg?height=250&width=250";
        }
    };

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
        // Contenedor principal de la tarjeta
        <div
            onClick={handleNavigation}
            className="game-card-container block border-4 border-[#6f00a8] rounded-3xl shadow-md p-4 bg-purple-900 hover:bg-[#dec5e3] transition cursor-pointer relative"
        >
            {/* Contenedor de la imagen del juego */}
            <div className="game-card-image-container mb-4 aspect-square w-full h-auto">
                <Image
                    src={getImagePath()}
                    alt={`${game_type} thumbnail`}
                    width={250}
                    height={250}
                    className="rounded-lg"
                />
            </div>

            {/* Título de la tarjeta */}
            <h2 className="text-3xl text-center font-semibold mb-2 text-white game-card-title">{game_type}</h2>

            {/* Contenedor de la animación de llamas */}
            <div className="flames-animation"></div>
        </div>
    );
}



