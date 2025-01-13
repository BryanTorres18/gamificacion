"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/sopa_letras.module.css";

export default function SopaLetras() {
    const [board, setBoard] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [foundCells, setFoundCells] = useState([]);

    useEffect(() => {
        const generatedData = generateSopaLetras();
        setBoard(generatedData.board);
        setQuestions(generatedData.questions);
    }, []);

    const generateSopaLetras = () => {
        const questions = [
            { question: "Animal que ladra", answer: "PERRO" },
            { question: "Color del cielo", answer: "AZUL" },
            { question: "Ave que vuela", answer: "PAJARO" },
            { question: "Rey de la selva", answer: "LEON" },
            { question: "Elemento líquido", answer: "AGUA" },
        ];

        const size = 10;
        const board = Array(size)
            .fill(null)
            .map(() => Array(size).fill(""));

        const directions = [
            [0, 1], // Horizontal derecha
            [1, 0], // Vertical abajo
            [1, 1], // Diagonal derecha abajo
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
                const direction = directions[Math.floor(Math.random() * directions.length)];

                if (canPlaceWord(word, row, col, direction)) {
                    placeWord(word, row, col, direction);
                    placed = true;
                }
            }
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] === "") {
                    board[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }

        return { board, questions };
    };

    const handleCellClick = (row, col) => {
        const cellExists = selectedCells.some(
            (cell) => cell.row === row && cell.col === col
        );

        if (cellExists) {
            // Si la celda ya está seleccionada, desmarcarla
            setSelectedCells((prevCells) =>
                prevCells.filter((cell) => cell.row !== row || cell.col !== col)
            );
        } else {
            // Si la celda no está seleccionada, marcarla
            const updatedCells = [...selectedCells, { row, col }];
            setSelectedCells(updatedCells);

            // Detectar la palabra automáticamente
            checkWord(updatedCells);
        }
    };

    const checkWord = (updatedCells) => {
        const selectedWord = updatedCells
            .sort((a, b) => (a.row - b.row) || (a.col - b.col))
            .map((cell) => board[cell.row][cell.col])
            .join("");

        const foundQuestion = questions.find(
            (q) => q.answer === selectedWord && !foundWords.includes(selectedWord)
        );

        if (foundQuestion) {
            // Añadir palabra encontrada
            setFoundWords((prevWords) => [...prevWords, selectedWord]);

            // Bloquear y colorear todas las celdas de la palabra
            const newFoundCells = [...foundCells, ...updatedCells];
            setFoundCells(newFoundCells);

            alert(`¡Encontraste la palabra "${selectedWord}"!`);

            // Vaciar la selección
            setSelectedCells([]);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>#JUEGO: #ID:000000</h1>
            </header>
            <main className={styles.mainContainer}>
                <section className={styles.gameArea}>
                    <h2>Área de Juego</h2>
                    <div className={styles.boardContainer}>
                        <div className={styles.board}>
                            {board.map((row, rowIndex) =>
                                row.map((cell, colIndex) => {
                                    const isSelected = selectedCells.some(
                                        (selected) => selected.row === rowIndex && selected.col === colIndex
                                    );
                                    const isFound = foundCells.some(
                                        (found) => found.row === rowIndex && found.col === colIndex
                                    );

                                    return (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`${styles.cell} ${isSelected ? styles.selected : ""} ${
                                                isFound ? styles.found : ""
                                            }`}
                                            data-row={rowIndex}
                                            data-col={colIndex}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                        >
                                            {cell}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </section>
                <aside className={styles.scoreSidebar}>
                    <h2>Puntuación</h2>
                    <ul>
                        {questions.map((q, index) => (
                            <li
                                key={index}
                                style={{
                                    textDecoration: foundWords.includes(q.answer)
                                        ? "line-through"
                                        : "none",
                                    color: foundWords.includes(q.answer) ? "gray" : "black",
                                }}
                            >
                                {q.question}
                            </li>
                        ))}
                    </ul>
                </aside>
            </main>
            <footer className={styles.footer}>
                &copy; 2025 Gamificación. Todos los derechos reservados.
            </footer>
        </div>
    );
}








