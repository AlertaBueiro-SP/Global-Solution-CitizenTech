// Atualiza a reta e a tabela com os valores da projeção
function desenharGrafico() {
    var ponto = pontos[pontoSelecionado];
    var nivelFinal = projetarNivel(ponto.agua, ponto.taxa, ponto.minutos);
    var maiorNivel = Math.max(100, nivelFinal, ponto.limite);
    var tempoEixo = ponto.minutos;

    if (tempoEixo === 0) {
        tempoEixo = 1;
    }

    // O desenho usa 500 pixels de largura e 200 de altura.
    var yInicial = 240 - (ponto.agua / maiorNivel) * 200;
    var yFinal = 240 - (nivelFinal / maiorNivel) * 200;
    var xFinal = 65 + (ponto.minutos / tempoEixo) * 500;
    var yLimite = 240 - (ponto.limite / maiorNivel) * 200;
    var reta = document.getElementById("reta-projecao");
    var linhaLimite = document.getElementById("linha-limite");

    reta.setAttribute("x1", 65);
    reta.setAttribute("y1", yInicial);
    reta.setAttribute("x2", xFinal);
    reta.setAttribute("y2", yFinal);

    linhaLimite.setAttribute("y1", yLimite);
    linhaLimite.setAttribute("y2", yLimite);

    document.getElementById("inicio-reta").setAttribute("cy", yInicial);

    for (var i = 0; i <= 4; i++) {
        document.getElementById("marca-nivel-" + i).textContent =
            numeroFormatado(maiorNivel * i / 4);

        document.getElementById("marca-tempo-" + i).textContent =
            numeroFormatado(tempoEixo * i / 4);
    }

    document.getElementById("tabela-niveis").textContent = "";

    for (var minuto = 0; minuto <= Math.floor(ponto.minutos); minuto++) {
        adicionarLinhaTabela(minuto);
    }

    if (ponto.minutos % 1 !== 0) {
        adicionarLinhaTabela(ponto.minutos);
    }
}

// Adiciona um instante à tabela abaixo do gráfico
function adicionarLinhaTabela(minuto) {
    var ponto = pontos[pontoSelecionado];
    var nivel = projetarNivel(ponto.agua, ponto.taxa, minuto);
    var linha = document.createElement("tr");
    var colunaTempo = document.createElement("td");
    var colunaNivel = document.createElement("td");

    colunaTempo.textContent = numeroFormatado(minuto);
    colunaNivel.textContent = numeroFormatado(nivel);

    linha.appendChild(colunaTempo);
    linha.appendChild(colunaNivel);

    document.getElementById("tabela-niveis").appendChild(linha);
}

atualizarGrafico = desenharGrafico;
desenharGrafico();
