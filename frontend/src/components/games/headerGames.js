import CopyCard from "@/components/games/copyCard";

function HeaderGames({ id, gameType }) {
    return (
        <nav className="bg-gray-700 text-white py-2 fixed top-0 left-0 z-50 w-full">
            <div className="w-full grid grid-cols-[3fr_2fr] items-center gap-x-4 px-4">
                {/* Información del juego */}
                <div className="p-4 rounded-md">
                    <p className="text-left text-xl font-bold">ID del Juego: {id}</p>
                    <p className="text-left text-sm">Tipo de Juego: {gameType}</p>
                </div>
                {/* Componente para copiar enlace */}
                <CopyCard />
            </div>
        </nav>
    );
}

export default HeaderGames;


