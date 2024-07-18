function parseMatrix(matrixId) {
    const matrix = [];
    const matrixDiv = document.getElementById(matrixId);
    const rows = matrixDiv.getElementsByClassName('matrix-row');

    for (let row of rows) {
        const cols = row.getElementsByClassName('matrix-col');
        const rowArray = [];
        for (let col of cols) {
            rowArray.push(Number(col.value));
        }
        matrix.push(rowArray);
    }
    return matrix;
}

function formatMatrix(matrix) {
    return matrix.map(row => row.join(' ')).join('\n');
}

function setMatrixDimensions() {
    const rowsA = document.getElementById('rowsA').value;
    const colsA = document.getElementById('colsA').value;
    const rowsB = document.getElementById('rowsB').value;
    const colsB = document.getElementById('colsB').value;

    if (rowsA && colsA && rowsB && colsB) {
        document.getElementById('matrix-dimensions').style.display = 'none';
        document.getElementById('matrix-inputs').style.display = 'block';
        document.querySelector('.operations').style.display = 'block';
        document.querySelector('.result').style.display = 'block';

        createMatrixInputs('matrixA', rowsA, colsA);
        createMatrixInputs('matrixB', rowsB, colsB);
    } else {
        alert("Por favor, defina todas as dimensões das matrizes.");
    }
}

function createMatrixInputs(matrixId, rows, cols) {
    const matrixDiv = document.getElementById(matrixId);
    matrixDiv.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';

        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-col';
            rowDiv.appendChild(input);
        }

        matrixDiv.appendChild(rowDiv);
    }
}

function addMatrices() {
    const matrixA = parseMatrix('matrixA');
    const matrixB = parseMatrix('matrixB');

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("As matrizes devem ter o mesmo tamanho para serem somadas.");
        return;
    }

    const result = matrixA.map((row, i) =>
        row.map((val, j) => val + matrixB[i][j])
    );

    document.getElementById('result').innerText = formatMatrix(result);
}

function subtractMatrices() {
    const matrixA = parseMatrix('matrixA');
    const matrixB = parseMatrix('matrixB');

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("As matrizes devem ter o mesmo tamanho para serem subtraídas.");
        return;
    }

    const result = matrixA.map((row, i) =>
        row.map((val, j) => val - matrixB[i][j])
    );

    document.getElementById('result').innerText = formatMatrix(result);
}

function multiplyMatrices() {
    const matrixA = parseMatrix('matrixA');
    const matrixB = parseMatrix('matrixB');

    if (matrixA[0].length !== matrixB.length) {
        alert("O número de colunas da Matriz A deve ser igual ao número de linhas da Matriz B para multiplicação.");
        return;
    }

    const result = matrixA.map(row =>
        matrixB[0].map((_, colIndex) =>
            row.reduce((sum, val, rowIndex) => sum + val * matrixB[rowIndex][colIndex], 0)
        )
    );

    document.getElementById('result').innerText = formatMatrix(result);
}

function transposeMatrixA() {
    const matrixA = parseMatrix('matrixA');
    const result = matrixA[0].map((_, colIndex) => matrixA.map(row => row[colIndex]));

    document.getElementById('result').innerText = formatMatrix(result);
}

function transposeMatrixB() {
    const matrixB = parseMatrix('matrixB');
    const result = matrixB[0].map((_, colIndex) => matrixB.map(row => row[colIndex]));

    document.getElementById('result').innerText = formatMatrix(result);
}

function goBackToStart() {
    document.getElementById('matrix-dimensions').style.display = 'block';
    document.getElementById('matrix-inputs').style.display = 'none';
    document.querySelector('.operations').style.display = 'none';
    document.querySelector('.result').style.display = 'none';
    document.getElementById('result').innerText = '';
}
