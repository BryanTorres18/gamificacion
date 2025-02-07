import Link from 'next/link';
import { FontAwesomeIcon } from '@/libs/fontawesome'; // Importa FontAwesomeIcon desde tu archivo de configuración
import { faGhost } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono específico

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center bg-[#313942]">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] text-white font-semibold tracking-wider mb-4">
                4
                <span className="text-blue-400 animate-spooky">
                    <FontAwesomeIcon icon={faGhost} size="2x" /> {/* Aumenta el tamaño del ícono */}
                </span>
                4
            </h1>
            <h2 className="text-white text-2xl mb-4">Error: 404 page not found</h2>
            <p className="text-gray-400 mb-6">Sorry, the page you're looking for cannot be accessed</p>
            <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Go Back to Home
            </Link>
        </main>
    );
}



