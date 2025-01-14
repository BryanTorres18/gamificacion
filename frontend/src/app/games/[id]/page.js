"use client";

import { useEffect, useState } from "react";
import SopaLetrasBoard from "@/components/games/sopaDeLetras/sopaDeLetrasBoard";
import QuestionList from "@/components/games/questionsList";
import HeaderGames from "@/components/games/headerGames";

export default function GamePage({ params }) {
    const [id, setId] = useState(null); // Estado para almacenar el ID
    const [game, setGame] = useState(null);
    const [foundWords, setFoundWords] = useState([]);

    // Manejo asíncrono de params
    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/games/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setGame(data);
                    } else {
                        console.error("Error al cargar el juego");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchGame();
        }
    }, [id]);

    const handleWordFound = (word) => {
        setFoundWords((prev) => [...prev, word]);
    };

    if (!game) {
        return <div>Cargando juego...</div>;
    }

    return (
        <section className="flex flex-col min-h-screen relative">
            <HeaderGames id={id} gameType={game.game_type}/>
            <div className="flex-grow pt-20 px-4">
                {game.game_type === "Sopa de Letras" && (
                    <div className="flex justify-between flex-grow px-4 py-8 bg-blue-100">
                        <SopaLetrasBoard
                            questions={Object.entries(game.data).map(([question, answer]) => ({
                                question,
                                answer,
                            }))}
                            onWordFound={handleWordFound}
                        />
                        <QuestionList
                            questions={Object.entries(game.data).map(([question, answer]) => ({
                                question,
                                answer,
                            }))}
                            foundWords={foundWords}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

