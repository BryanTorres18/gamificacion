import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SopaLetrasBoard({ size = 10, questions, onWordFound }) {
    const [board, setBoard] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundCells, setFoundCells] = useState([]);
    const [initializedBoard, setInitializedBoard] = useState(false);
    const [completionEffect, setCompletionEffect] = useState(false);

    // Board initialization logic permanece igual
    useEffect(() => {
        if (!initializedBoard) {
            const generateBoard = () => {
                const board = Array(size)
                    .fill(null)
                    .map(() => Array(size).fill(""));

                const directions = [
                    [0, 1],
                    [1, 0],
                    [1, 1],
                ];

                const canPlaceWord = (word, row, col, direction) => {
                    const [dx, dy] = direction;
                    for (let i = 0; i < word.length; i++) {
                        const x = row + i * dx;
                        const y = col + i * dy;
                        if (x >= size || y >= size || board[x][y] !== "") return false;
                    }
                    return true;
                };

                const placeWord = (word, row, col, direction) => {
                    const [dx, dy] = direction;
                    for (let i = 0; i < word.length; i++) {
                        const x = row + i * dx;
                        const y = col + i * dy;
                        board[x][y] = word[i];
                    }
                };

                for (const q of questions) {
                    const word = q.answer;
                    let placed = false;

                    while (!placed) {
                        const row = Math.floor(Math.random() * size);
                        const col = Math.floor(Math.random() * size);
                        const direction =
                            directions[Math.floor(Math.random() * directions.length)];

                        if (canPlaceWord(word, row, col, direction)) {
                            placeWord(word, row, col, direction);
                            placed = true;
                        }
                    }
                }

                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (board[i][j] === "") {
                            board[i][j] =
                                String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        }
                    }
                }

                return board;
            };

            setBoard(generateBoard());
            setInitializedBoard(true);
        }
    }, [size, initializedBoard]);

    const handleCellClick = (row, col) => {
        if (foundCells.some(cell => cell.row === row && cell.col === col)) {
            return;
        }

        const cellExists = selectedCells.some(
            (cell) => cell.row === row && cell.col === col
        );

        if (cellExists) {
            setSelectedCells((prev) =>
                prev.filter((cell) => cell.row !== row || cell.col !== col)
            );
        } else {
            const updatedCells = [...selectedCells, { row, col }];
            setSelectedCells(updatedCells);

            const selectedWord = updatedCells
                .sort((a, b) => a.row - b.row || a.col - b.col)
                .map((cell) => board[cell.row][cell.col])
                .join("");

            const foundQuestion = questions.find((q) => q.answer === selectedWord);

            if (foundQuestion) {
                setFoundCells((prev) => [...prev, ...updatedCells]);
                onWordFound(foundQuestion.answer);
                setSelectedCells([]);

                // Trigger completion effect
                setCompletionEffect(true);
                setTimeout(() => setCompletionEffect(false), 1000);
            }
        }
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Contenedor responsivo */}
            <div className="aspect-square w-full">
                <div className=" p-4 rounded-lg relative overflow-auto">
                    {/* Tablero */}
                    <motion.div
                        className="bg-[#7F5C9C] p-4 sm:p-6 md:p-8 rounded-2xl grid gap-1"
                        style={{
                            gridTemplateColumns: `repeat(${size}, minmax(20px, 1fr))`, // Ajusta las columnas dinámicamente
                            minWidth: `${size * 40}px`, // Asegura que el fondo azul abarque el ancho total
                            minHeight: `${size * 40}px`, // Asegura que el fondo azul abarque la altura total
                        }}
                        animate={completionEffect ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => {
                                const isSelected = selectedCells.some(
                                    (s) => s.row === rowIndex && s.col === colIndex
                                );
                                const isFound = foundCells.some(
                                    (f) => f.row === rowIndex && f.col === colIndex
                                );

                                return (
                                    <motion.div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`aspect-square flex items-center justify-center
                                    text-xl sm:text-xl font-bold rounded cursor-pointer select-none
                                    ${
                                            isFound
                                                ? "bg-[#341D47] text-white shadow-md"
                                                : isSelected
                                                    ? "bg-[#DEC5E3] shadow-md transform -translate-y-0.5"
                                                    : "bg-white hover:bg-gray-50"
                                        }`}
                                        whileHover={!isFound ? { scale: 1.05 } : {}}
                                        whileTap={!isFound ? { scale: 0.95 } : {}}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        initial={isFound ? { scale: 1 } : { scale: 0.8 }}
                                        animate={isFound ? { scale: [1.2, 1] } : { scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {cell}
                                    </motion.div>
                                );
                            })
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );

}


