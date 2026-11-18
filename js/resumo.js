// Conta os estados atuais usando a mesma regra do mapa
function contarPontos() {
    var normais = 0;
    var atencao = 0;
    var criticos = 0;

    for (var i = 0; i < pontos.length; i++) {
        var ponto = pontos[i];
        var classe = classificarPonto(ponto.agua, ponto.taxa, ponto.chuva, ponto.acumulada);

        if (classe === "normal") {
            normais++;
        } else if (classe === "atencao") {
            atencao++;
        } else {
            criticos++;
        }
    }

    document.getElementById("total-pontos").textContent = pontos.length;
    document.getElementById("total-normal").textContent = normais;
    document.getElementById("total-atencao").textContent = atencao;
    document.getElementById("total-critico").textContent = criticos;
}

atualizarResumo = contarPontos;
contarPontos();