/* Guarda os parâmetros de projecao de cada ponto somente nesta sessão*/
for (var i = 0; i < pontos.length; i++) {
    pontos[i].taxa = 0;
    pontos[i].minutos = 15;
    pontos[i].limite = 100;
    pontos[i].acumulada = 0;
}

function numeroFormatado(valor) {
    return valor.toFixed(2).replace(".", ",");
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
        mensagem = "Altura limite já alcançada no nível atual.";
    } else if (tempo === null) {
        mensagem = "Sem subida: o modelo não alcança o limite.";
    } else {
        mensagem = numeroFormatado(tempo) + " min, se a taxa permanecer constante.";
    }
    document.getElementById("tempo-limite").textContent = mensagem;
    document.getElementById("aviso-projecao").textContent = projetado > ponto.limite
        ? "A projeção ultrapassa o limite. Valores posteriores são extrapolações matemáticas."
        : "A projeção mantém a taxa constante. O nível atual do mapa não é alterado.";
    document.getElementById("ponto-projecao").textContent = ponto.id;
    if (typeof desenharGrafico === "function") { desenharGrafico(); }
}

document.getElementById("form-projecao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!this.reportValidity()) { return; }
    var taxa = Number(document.getElementById("taxa-subida").value);
    var minutos = Number(document.getElementById("tempo-projecao").value);
    var limite = Number(document.getElementById("altura-limite").value);
    var acumulada = Number(document.getElementById("chuva-acumulada").value);
    if (!Number.isFinite(taxa) || !Number.isFinite(minutos) ||
        !Number.isFinite(limite) || !Number.isFinite(acumulada)) { return; }
    var ponto = pontos[pontoSelecionado];
    ponto.taxa = taxa;
    ponto.minutos = minutos;
    ponto.limite = limite;
    ponto.acumulada = acumulada;
    mostrarPonto();
    document.getElementById("mensagem-projecao").textContent = "Projeção atualizada para " + ponto.id + ".";
});
mostrarProjecao();
