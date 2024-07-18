function setMatrixDimensions() {
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    if (rows > 3 || cols > 3) {
        alert("A matriz deve ser de no máximo 3x3 para calcular a inversa.");
        return;
    }

    document.getElementById('matrix-dimensions').style.display = 'none';
    document.getElementById('matrix-inputs').style.display = 'block';
    createMatrixInputs(rows, cols);
}

function createMatrixInputs(rows, cols) {
    const matrixDiv = document.getElementById('matrix');
    matrixDiv.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-input';
            rowDiv.appendChild(input);
        }
        matrixDiv.appendChild(rowDiv);
    }
}

function getMatrix() {
    const matrixDiv = document.getElementById('matrix');
    const rows = matrixDiv.getElementsByClassName('matrix-input').length / document.getElementById('cols').value;
    const cols = document.getElementById('cols').value;
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const value = matrixDiv.children[i].children[j].value;
            row.push(parseFloat(value));
        }
        matrix.push(row);
    }
    return matrix;
}

function calculateInverse() {
    const matrix = getMatrix();
    if (matrix.length !== matrix[0].length) {
        alert("A matriz deve ser quadrada para calcular a inversa.");
        return;
    }
    const inverse = inverseMatrix(matrix);
    displayResult(inverse);
}

function inverseMatrix(matrix) {
    const size = matrix.length;
    const identity = createIdentityMatrix(size);
    const augmented = augmentMatrix(matrix, identity);

    for (let i = 0; i < size; i++) {
        let maxRow = i;
        for (let k = i + 1; k < size; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }

        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

        const diagElement = augmented[i][i];
        for (let j = 0; j < 2 * size; j++) {
            augmented[i][j] /= diagElement;
        }

        for (let k = 0; k < size; k++) {
            if (k !== i) {
                const factor = augmented[k][i];
                for (let j = 0; j < 2 * size; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
    }

    return augmented.map(row => row.slice(size));
}

function createIdentityMatrix(size) {
    const identity = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i === j ? 1 : 0);
        }
        identity.push(row);
    }
    return identity;
}

function augmentMatrix(matrix, identity) {
    return matrix.map((row, i) => [...row, ...identity[i]]);
}

function displayResult(matrix) {
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    resultContent.innerText = matrix.map(row => row.join('\t')).join('\n');
    resultDiv.style.display = 'block';
}

function goBack() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('matrix-dimensions').style.display = 'block';
    document.getElementById('matrix-inputs').style.display = 'none';
}
