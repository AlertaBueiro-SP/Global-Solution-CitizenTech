/* Modelo linear: taxa de subida da água em cm/min. */
function projetarNivel(nivelInicial, taxaSubida, minutos) {
    return nivelInicial + taxaSubida * minutos;
}

function tempoAteLimite(nivelInicial, taxaSubida, limite) {
    if (nivelInicial >= limite) {
        return 0;
    }
    if (taxaSubida <= 0) {
        return null;
    }
    return (limite - nivelInicial) / taxaSubida;
}

function classificarPonto(nivel, taxa, chuvaPorHora, acumulada) {
    var chuvaPorMinuto = chuvaPorHora / 60;
    if (nivel >= 80 || (nivel >= 60 && taxa >= 5) ||
        (acumulada >= 39.8 && nivel >= 50)) {
        return "critico";
    }
    if (nivel >= 50 || (chuvaPorMinuto >= 1 && taxa >= 3) ||
        (chuvaPorMinuto <= 0.1 && nivel >= 25)) {
        return "atencao";
    }
    return "normal";
}
