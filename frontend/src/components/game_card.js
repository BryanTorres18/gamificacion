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
        <div
            onClick={handleNavigation}
            className="game-card-container block border-4 border-[#6f00a8] rounded-3xl shadow-md p-0 bg-purple-900 cursor-pointer relative w-72 h-80 overflow-hidden"
        >
            {/* Imagen de fondo */}
            <div className="relative w-full h-full">
                <Image
                    src={getImagePath()}
                    alt={`${game_type} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 250px"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Llamas animadas u otros overlays si los deseas */}
            <div className="flames-animation absolute top-0 left-0 w-full h-full pointer-events-none"></div>
        </div>
    );
}



