var botaoSol = document.getElementById("clima-sol");
var botaoChuva = document.getElementById("clima-chuva");

function mudarClima(clima) {
    document.body.classList.remove("tempo-sol", "tempo-chuva");
    document.body.classList.add("tempo-" + clima);

    if (clima === "sol") {
        document.getElementById("icone-clima").src = "img/sol.svg";
        document.getElementById("titulo-clima").textContent = "Tempo aberto";
        document.getElementById("mensagem-clima").textContent = "Dia de sol. Acompanhe os pontos monitorados.";
        botaoSol.setAttribute("aria-pressed", "true");
        botaoChuva.setAttribute("aria-pressed", "false");
    } else {
        document.getElementById("icone-clima").src = "img/chuva-clima.svg";
        document.getElementById("titulo-clima").textContent = "Chuva na região";
        document.getElementById("mensagem-clima").textContent = "Cuidado! Acompanhe os pontos e evite áreas alagadas.";
        botaoSol.setAttribute("aria-pressed", "false");
        botaoChuva.setAttribute("aria-pressed", "true");
    }
}

botaoSol.addEventListener("click", function () {
    mudarClima("sol");
});

botaoChuva.addEventListener("click", function () {
    mudarClima("chuva");
});