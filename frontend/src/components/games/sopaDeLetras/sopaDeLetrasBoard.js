"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/sopa_letras.module.css";

export default function SopaLetrasBoard({ questions, onWordFound }) {
    const [board, setBoard] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundCells, setFoundCells] = useState([]);

    // Inicialización del tablero
    useEffect(() => {
        const generateBoard = () => {
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

            return board;
        };

        setBoard(generateBoard());
    }, []); // Solo se genera una vez, al montar el componente

    const handleCellClick = (row, col) => {
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
                .sort((a, b) => (a.row - b.row) || (a.col - b.col))
                .map((cell) => board[cell.row][cell.col])
                .join("");

            const foundQuestion = questions.find(
                (q) => q.answer === selectedWord
            );

            if (foundQuestion) {
                setFoundCells((prev) => [...prev, ...updatedCells]);
                onWordFound(foundQuestion.answer);
                setSelectedCells([]);
            }
        }
    };

    return (
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
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell}
                        </div>
                    );
                })
            )}
        </div>
    );
}

