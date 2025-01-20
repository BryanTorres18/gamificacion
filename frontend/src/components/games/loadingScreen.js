import { PacmanLoader } from "react-spinners";
import "@/styles/animations.module.css"; // Archivo CSS para animaciones personalizadas

export default function LoadingScreen() {
    const loaderColor = "#FFD700"; // Color dorado para el Pacman

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600">
            <PacmanLoader color={loaderColor} size={60} />
            <p className="text-white text-2xl font-semibold mt-6 animated-text">
                Cargando...
            </p>
        </div>
    );
}




