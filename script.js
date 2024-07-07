function parseMatrix(matrixId) {
    const matrix = [];  // Inicializamos um array vazio para armazenar a matriz
    const matrixDiv = document.getElementById(matrixId);    // Obtém o elemento pelo ID da matriz
    const rows = matrixDiv.getElementsByClassName('matrix-row');    // Obtém todas as linhas da matriz

    for (let row of rows) { // Repete sobre cada linha da matriz
        const cols = row.getElementsByClassName('matrix-col');  // Obtém todas as colunas da linha atual
        const rowArray = [];    // Inicializamos um array para armazenar os valores da linha
        for (let col of cols) { // Repete sobre cada coluna da linha
            rowArray.push(Number(col.value));   // Converte o valor da coluna para número e adiciona ao array da linha
        }
        matrix.push(rowArray);  // Adiciona o array da linha à matriz
    }
    return matrix;  // Retorna a matriz completa
}

function formatMatrix(matrix) {
    return matrix.map(row => row.join(' ')).join('\n'); // Converte a matriz em uma string formatada com linhas separadas por quebras de linha
}

function setMatrixDimensions() {
    const rowsA = document.getElementById('rowsA').value;   // Obtém o valor do número de linhas da matriz A
    const colsA = document.getElementById('colsA').value;   // Obtém o valor do número de colunas da matriz A
    const rowsB = document.getElementById('rowsB').value;   // Obtém o valor do número de linhas da matriz B
    const colsB = document.getElementById('colsB').value;   // Obtém o valor do número de colunas da matriz B

    if (rowsA && colsA && rowsB && colsB) { // Verifica se todas as dimensões foram definidas
        document.getElementById('matrix-dimensions').style.display = 'none';    // Esconde o espaço de definição de dimensões
        document.getElementById('matrix-inputs').style.display = 'block';   // Mostra o espaço de entrada das matrizes
        document.querySelector('.operations').style.display = 'block';  // Mostra as operações disponíveis
        document.querySelector('.result').style.display = 'block';  // Mostra o espaço do resultado

        createMatrixInputs('matrixA', rowsA, colsA);    // Cria inputs para a matriz A
        createMatrixInputs('matrixB', rowsB, colsB);    // Cria inputs para a matriz B
    } else {
        alert("Por favor, defina todas as dimensões das matrizes.");    // Alerta caso alguma dimensão não tenha sido definida
    }
}

function createMatrixInputs(matrixId, rows, cols) {
    const matrixDiv = document.getElementById(matrixId);    // Obtém o elemento pelo ID da matriz
    matrixDiv.innerHTML = '';   // Limpa qualquer entrada existente

    for (let i = 0; i < rows; i++) {    // Repete pelo número de linhas
        const rowDiv = document.createElement('div');   // Cria uma nova div para a linha
        rowDiv.className = 'matrix-row';    // Define a classe CSS para a linha

        for (let j = 0; j < cols; j++) {    // Repete pelo número de colunas
            const input = document.createElement('input');  // Cria um novo input
            input.type = 'number';  // Define o tipo do input como número
            input.className = 'matrix-col'; // Define a classe CSS para a coluna
            rowDiv.appendChild(input);  // Adiciona o input à linha
        }

        matrixDiv.appendChild(rowDiv);  // Adiciona a linha à matriz
    }
}

function addMatrices() {
    const matrixA = parseMatrix('matrixA'); // Obtém a matriz A
    const matrixB = parseMatrix('matrixB'); // Obtém a matriz B

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("As matrizes devem ter o mesmo tamanho para serem somadas."); // Alerta se as matrizes não tiverem o mesmo tamanho
        return;
    }

    const result = matrixA.map((row, i) =>
        row.map((val, j) => val + matrixB[i][j])    // Soma os elementos correspondentes das duas matrizes
        // Para cada valor 'val' na linha 'row' de 'matrixA', ela soma 'val' com o valor correspondente 'matrixB[i][j]'
        // Isso é feito para cada valor em cada linha, resultando em uma nova linha onde cada elemento é a soma dos elementos correspondentes de 'matrixA' e 'matrixB'
    );

    document.getElementById('result').innerText = formatMatrix(result); // Exibe o resultado formatado
}

function subtractMatrices() {
    const matrixA = parseMatrix('matrixA'); // Obtém a matriz A
    const matrixB = parseMatrix('matrixB'); // Obtém a matriz B

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("As matrizes devem ter o mesmo tamanho para serem subtraídas.");  // Alerta se as matrizes não tiverem o mesmo tamanho
        return;
    }

    const result = matrixA.map((row, i) =>
        row.map((val, j) => val - matrixB[i][j])    // Subtrai os elementos correspondentes das duas matrizes
        // Para cada valor 'val' na linha 'row' de 'matrixA', ela subtrai 'matrixB[i][j]' de 'val'
        // Isso é feito para cada valor em cada linha, resultando em uma nova linha onde cada elemento é a diferença dos elementos correspondentes de 'matrixA' e 'matrixB'
    );

    document.getElementById('result').innerText = formatMatrix(result); // Exibe o resultado formatado
}

function multiplyMatrices() {
    const matrixA = parseMatrix('matrixA'); // Obtém a matriz A
    const matrixB = parseMatrix('matrixB'); // Obtém a matriz B

    if (matrixA[0].length !== matrixB.length) {
        alert("O número de colunas da Matriz A deve ser igual ao número de linhas da Matriz B para multiplicação.");    // Alerta se as dimensões não forem compatíveis para multiplicação
        return;
    }

    const result = matrixA.map(row =>
        matrixB[0].map((_, colIndex) =>
            row.reduce((sum, val, rowIndex) => sum + val * matrixB[rowIndex][colIndex], 0)  // Multiplica as matrizes
            // Para cada linha 'row' de 'matrixA', cria uma nova linha na matriz resultante
            // Para cada coluna 'colIndex' de 'matrixB', calcula a soma dos produtos dos elementos correspondentes das linhas de 'matrixA' e colunas de 'matrixB'
            // Constrói a matriz resultante onde cada elemento é o produto escalar das linhas de 'matrixA' e colunas de 'matrixB'
        )
    );

    document.getElementById('result').innerText = formatMatrix(result); // Exibe o resultado formatado
}

function transposeMatrixA() {
    const matrixA = parseMatrix('matrixA'); // Obtém a matriz A
    const result = matrixA[0].map((_, colIndex) => matrixA.map(row => row[colIndex]));  // Transpõe a matriz A
    // Retorna uma matriz onde cada linha corresponde a uma coluna da matriz original 'matrixA'
    // Isso efetivamente realiza a transposição da matriz 'matrixA', transformando as linhas em colunas e vice-versa

    document.getElementById('result').innerText = formatMatrix(result); // Exibe o resultado formatado
}

function transposeMatrixB() {
    const matrixB = parseMatrix('matrixB'); // Obtém a matriz B
    const result = matrixB[0].map((_, colIndex) => matrixB.map(row => row[colIndex]));  // Transpõe a matriz B
    // Retorna uma matriz onde cada linha corresponde a uma coluna da matriz original 'matrixB'
    // Isso efetivamente realiza a transposição da matriz 'matrixA', transformando as linhas em colunas e vice-versa

    document.getElementById('result').innerText = formatMatrix(result); // Exibe o resultado formatado
}
