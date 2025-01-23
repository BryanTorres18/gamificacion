import CopyCard from "@/components/games/copyCard";

function HeaderGames({ id, gameType }) {
    return (
        <nav className="bg-gray-700 text-white py-2 top-0 left-0 z-50 w-full shadow-lg fixed">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-4">
                <div className="p-4">
                    <p className="text-left text-xl font-bold">ID del Juego: {id}</p>
                    <p className="text-left text-sm">Tipo de Juego: {gameType}</p>
                </div>
                <div className="flex justify-end">
                    <CopyCard />
                </div>
            </div>
        </nav>
    );
}

export default HeaderGames;



