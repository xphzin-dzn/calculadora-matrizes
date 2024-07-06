// scripts.js

function parseMatrix(text) {
    return text.split('\n').map(row => row.trim().split(/\s+/).map(Number));
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
    } else {
        alert("Por favor, defina todas as dimensões das matrizes.");
    }
}

function addMatrices() {
    const matrixA = parseMatrix(document.getElementById('matrixA').value);
    const matrixB = parseMatrix(document.getElementById('matrixB').value);
    
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
    const matrixA = parseMatrix(document.getElementById('matrixA').value);
    const matrixB = parseMatrix(document.getElementById('matrixB').value);
    
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
    const matrixA = parseMatrix(document.getElementById('matrixA').value);
    const matrixB = parseMatrix(document.getElementById('matrixB').value);

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
    const matrixA = parseMatrix(document.getElementById('matrixA').value);
    const result = matrixA[0].map((_, colIndex) => matrixA.map(row => row[colIndex]));

    document.getElementById('result').innerText = formatMatrix(result);
}

function transposeMatrixB() {
    const matrixB = parseMatrix(document.getElementById('matrixB').value);
    const result = matrixB[0].map((_, colIndex) => matrixB.map(row => row[colIndex]));

    document.getElementById('result').innerText = formatMatrix(result);
}
