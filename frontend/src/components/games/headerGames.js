import CopyCard from "@/components/games/copyCard";

function HeaderGames({ id, gameType }) {
    return (
        <div className="bg-gray-700 text-white py-4 top-0 left-0 z-50 w-full shadow-lg fixed">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 items-center gap-4 px-4">
                {/* Información del Juego */}
                <div className="text-center sm:text-left">
                    <p className="text-xl font-bold">ID del Juego: {id}</p>
                    <p className="text-sm">Tipo de Juego: {gameType}</p>
                </div>

                {/* Botón de copiar */}
                <div className="flex justify-center sm:justify-end">
                    <CopyCard />
                </div>
            </div>
        </div>
    );
}

export default HeaderGames;



