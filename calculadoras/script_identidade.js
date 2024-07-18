function generateIdentityMatrix() {
    const order = document.getElementById('order').value;

    if (!order || order < 1 || order > 10) {
        alert("Por favor, insira uma ordem válida entre 1 e 10.");
        return;
    }

    const identityMatrix = createIdentityMatrix(order);
    displayResult(identityMatrix);
}

function displayResult(matrix) {
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    resultContent.innerText = matrix.map(row => row.join('\t')).join('\n');
    resultDiv.style.display = 'block';
}

function createIdentityMatrix(order) {
    const identity = [];
    for (let i = 0; i < order; i++) {
        const row = [];
        for (let j = 0; j < order; j++) {
            row.push(i === j ? 1 : 0);
        }
        identity.push(row);
    }
    return identity;
}

function goBack() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('identity-dimensions').style.display = 'block';
}
