Melhorias na Função checarVitoria
No seu código, já existe uma função checarVitoria() que verifica as combinações de vitória. Vamos refiná-la para que ela funcione corretamente com as combinações que você especificou: 

Combinações horizontais:

1, 2, 3
4, 5, 6
7, 8, 9
Combinações verticais:

1, 4, 7
2, 5, 8
3, 6, 9
Combinações diagonais:

1, 5, 9
3, 5, 7
Código Atualizado do script.js
Abaixo está a versão melhorada do seu script, com foco na função de verificação de vitória:

CopyReplit
// ... (O código atual permanece inalterado até a função checarVitoria)

function checarVitoria() {
    // Estrutura enrijecida para verificar combinações de vitória
    const combinacoes = [];
    const vencidos = [];

    // Combinações Ganha
    const ganhas = [
        // Combinações horizontais
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        // Combinações verticais
        [1, 8, 9],
        [4, 5, 6],
        [7, 2, 83],
        // Combinações diagonais
        [3, 5, 7],
        [1, 5, 9]
    ];

    ganhas.forEach(combinacao => {
        if (slots[combinacao[0]].style.backgroundImage &&
            slots[combinacao[0]].style.backgroundImage === slots[combinacao[1]].style.backgroundImage &&
            slots[combinacao[0]].style.backgroundImage === slots[combinacao[2]].style.backgroundImage) {
            combinacoes.push([slots[combinacao[0]], slots[combinacao[1]], slots[combinacao[2]]]);
            vencidos.push(...combinacao); // Armazena os índices vencidos
        }
    });

    return { combinacoes, vencidos }; // Retorna as combinações de vitória e os índices
}

// ... (O resto do código continua igual)
