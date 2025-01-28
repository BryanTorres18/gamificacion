"use client";

import { useEffect, useState } from "react";
import SopaLetrasBoard from "@/components/games/sopaDeLetras/sopaDeLetrasBoard";
import QuestionList from "@/components/games/questionsList";
import HeaderGames from "@/components/games/headerGames";
import CrucigramaBoard from "@/components/games/crucigrama/crucigramaBoard";
import LoadingScreen from "@/components/games/loadingScreen";

export default function GamePage({ params }) {
    const [id, setId] = useState(null);
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
        return <LoadingScreen/>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderGames id={id} gameType={game.game_type} />
            <section className="flex flex-grow flex-col mt-[80px] sm:mt-[100px] px-4">
                <div className="flex flex-col lg:flex-row gap-8 flex-grow">
                    {game.game_type === "Sopa de Letras" && (
                        <div className="flex flex-col lg:flex-row justify-between flex-grow bg-blue-100 rounded-lg p-4">
                            {/* Tablero */}
                            <div className="flex-grow lg:w-2/3">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center w-full h-full">
                                    <SopaLetrasBoard
                                        size={game.size}
                                        questions={Object.entries(game.data).map(([question, answer]) => ({
                                            question,
                                            answer,
                                        }))}
                                        onWordFound={handleWordFound}
                                    />
                                </div>
                            </div>

                            {/* Lista de preguntas para Sopa de Letras */}
                            <div className="lg:w-1/3 lg:sticky lg:top-4 order-1 lg:order-none mt-8 lg:mt-0">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="mb-4">
                                        <div
                                            className="bg-blue-100 text-blue-800 text-center py-2 px-4 rounded-lg font-medium">
                                            Palabras
                                        </div>
                                    </div>
                                    <QuestionList
                                        questions={Object.entries(game.data)
                                            .filter(([key]) => key !== "size") // Filtra "size"
                                            .map(([question, answer]) => ({
                                                question,
                                                answer,
                                            }))}
                                        foundWords={foundWords}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {game.game_type === "Crucigrama" && (
                        <div className="flex justify-center items-center flex-grow bg-green-100 rounded-lg p-4">
                            {/* Tablero del crucigrama */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center w-full h-full">
                                <CrucigramaBoard
                                    gameData={{
                                        questions: Object.entries(game.data).map(([question, answer]) => ({
                                            question,
                                            answer,
                                        })),
                                        gridSize: game.size,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );



}

