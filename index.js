let prompt = require('prompt-sync')();

let produtos = ["Salgado", "Refrigerante", "Suco", "Bolo", "Chocolate"];
let estoque = [];
let limiteCritico = 10;

for (let i = 0; i < produtos.length; i++) {
    let quantidade;
    do {
        quantidade = parseInt(prompt("Digite a quantidade inicial disponível de " + produtos[i] + ": "));
        if (isNaN(quantidade) || quantidade < 0) {
            console.log("Por favor, insira um número válido (0 ou mais).");
        }
    } while (isNaN(quantidade) || quantidade < 0);
    estoque.push(quantidade);
}

for (let i = 0; i < produtos.length; i++) {
    if (estoque[i] < limiteCritico) {
        console.log("Atenção: " + produtos[i] + " com estoque crítico (" + estoque[i] + " unidades).");
    }
}
let opcao;

do {
    console.log("\n===== MENU DA CANTINA =====");
    console.log("1 - Visualizar Estoque");
    console.log("2 - Registrar Venda");
    console.log("3 - Repor Estoque");
    console.log("4 - Sair");
    opcao = parseInt(prompt("Escolha uma opção: "));

    switch (opcao) {
        case 1:
            console.log("\n--- Estoque Atual ---");
            for (let i = 0; i < produtos.length; i++) {
                console.log(produtos[i] + ": " + estoque[i] + " unidades");
            }
            break;

        case 2:
            let produtoVenda = prompt("Digite o nome do produto vendido: ");
            let quantidadeVenda = parseInt(prompt("Digite a quantidade vendida: "));

            if (isNaN(quantidadeVenda) || quantidadeVenda <= 0) {
                console.log("Quantidade inválida.");
                break;
            }

            let vendido = false;
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].toLowerCase() === produtoVenda.toLowerCase()) {
                    vendido = true;
                    if (estoque[i] >= quantidadeVenda) {
                        estoque[i] -= quantidadeVenda;
                        console.log("Venda registrada de " + quantidadeVenda + " " + produtos[i] + "(s).");
                        if (estoque[i] < limiteCritico) {
                            console.log("Atenção: Estoque de " + produtos[i] + " está abaixo do crítico (" + estoque[i] + " unidades).");
                        }
                    } else {
                        console.log("Estoque insuficiente para esta venda.");
                    }
                    break;
                }
            }
            if (!vendido) {
                console.log("Produto não encontrado no cadastro.");
            }
            break;

        case 3:
            let produtoRepor = prompt("Digite o nome do produto para repor: ");
            let quantidadeRepor = parseInt(prompt("Digite a quantidade a adicionar: "));

            if (isNaN(quantidadeRepor) || quantidadeRepor <= 0) {
                console.log("Quantidade inválida.");
                break;
            }

            let reposto = false;
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].toLowerCase() === produtoRepor.toLowerCase()) {
                    estoque[i] += quantidadeRepor;
                    console.log("Estoque de " + produtos[i] + " atualizado para " + estoque[i] + " unidades.");
                    reposto = true;
                    break;
                }
            }
            if (!reposto) {
                console.log("Produto não encontrado no cadastro.");
            }
            break;

        case 4:
            console.log("Sistema encerrado. Até logo.");
            break;

        default:
            console.log("Opção inválida. Tente novamente.");
    }

} while (opcao !== 4);
