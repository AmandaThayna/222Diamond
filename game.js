// game.js

// Variáveis globais
let canvas;
let ctx;
let player;
let enemies = [];
let score = 0;

// Configurações
const canvasWidth = 800;
const canvasHeight = 600;
const playerSpeed = 5;
const enemySpeed = 3;
const enemySpawnRate = 1000; // em milissegundos

// Classe para o jogador
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = 'player.png'; // Substitua por seu arquivo de imagem.
    this.image.onload = () => {
        requestAnimationFrame(gameLoop); // garante que o jogo inicie
    }
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    // Movimento do player
    this.x = Math.max(0, Math.min(this.x + this.dx, canvasWidth - this.width)); // Impede de sair do canvas.
    this.y = Math.max(0, Math.min(this.y + this.dy, canvasHeight - this.height)); // Impede de sair do canvas.
    this.dx = 0;
    this.dy = 0;
  }
}


// Classe para inimigos
class Enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = 'enemy.png'; // Substitua por seu arquivo de imagem.
  }


  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    // Movimento dos inimigos
    this.x -= enemySpeed; // Movimento para a esquerda
    if (this.x + this.width < 0) {
      this.x = canvasWidth;
    }
    
  }
}

function createEnemy() {
    const enemy = new Enemy(canvasWidth, Math.random() * (canvasHeight - 50), 50, 50);
    enemies.push(enemy);
}


function init() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');

  player = new Player(canvasWidth / 2 - 25, canvasHeight / 2 - 25, 50, 50);
  
  setInterval(createEnemy, enemySpawnRate);

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        player.dy = -playerSpeed;
        break;
      case 'ArrowDown':
        player.dy = playerSpeed;
        break;
      case 'ArrowLeft':
        player.dx = -playerSpeed;
        break;
      case 'ArrowRight':
        player.dx = playerSpeed;
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        player.dy = 0;
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        player.dx = 0;
        break;
    }
  });
}



function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  player.update();
  player.draw();

  // Atualiza e desenha os inimigos
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.update();
    enemy.draw();
    // Verificação de colisão (implemente a lógica aqui)
  }

  requestAnimationFrame(gameLoop);
}



window.onload = init;
Explicação e melhorias:

Classes Player e Enemy: Organiza o código em classes para melhor estrutura.
Imagens: Adicionei image.src = 'player.png' (e enemy.png). É crucial ter esses arquivos na mesma pasta que o seu index.html ou especifique o caminho correto para eles.
Movimento do Player: O movimento agora é suave e limitado ao canvas.
Movimento dos inimigos: Os inimigos se movem para a esquerda continuamente.
Spawn de inimigos: Usando setInterval para gerar inimigos em um intervalo específico.
Limpeza do canvas: ctx.clearRect(0, 0, canvasWidth, canvasHeight) para garantir que o canvas seja limpo a cada frame, evitando acumulação de desenhos.
Inicialização (init): A inicialização agora garante que a imagem do jogador carregue corretamente antes de começar o loop.
Loop de jogo (gameLoop): O loop requestAnimationFrame garante que o jogo funcione com boa performance.
Controle de teclado: O código agora lida com a liberação das teclas, impedindo o movimento do player enquanto não houver input.
HTML (index.html):

CopyReplit
<!DOCTYPE html>
<html>
<head>
<title>First-Person Game</title>
</head>
<body>
  <canvas id="myCanvas" width="800" height="600"></canvas>
  <script src="game.js"></script> <!-- Inclui o arquivo JavaScript -->
  
  <style>
      canvas {
          border: 1px solid black;
      }
  </style>
</body>
</html>
