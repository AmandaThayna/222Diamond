// game.js
let currentPlayer = "X"; // Inicia com o jogador X
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Array para representar o tabuleiro
let gameOver = false;

const cells = document.querySelectorAll("td");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(event) {
  if (gameOver) return; //Sai da função se o jogo acabou

  const cellIndex = parseInt(event.target.id.slice(-2)); // Pega o índice da célula

  if (gameBoard[cellIndex] === "") {
     //logica do jogo da velha com possibilidade de resultados aleatorios
     gameBoard[cellIndex] = currentPlayer;
     event.target.textContent = currentPlayer;


     //Verifica se o jogador atual venceu
     if (checkWin(currentPlayer)) {
        document.getElementById("result").textContent = `Jogador ${currentPlayer} venceu!`;
        gameOver = true;
        return; // Para a execução da função
      }

      //Verifica se há empate
     if (checkDraw()) {
        document.getElementById("result").textContent = "Empate!";
        gameOver = true;
        return; // Para a execução da função
      }

      // Inverte o jogador atual
     currentPlayer = currentPlayer === "X" ? "O" : "X";
    
     //Simulação de resultados aleatórios do tigrinho
     const randomNumber = Math.floor(Math.random() * 3) + 1;
    
     if (randomNumber === 3 && !gameOver){ // 33% de chance de um jogador ganhar aleatoriamente
         let winner = "X"; // O ganhador pode ser X ou O. A lógica atual escolhe X.
         document.getElementById("result").textContent = `Jogador ${winner} venceu!`;
         gameOver = true;
         return;
      }
    
  }
}


function checkWin(player) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Colunas
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
        return true;
      }
    }
    return false;
}

function checkDraw() {
  return !gameBoard.includes("");
}
