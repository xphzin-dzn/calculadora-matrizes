let calculatorType = '';

function showCalculator(type) {
    calculatorType = type;
    document.querySelector('.menu').style.display = 'none';
    document.getElementById('calculator').style.display = 'block';
    document.getElementById('operation-button').innerText = type === 'normal' ? 'Calcular' : 'Calcular Inversa';
}

function setMatrixDimensions() {
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    if (rows && cols) {
        if (calculatorType === 'inversa' && (rows > 3 || cols > 3)) {
            alert("A matriz deve ser de no máximo 3x3 para calcular a inversa.");
            return;
        }
        document.getElementById('matrix-dimensions').style.display = 'none';
        document.getElementById('matrix-inputs').style.display = 'block';
        document.querySelector('.operations').style.display = 'block';

        createMatrixInputs('matrix', rows, cols);
    } else {
        alert("Por favor, defina todas as dimensões da matriz.");
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

function calculate() {
    const matrix = parseMatrix('matrix');
    if (calculatorType === 'normal') {
        document.getElementById('result').innerText = formatMatrix(matrix);
    } else if (calculatorType === 'inversa') {
        if (matrix.length !== matrix[0].length) {
            alert("A matriz deve ser quadrada para calcular a inversa.");
            return;
        }
        const inverse = calculateInverse(matrix);
        document.getElementById('result').innerText = formatMatrix(inverse);
    }
    document.querySelector('.result').style.display = 'block';
}

function calculateInverse(matrix) {
    const n = matrix.length;
    const identity = createIdentityMatrix(n);
    const augmentedMatrix = augmentMatrix(matrix, identity);
    return gaussJordanElimination(augmentedMatrix, n);
}

function createIdentityMatrix(n) {
    return Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );
}

function augmentMatrix(matrix, identity) {
    return matrix.map((row, i) => [...row, ...identity[i]]);
}

function gaussJordanElimination(matrix, n) {
    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }

        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

        const diagElement = matrix[i][i];
        for (let j = 0; j < 2 * n; j++) {
            matrix[i][j] /= diagElement;
        }

        for (let k = 0; k < n; k++) {
            if (k === i) continue;
            const factor = matrix[k][i];
            for (let j = 0; j < 2 * n; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }
    }

    return matrix.map(row => row.slice(n));
}

function goBackToStart() {
    document.querySelector('.menu').style.display = 'block';
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('matrix-dimensions').style.display = 'block';
    document.getElementById('matrix-inputs').style.display = 'none';
    document.querySelector('.operations').style.display = 'none';
    document.querySelector('.result').style.display = 'none';
    document.getElementById('result').innerText = '';
}
