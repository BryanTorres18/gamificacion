"use client";

import { useRouter } from "next/navigation";

export default function GameCard({ game_type }) {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(`/create?game_type=${game_type}`);
    };

    return (
        <div
            onClick={handleNavigation}
            className="block border rounded-lg shadow-md p-4 hover:bg-gray-200 transition cursor-pointer"
        >
            <h2 className="text-lg font-semibold mb-2">{game_type}</h2>
            <p className="text-sm text-gray-700">
                Haz clic para configurar un {game_type}
            </p>
        </div>
    );
}
