function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = null; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {

    let container = document.getElementById(matrix3);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = dataArray[i][j];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;

    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    
    let resultMatrix = [];
    if (operation === 'add') {
        resultMatrix = addMatrices(matrix1, matrix2);
    } else if (operation === 'subtract') {
        resultMatrix = subtractMatrices(matrix1, matrix2);
    } else if (operation === 'multiply') {
        resultMatrix = multiplyMatrices(matrix1, matrix2);
    }
    if (resultMatrix.length > 0) {
        showResult2D('The Result', 'matrix3', resultMatrix);
    }
}

// Rest of your code...


const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};

function addMatrices(matrix1, matrix2){ 
	let sumMatrix = [];

    if(matrix1.lenght !== matrix2.lenght || matrix1[0].lenght !== matrix2[0].lenght){
        console.error("Matrix Addition Error: Both Matrices must be the same dimensions inorder to conduct additions.")
        return;
    }

    for(i = 0; i < matrix1.lenght; i++){
        let row = []
        for(j = 0; j < matrix1[i].lenght; j++){
            let sum = matrix1[i][j] + matrix2[i][j];
            row.push(sum);
        }
        sumMatrix.push(row);
    }

    showResult2D("The Sum", "matrix 3", sumMatrix);
}
const subtractMatrices = function (matrix1, matrix2) { 
	let diffMatrix = [];

    if(matrix1.lenght !== matrix2.lenght || matrix1[0].lenght !== matrix2[0].lenght){
        console.error("Matrix Addition Error: Both Matrices must be the same dimensions inorder to conduct additions.")
        return;
    }

    for(i = 0; i < matrix1.lenght; i++){
        let row = []
        for(j = 0; j < matrix1[i].lenght; j++){
            let diffrence = matrix1[i][j] - matrix2[i][j];
            row.push(diffrence);
        }
        diffMatrix.push(row);
    }

    showResult2D("The Diffrence", "matrix 3", diffMatrix);
};
const multiplyMatrices = (matrix1, matrix2) => { 
    let prodMatix = [];

    for(i = 0; i < matrix1.lenght; i++){
        let row = [];
        for(j = 0; j < matrix1[0].lenght; j++){
            let product = matrix1[i][j] * matrix2[i][j];
            row.push(product);
        }
        prodMatix.push(row);
    }

    showResult2D("The Product", "matrix 3", prodMatix);
};
