// game.js
let betAmount = 0;
const cells = document.querySelectorAll('td');
const resultDisplay = document.getElementById('result');
const betInput = document.getElementById('bet');
const animationContainer = document.getElementById('animation-container');
const multiplierDisplay = document.getElementById('multiplier-display');


const images = {
  // Adicione suas imagens aqui, ex:
  diamond_rose: "diamond_rose.png" // Substitua pelo caminho da sua imagem
};

function startGame() {
  betAmount = parseFloat(betInput.value);
  if (isNaN(betAmount) || betAmount <= 0) {
    resultDisplay.textContent = "Aposta inválida. Por favor, insira um valor válido.";
    return;
  }
  
    // ... (seu código para gerar imagens aleatórias nas células)
  // ... (seu código para checar vitorias e multiplicadores)
   // Inicializar o tabuleiro
   clearBoard();
   generateRandomImages();
   checkWinningCombinations();


}


function generateRandomImages(){
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const randomImage = Object.keys(images)[Math.floor(Math.random() * Object.keys(images).length)]; //Pega um valor randomico do objeto images
        cell.style.backgroundImage = `url(${images[randomImage]})`;
    }
}


function checkWinningCombinations() {
  // ... (sua lógica para verificar combinações vencedoras)
  // Exemplo de como verificar uma linha horizontal
  let multiplier = 1;
  if(checkRows()) multiplier *= 2;
  if(checkColumns()) multiplier *= 2;
  if (multiplier > 1) {
        startAnimation(multiplier);
  }
}




function startAnimation(multiplier) {
    animationContainer.style.opacity = 1;
    multiplierDisplay.textContent = `x${multiplier}`;

    setTimeout(() => {
      animationContainer.style.opacity = 0;
    }, 2000); // Tempo para a animação.
}



function checkRows() {
  for(let i=0; i < 3; i++){
    if (cells[i*3].style.backgroundImage === cells[(i * 3) + 1].style.backgroundImage && cells[(i * 3) + 1].style.backgroundImage === cells[(i * 3) + 2].style.backgroundImage) return true;
  }
  return false;
}

function checkColumns(){
  for(let i=0; i < 3; i++){
    if (cells[i].style.backgroundImage === cells[i + 3].style.backgroundImage && cells[i + 3].style.backgroundImage === cells[i + 6].style.backgroundImage) return true;
  }
  return false;
}



function clearBoard(){
    for(let i = 0; i < cells.length; i++) cells[i].style.backgroundImage = "";
}

