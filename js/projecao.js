var atualizarGrafico = null;

// Formata números com duas casas decimais.
function numeroFormatado(valor) {
    return valor.toFixed(2).replace(".", ",");
}

function formatarMinutos(valor) {
    return String(valor).replace(".", ",");
}

// Converte minutos decimais em minutos e segundos.
function formatarTempo(valor) {
    var totalSegundos = Math.round(valor * 60);
    var minutos = Math.floor(totalSegundos / 60);
    var segundos = totalSegundos % 60;
    var textoMinutos = minutos + " minutos";
    var textoSegundos = segundos + " segundos";

    if (minutos === 1) {
        textoMinutos = "1 minuto";
    }

    if (segundos === 1) {
        textoSegundos = "1 segundo";
    }

    if (minutos === 0) {
        return textoSegundos;
    } else if (segundos === 0) {
        return textoMinutos;
    } else {
        return textoMinutos + " e " + textoSegundos;
    }
}

function mostrarProjecao() {
    var ponto = pontos[pontoSelecionado];
    document.getElementById("taxa-subida").value = ponto.taxa;
    document.getElementById("tempo-projecao").value = ponto.minutos;
    document.getElementById("altura-limite").value = ponto.limite;
    document.getElementById("chuva-acumulada").value = ponto.acumulada;
    var projetado = projetarNivel(ponto.agua, ponto.taxa, ponto.minutos);
    var tempo = tempoAteLimite(ponto.agua, ponto.taxa, ponto.limite);
    document.getElementById("nivel-projetado").textContent = numeroFormatado(projetado) + " cm";
    var mensagem;
    if (ponto.agua >= ponto.limite) {
        mensagem = "A água já está nessa altura ou acima dela.";
    } else if (tempo === null) {
        mensagem = "Não chega: a água não está subindo neste cenário.";
    } else {
         mensagem = formatarTempo(tempo) + " desde agora, mantendo essa subida.";
    }
    document.getElementById("tempo-limite").textContent = mensagem;
    if (projetado > ponto.limite) {
        document.getElementById("aviso-projecao").textContent =
            "Ao final do tempo escolhido, a água fica acima da altura de referência.";
    } else if (projetado === ponto.limite) {
        document.getElementById("aviso-projecao").textContent =
            "Ao final do tempo escolhido, a água chega à altura de referência.";
    } else {
        document.getElementById("aviso-projecao").textContent =
            "Ao final do tempo escolhido, a água fica abaixo da altura de referência.";
    }
    var unidadeTempo = " minutos";
    if (ponto.minutos === 1) {
        unidadeTempo = " minuto";
    }
    document.getElementById("resumo-projecao").textContent =
        "Agora: " + numeroFormatado(ponto.agua) + " cm. Daqui a " +
        formatarMinutos(ponto.minutos) + unidadeTempo + ": " + numeroFormatado(projetado) + " cm.";
    document.getElementById("ponto-projecao").textContent = ponto.id;
    if (atualizarGrafico !== null) {
        atualizarGrafico();
    }
}

document.getElementById("form-projecao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (evento.currentTarget.reportValidity() === false) {
        return;
    }
    var taxa = Number(document.getElementById("taxa-subida").value);
    var minutos = Number(document.getElementById("tempo-projecao").value);
    var limite = Number(document.getElementById("altura-limite").value);
    var acumulada = Number(document.getElementById("chuva-acumulada").value);
    if (!Number.isFinite(taxa) || !Number.isFinite(minutos) ||
        !Number.isFinite(limite) || !Number.isFinite(acumulada)) { 
        return; 
    }

    var ponto = pontos[pontoSelecionado];
    ponto.taxa = taxa;
    ponto.minutos = minutos;
    ponto.limite = limite;
    ponto.acumulada = acumulada;
    mostrarPonto();
    document.getElementById("mensagem-projecao").textContent = "Estimativa de " + ponto.id + " atualizada. Confira o resultado ao lado ou abaixo.";
});
atualizarProjecao = mostrarProjecao;
mostrarProjecao();
