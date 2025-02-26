import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CrucigramaBoard = ({ gameData }) => {
    const [grid, setGrid] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [wordPositions] = useState(new Map());
    const [wordRegistry] = useState(new Map());
    const [completedWords, setCompletedWords] = useState(new Set());
    const [questionNumbers, setQuestionNumbers] = useState(new Map());
    const [showQuestions, setShowQuestions] = useState(true);
    const [gridSize, setGridSize] = useState(18);
    const [cellSize, setCellSize] = useState(30);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) { // mobile
                setCellSize(20);
            } else if (width < 1024) { // tablet
                setCellSize(25);
            } else { // desktop
                setCellSize(30);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    // Variantes para las celdas del crucigrama
    const cellVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    // Variantes para las preguntas
    const questionVariants = {
        hidden: {
            x: -20,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 12,
                mass: 0.8
            }
        },
        hover: {
            x: 8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    // Mejoramos las variantes para las secciones de preguntas
    const sectionVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                mass: 1,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

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
        return questions.some(q => completedWords.has(q));
    };

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const cell = newGrid[rowIndex][colIndex];

        if (!cell) return;

        // Verificar si alguna de las palabras que contienen esta celda está completada
        const cellQuestions = cell.question.split(',');
        const isInCompletedWord = cellQuestions.some(q => completedWords.has(q));

        if (isInCompletedWord) {
            return; // No permitir cambios en celdas de palabras completadas
        }

        newGrid[rowIndex][colIndex] = {
            ...cell,
            userValue: value.toUpperCase()
        };

        setGrid(newGrid);
        checkWordCompletion(newGrid);
    };

    const checkWordCompletion = (currentGrid) => {
        const newCompletedWords = new Set(completedWords);
        let changed = false;

        questions.forEach(({ question, answer }) => {
            const cells = wordRegistry.get(question);
            if (!cells) return;

            const currentWord = cells
                .map(({ row, col }) => currentGrid[row][col]?.userValue || '')
                .join('');

            if (currentWord === answer.toUpperCase()) {
                if (!completedWords.has(question)) {
                    newCompletedWords.add(question);
                    changed = true;
                }
            } else {
                if (completedWords.has(question)) {
                    newCompletedWords.delete(question);
                    changed = true;
                }
            }
        });

        if (changed) {
            setCompletedWords(newCompletedWords);
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

    const getNumberPosition = (rowIndex, colIndex, direction) => {
        // Verificar si hay números en ambas direcciones
        const horizontalNumber = direction === "horizontal";
        const hasIntersection = grid[rowIndex][colIndex].question.split(',').length > 1;

        if (hasIntersection) {
            // Si es una intersección, ajustar posición según la dirección
            if (horizontalNumber) {
                return "absolute -right-2 -top-2";
            } else {
                return "absolute -left-2 -top-2";
            }
        }

        // Si no hay intersección, mantener la posición original
        return "absolute -left-2 -top-2";
    };

    useEffect(() => {
        if (gameData?.questions) {
            placeWordsCrossed(gameData.questions);
        }
    }, [gameData]);

    return (
        <motion.div
            className="w-full max-w-7xl mx-auto p-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Panel del Crucigrama */}
                <motion.div
                    className="flex-1 p-6"
                    variants={containerVariants}
                >
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <motion.div
                                className="grid gap-0 relative z-10"
                                style={{
                                    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                                    width: `${gridSize * cellSize}px`
                                }}
                                variants={containerVariants}
                            >
                                {grid.map((row, rowIndex) => (
                                    row.map((cell, colIndex) => {
                                        const isCompleted = cell && isCellFromCompletedWord(rowIndex, colIndex, grid);
                                        const position = cell && wordPositions.get(cell.question?.split(',')[0]);
                                        const wordNumber = isStartOfWord(rowIndex, colIndex, grid);

                                        return (
                                            <motion.div
                                                key={`${rowIndex}-${colIndex}`}
                                                className="relative"
                                                style={{
                                                    width: cellSize,
                                                    height: cellSize
                                                }}
                                                variants={cellVariants}
                                                whileHover={cell ? {scale: 1.1, zIndex: 20} : {}}
                                                whileTap={cell ? {scale: 0.95} : {}}
                                            >
                                                {cell && (
                                                    <motion.div
                                                        className={`
                                                            absolute 
                                                            inset-0
                                                            border-2
                                                            border-black
                                                            transition-all
                                                            duration-300
                                                            ${isCompleted
                                                            ? 'bg-blue-500'
                                                            : cell.userValue
                                                                ? 'bg-blue-200'
                                                                : 'bg-yellow-200'}
                                                        `}
                                                        animate={isCompleted ? {
                                                            scale: [1, 1.1, 1],
                                                            backgroundColor: ["#93C5FD", "#3B82F6", "#93C5FD"],
                                                        } : {}}
                                                    >
                                                        {wordNumber && cell.question.split(',').map((q, index) => {
                                                            const pos = wordPositions.get(q);
                                                            if (pos?.startRow === rowIndex && pos?.startCol === colIndex) {
                                                                return (
                                                                    <div
                                                                        key={q}
                                                                        className={`${getNumberPosition(rowIndex, colIndex, pos.direction)} w-5 h-5 bg-black rounded-full flex items-center justify-center z-10`}
                                                                    >
                                                                        <span className="text-xs font-bold text-white">
                                                                            {questionNumbers.get(q)}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                        <input
                                                            type="text"
                                                            maxLength={1}
                                                            value={cell.userValue || ''}
                                                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                                            className={`
                                                                w-full 
                                                                h-full
                                                                text-center
                                                                font-bold
                                                                text-lg
                                                                uppercase
                                                                outline-none
                                                                transition-colors
                                                                duration-300
                                                                ${isCompleted
                                                                ? 'bg-blue-500 text-white'
                                                                : cell.userValue
                                                                    ? 'bg-blue-200 text-black'
                                                                    : 'bg-yellow-200 text-black'}
                                                            `}
                                                            disabled={isCompleted}
                                                        />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        );
                                    })
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel de Preguntas */}
                <motion.div
                    className="lg:w-96"
                    variants={containerVariants}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 space-y-8"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Verticales */}
                        <motion.div variants={sectionVariants}>
                            <motion.h2
                                className="text-3xl font-bold mb-4 text-purple-600"
                                variants={questionVariants}
                            >
                                Vertical
                            </motion.h2>
                            <motion.div
                                className="space-y-3"
                                variants={sectionVariants}
                            >
                                <AnimatePresence>
                                    {questions
                                        .filter(({question}) => wordPositions.get(question)?.direction === "vertical")
                                        .map(({question}) => (
                                            <motion.div
                                                key={question}
                                                className={`
                                        p-4 
                                        rounded-lg 
                                        border
                                        shadow-lg
                                        transition-all 
                                        duration-300
                                        ${completedWords.has(question)
                                                    ? 'bg-[#DEC5E3] border-[#7F5C9C]'
                                                    : 'bg-white border-gray-200 hover:border-purple-300'}
                                    `}
                                                variants={questionVariants}
                                                initial="hidden"
                                                animate="visible"
                                                whileHover="hover"
                                                whileTap="tap"
                                                layout
                                            >
                                                <motion.p
                                                    className="text-gray-700"
                                                    layout
                                                >
                                                    <motion.span
                                                        className="inline-flex items-center justify-center w-5 h-5 bg-black rounded-full text-white text-xs font-bold mr-2"
                                                        layout
                                                    >
                                                        {questionNumbers.get(question)}
                                                    </motion.span>
                                                    {question}
                                                </motion.p>
                                            </motion.div>
                                        ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>

                        {/* Horizontales - mismo patrón que Verticales */}
                        <motion.div variants={sectionVariants}>
                            <motion.h2
                                className="text-3xl font-bold mb-4 text-purple-600"
                                variants={questionVariants}
                            >
                                Horizontal
                            </motion.h2>
                            <motion.div
                                className="space-y-3"
                                variants={sectionVariants}
                            >
                                <AnimatePresence>
                                    {questions
                                        .filter(({question}) => wordPositions.get(question)?.direction === "horizontal")
                                        .map(({question}) => (
                                            <motion.div
                                                key={question}
                                                className={`
                                        p-4 
                                        rounded-lg 
                                        border
                                        shadow-lg
                                        transition-all 
                                        duration-300
                                        ${completedWords.has(question)
                                                    ? 'bg-[#DEC5E3] border-[#7F5C9C]'
                                                    : 'bg-white border-gray-200 hover:border-purple-300'}
                                    `}
                                                variants={questionVariants}
                                                initial="hidden"
                                                animate="visible"
                                                whileHover="hover"
                                                whileTap="tap"
                                                layout
                                            >
                                                <motion.p
                                                    className="text-gray-700"
                                                    layout
                                                >
                                                    <motion.span
                                                        className="inline-flex items-center justify-center w-5 h-5 bg-black rounded-full text-white text-xs font-bold mr-2"
                                                        layout
                                                    >
                                                        {questionNumbers.get(question)}
                                                    </motion.span>
                                                    {question}
                                                </motion.p>
                                            </motion.div>
                                        ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CrucigramaBoard;