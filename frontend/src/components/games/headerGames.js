import CopyCard from "@/components/games/copyCard";
import { Toaster } from 'sonner';

function HeaderGames({ id, gameType }) {
    return (
        <div className="bg-[#DEC5E3] text-white py-4 w-full shadow-xl rounded-lg">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-4 px-4 sm:px-6">
                {/* Información del Juego */}
                <div className="text-center sm:text-left overflow-hidden">
                    <p className="text-lg sm:text-xl font-bold text-[#7F5C9C] truncate">
                        ID del Juego: {id}
                    </p>
                    <p className="text-xs sm:text-sm text-[#7F5C9C] truncate">
                        Tipo de Juego: {gameType}
                    </p>
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



