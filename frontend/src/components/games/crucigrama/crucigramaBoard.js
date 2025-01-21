import React, { useState, useEffect } from 'react';

const CrucigramaBoard = ({ gameData }) => {
    const gridSize = 18;
    const cellSize = 30;
    const [grid, setGrid] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [wordPositions] = useState(new Map());
    const [wordRegistry] = useState(new Map());
    const [completedWords, setCompletedWords] = useState(new Set());
    const [questionNumbers, setQuestionNumbers] = useState(new Map());

    const assignQuestionNumbers = (currentGrid, positions) => {
        const numbers = new Map();
        let currentNumber = 1;

        // Ordenar las posiciones por fila y columna
        const sortedPositions = Array.from(positions.entries()).sort((a, b) => {
            const posA = a[1];
            const posB = b[1];
            if (posA.startRow === posB.startRow) {
                return posA.startCol - posB.startCol;
            }
            return posA.startRow - posB.startRow;
        });

        // Asignar números
        sortedPositions.forEach(([question]) => {
            if (!numbers.has(question)) {
                numbers.set(question, currentNumber++);
            }
        });

        setQuestionNumbers(numbers);
        return numbers;
    };

    const findRandomPosition = (word, currentGrid) => {
        const intersectionPositions = [];
        const nonIntersectionPositions = [];

        // Primero buscar todas las posibles posiciones de intersección
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (currentGrid[r][c] && currentGrid[r][c].answer) {
                    const letter = currentGrid[r][c].answer;

                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === letter) {
                            // Verificar posición horizontal
                            if (canPlaceWord(word, r, c - i, "horizontal", currentGrid, true)) {
                                intersectionPositions.push({
                                    row: r,
                                    col: c - i,
                                    direction: "horizontal",
                                    intersectionPoint: { row: r, col: c }
                                });
                            }
                            // Verificar posición vertical
                            if (canPlaceWord(word, r - i, c, "vertical", currentGrid, true)) {
                                intersectionPositions.push({
                                    row: r - i,
                                    col: c,
                                    direction: "vertical",
                                    intersectionPoint: { row: r, col: c }
                                });
                            }
                        }
                    }
                }
            }
        }

        // Si encontramos posiciones de intersección válidas, usar una de ellas
        if (intersectionPositions.length > 0) {
            // Ordenar las posiciones para favorecer las que están más cerca del centro
            const centerRow = Math.floor(gridSize / 2);
            const centerCol = Math.floor(gridSize / 2);

            intersectionPositions.sort((a, b) => {
                const distA = Math.abs(a.row - centerRow) + Math.abs(a.col - centerCol);
                const distB = Math.abs(b.row - centerRow) + Math.abs(b.col - centerCol);
                return distA - distB;
            });

            return intersectionPositions[0];
        }

        // Si no hay intersecciones, buscar posiciones no intersectadas
        const maxAttempts = 100; // Aumentado para mejor cobertura
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const row = Math.floor(Math.random() * (gridSize - word.length + 1));
            const col = Math.floor(Math.random() * (gridSize - word.length + 1));

            // Alternar entre horizontal y vertical, pero favorecer la dirección opuesta a la última palabra
            const lastDirection = getLastWordDirection(currentGrid);
            const direction = lastDirection === "horizontal" ? "vertical" : "horizontal";

            if (canPlaceWord(word, row, col, direction, currentGrid, false)) {
                nonIntersectionPositions.push({ row, col, direction });
            }
        }

        return nonIntersectionPositions.length > 0
            ? nonIntersectionPositions[Math.floor(Math.random() * nonIntersectionPositions.length)]
            : null;
    };

    const getLastWordDirection = (currentGrid) => {
        let hasHorizontal = false;
        let hasVertical = false;

        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (currentGrid[r][c]) {
                    if (c < gridSize - 1 && currentGrid[r][c + 1]) hasHorizontal = true;
                    if (r < gridSize - 1 && currentGrid[r + 1][c]) hasVertical = true;
                }
            }
        }

        return hasHorizontal && !hasVertical ? "horizontal" : "vertical";
    };

    const canPlaceWord = (word, row, col, direction, currentGrid, isIntersection) => {
        // Verificar límites del tablero
        if (direction === "horizontal" && (col < 0 || col + word.length > gridSize)) return false;
        if (direction === "vertical" && (row < 0 || row + word.length > gridSize)) return false;

        let hasValidIntersection = !isIntersection;
        let intersectionCount = 0;

        for (let i = 0; i < word.length; i++) {
            const r = direction === "horizontal" ? row : row + i;
            const c = direction === "horizontal" ? col + i : col;

            // Verificar la celda actual
            if (currentGrid[r][c]) {
                if (currentGrid[r][c].answer !== word[i]) return false;
                intersectionCount++;
                hasValidIntersection = true;
            }

            // Verificar celdas adyacentes
            if (!hasValidIntersection) {
                const adjacentOccupied = checkAdjacentCells(r, c, direction, currentGrid);
                if (adjacentOccupied) return false;
            }
        }

        // Para intersecciones, asegurar que solo hay un punto de intersección
        if (isIntersection && intersectionCount !== 1) return false;

        // Verificar que no hay palabras adyacentes en los extremos
        const beforeRow = direction === "horizontal" ? row : row - 1;
        const beforeCol = direction === "horizontal" ? col - 1 : col;
        const afterRow = direction === "horizontal" ? row : row + word.length;
        const afterCol = direction === "horizontal" ? col + word.length : col;

        if (beforeRow >= 0 && beforeCol >= 0 && currentGrid[beforeRow][beforeCol]) return false;
        if (afterRow < gridSize && afterCol < gridSize && currentGrid[afterRow][afterCol]) return false;

        return true;
    };

    const checkAdjacentCells = (row, col, direction, currentGrid) => {
        const deltas = direction === "horizontal"
            ? [[-1, 0], [1, 0]] // Verificar arriba y abajo para palabras horizontales
            : [[0, -1], [0, 1]]; // Verificar izquierda y derecha para palabras verticales

        for (const [dr, dc] of deltas) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (
                newRow >= 0 && newRow < gridSize &&
                newCol >= 0 && newCol < gridSize &&
                currentGrid[newRow][newCol]
            ) {
                return true;
            }
        }
        return false;
    };

    // El resto del código permanece igual...
    const placeWord = (word, question, row, col, direction, currentGrid) => {
        const newGrid = JSON.parse(JSON.stringify(currentGrid));

        wordPositions.set(question, {
            startRow: row,
            startCol: col,
            direction: direction,
            length: word.length
        });

        const cellsForWord = [];

        for (let i = 0; i < word.length; i++) {
            const r = direction === "horizontal" ? row : row + i;
            const c = direction === "horizontal" ? col + i : col;

            if (newGrid[r][c] && newGrid[r][c].question) {
                newGrid[r][c] = {
                    ...newGrid[r][c],
                    answer: word[i],
                    question: `${newGrid[r][c].question},${question}`
                };
            } else {
                newGrid[r][c] = {
                    answer: word[i],
                    question: question,
                    userValue: ''
                };
            }

            cellsForWord.push({ row: r, col: c });
        }

        wordRegistry.set(question, cellsForWord);
        return newGrid;
    };

    const placeWordsCrossed = (questionsData) => {
        let currentGrid = Array.from({ length: gridSize }, () =>
            Array(gridSize).fill(null)
        );

        const sortedQuestions = [...questionsData].sort((a, b) =>
            b.answer.length - a.answer.length
        );

        // Colocar primera palabra en el centro
        const firstWord = sortedQuestions[0];
        const centerRow = Math.floor(gridSize / 2);
        const centerCol = Math.floor((gridSize - firstWord.answer.length) / 2);

        currentGrid = placeWord(
            firstWord.answer.toUpperCase(),
            firstWord.question,
            centerRow,
            centerCol,
            "horizontal",
            currentGrid
        );

        // Colocar resto de palabras
        for (let i = 1; i < sortedQuestions.length; i++) {
            const { answer, question } = sortedQuestions[i];
            const position = findRandomPosition(answer.toUpperCase(), currentGrid);

            if (position) {
                currentGrid = placeWord(
                    answer.toUpperCase(),
                    question,
                    position.row,
                    position.col,
                    position.direction,
                    currentGrid
                );
            }
        }

        // Asignar números después de colocar todas las palabras
        assignQuestionNumbers(currentGrid, wordPositions);

        setGrid(currentGrid);
        setQuestions(sortedQuestions);
    };

    const isCellFromCompletedWord = (rowIndex, colIndex, currentGrid) => {
        const cell = currentGrid[rowIndex][colIndex];
        if (!cell || !cell.question) return false;
        const questions = cell.question.split(',');
        return questions.every(q => completedWords.has(q));
    };

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        if (!newGrid[rowIndex][colIndex]) return;

        // Verificar si la celda pertenece a una palabra completada
        if (isCellFromCompletedWord(rowIndex, colIndex, newGrid)) {
            return; // No permitir cambios en celdas de palabras completadas
        }

        newGrid[rowIndex][colIndex] = {
            ...newGrid[rowIndex][colIndex],
            userValue: value.toUpperCase()
        };

        setGrid(newGrid);
        checkWordCompletion(newGrid);
    };

    const checkWordCompletion = (currentGrid) => {
        const newCompletedWords = new Set(completedWords);

        questions.forEach(({ question, answer }) => {
            const cells = wordRegistry.get(question);
            if (!cells) return;

            const currentWord = cells
                .map(({ row, col }) => currentGrid[row][col]?.userValue || '')
                .join('');

            if (currentWord === answer.toUpperCase()) {
                newCompletedWords.add(question);
            } else {
                newCompletedWords.delete(question);
            }
        });

        setCompletedWords(newCompletedWords);

        if (newCompletedWords.size === questions.length) {
            console.log("¡Crucigrama completado!");
        }
    };

    const isStartOfWord = (rowIndex, colIndex, currentGrid) => {
        const cell = currentGrid[rowIndex][colIndex];
        if (!cell || !cell.question) return null;

        const questions = cell.question.split(',');
        for (const question of questions) {
            const position = wordPositions.get(question);
            if (position && position.startRow === rowIndex && position.startCol === colIndex) {
                return questionNumbers.get(question);
            }
        }
        return null;
    };

    useEffect(() => {
        if (gameData?.questions) {
            placeWordsCrossed(gameData.questions);
        }
    }, [gameData]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-row justify-between w-full gap-4">
                <div className="flex-3 bg-gray-300 p-5">
                    <div
                        className="grid gap-0"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                            width: `${gridSize * cellSize}px`
                        }}
                    >
                        {grid.map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="relative"
                                    style={{
                                        width: cellSize,
                                        height: cellSize,
                                        border: cell ? '2px solid #1a365d' : '1px solid #e2e8f0'
                                    }}
                                >
                                    {isStartOfWord(rowIndex, colIndex, grid) && (
                                        <div
                                            className="absolute left-1 top-0 text-xs z-10"
                                            style={{
                                                fontSize: '10px',
                                                lineHeight: '12px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {isStartOfWord(rowIndex, colIndex, grid)}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        maxLength={1}
                                        value={cell?.userValue || ''}
                                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                        className={`
                                            w-full 
                                            h-full
                                            text-center
                                            font-bold
                                            text-lg
                                            uppercase
                                            outline-none
                                            ${!cell ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100'}
                                            ${cell && cell.question?.split(',').some(q => completedWords.has(q))
                                            ? 'bg-green-300 text-green-900 hover:bg-green-300'
                                            : ''}
                                            ${isCellFromCompletedWord(rowIndex, colIndex, grid)
                                            ? 'cursor-not-allowed bg-green-300 text-green-900'
                                            : ''}
                                        `}
                                        style={{
                                            padding: '0',
                                            margin: '0',
                                            boxSizing: 'border-box'
                                        }}
                                        disabled={!cell || isCellFromCompletedWord(rowIndex, colIndex, grid)}
                                    />
                                </div>
                            ))
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 p-5 min-w-[300px]">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-3">Horizontales</h2>
                        <ul className="space-y-2">
                            {questions
                                .filter(({question}) => wordPositions.get(question)?.direction === "horizontal")
                                .map(({question}) => {
                                    const number = questionNumbers.get(question);
                                    return (
                                        <li
                                            key={question}
                                            className={`${completedWords.has(question)
                                                ? 'line-through text-green-900 bg-green-300 p-1 rounded'
                                                : ''}`}
                                        >
                                            {number}. {question}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Verticales</h2>
                        <ul className="space-y-2">
                            {questions
                                .filter(({question}) => wordPositions.get(question)?.direction === "vertical")
                                .map(({question}) => {
                                    const number = questionNumbers.get(question);
                                    return (
                                        <li
                                            key={question}
                                            className={`${completedWords.has(question)
                                                ? 'line-through text-green-900 bg-green-300 p-1 rounded'
                                                : ''}`}
                                        >
                                            {number}. {question}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrucigramaBoard;