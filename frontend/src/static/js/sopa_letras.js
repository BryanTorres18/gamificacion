// Generar la sopa de letras y las preguntas
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
        .map(() => Array(size).fill(''));

    // Funciones de ayuda
    const directions = [
        [0, 1], // Horizontal derecha
        [1, 0], // Vertical abajo
        [1, 1], // Diagonal derecha abajo
    ];

    function canPlaceWord(word, row, col, direction) {
        const [dx, dy] = direction;
        for (let i = 0; i < word.length; i++) {
            const x = row + i * dx;
            const y = col + i * dy;
            if (x >= size || y >= size || board[x][y] !== '') return false;
        }
        return true;
    }

    function placeWord(word, row, col, direction) {
        const [dx, dy] = direction;
        for (let i = 0; i < word.length; i++) {
            const x = row + i * dx;
            const y = col + i * dy;
            board[x][y] = word[i];
        }
    }

    // Colocar palabras en el tablero
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

    // Llenar celdas vacías con letras aleatorias
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === '') {
                board[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    // Renderizar tablero
    const boardElement = document.getElementById('board');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = board[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;

            boardElement.appendChild(cell);
        }
    }

    // Renderizar preguntas
    const questionsElement = document.getElementById('questions');
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.textContent = q.question;
        li.dataset.index = index;
        questionsElement.appendChild(li);
    });

    // Seleccionar y resaltar palabras
    let selectedCells = [];
    boardElement.addEventListener('click', (e) => {
        if (!e.target.classList.contains('cell')) return;

        e.target.classList.toggle('selected');
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        const cellIndex = selectedCells.findIndex((cell) => cell.row === row && cell.col === col);
        if (cellIndex === -1) {
            selectedCells.push({ row, col });
        } else {
            selectedCells.splice(cellIndex, 1);
        }

        checkWord();
    });

    function checkWord() {
        const word = selectedCells
            .sort((a, b) => (a.row - b.row) || (a.col - b.col))
            .map((cell) => board[cell.row][cell.col])
            .join('');

        const foundIndex = questions.findIndex((q) => q.answer === word);
        if (foundIndex !== -1) {
            alert(`¡Encontraste la palabra ${word}!`);
            selectedCells.forEach((cell) => {
                const cellElement = document.querySelector(
                    `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
                );
                cellElement.classList.remove('selected');
                cellElement.style.backgroundColor = 'lightgreen';
                cellElement.style.pointerEvents = 'none';
            });

            questionsElement.children[foundIndex].classList.add('found');
            selectedCells = [];
        }
    }