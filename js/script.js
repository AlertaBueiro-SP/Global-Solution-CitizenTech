var atualizarResumo = null;
var atualizarProjecao = null;

/* Dados inventados para estudar DOM. Não representam limites técnicos reais. */
var limiteAtencao = 50;
var limiteCritico = 80;
var agua = document.getElementById("agua");

var chuva = document.getElementById("chuva");
var estado = document.getElementById("estado");
var seletor = document.getElementById("seletor-ponto");
var formulario = document.getElementById("form-simulacao");
var mensagemSimulacao = document.getElementById("mensagem-simulacao");

// Cada ponto possui posição, nível da água e intensidade da chuva.
var pontos = [
    { id: "BL-01", x: 30, y: 20, agua: 20, chuva: 5 },
    { id: "BL-02", x: 48, y: 20, agua: 50, chuva: 25 },
    { id: "BL-03", x: 66, y: 20, agua: 80, chuva: 60 },
    { id: "BL-04", x: 84, y: 20, agua: 25, chuva: 10 },
    { id: "BL-05", x: 30, y: 43, agua: 75, chuva: 50 },
    { id: "BL-06", x: 48, y: 43, agua: 15, chuva: 5 },
    { id: "BL-07", x: 66, y: 43, agua: 45, chuva: 25 },
    { id: "BL-08", x: 84, y: 43, agua: 30, chuva: 15 },
    { id: "BL-09", x: 30, y: 76, agua: 55, chuva: 30 },
    { id: "BL-10", x: 48, y: 76, agua: 85, chuva: 60 },
    { id: "BL-11", x: 66, y: 76, agua: 10, chuva: 0 },
    { id: "BL-12", x: 84, y: 76, agua: 35, chuva: 15 }
];

// Parâmetros iniciais de projeção de cada ponto
for (var i = 0; i < pontos.length; i++) {
    pontos[i].taxa = 0;
    pontos[i].minutos = 15;
    pontos[i].limite = 100;
    pontos[i].acumulada = 0;
}

var pontoSelecionado = 0;

// Medidas fictícias usadas para desenhar os círculos
var larguraTerritorio = 500;
var raioAtencao = 30;
var larguraCirculo = (raioAtencao * 2 / larguraTerritorio) * 100;

function nomeEstado(classe) {
    if (classe === "critico") {
        return "Crítico";
    } else if (classe === "atencao") {
        return "Atenção";
    } else {
        return "Normal";
    }
}

// Atualiza as cores e os círculos dos pontos
function atualizarMapa() {
    for (var i = 0; i < pontos.length; i++) {
        var ponto = pontos[i];
        var classe = classificarPonto(
            ponto.agua,
            ponto.taxa,
            ponto.chuva,
            ponto.acumulada
        );
        var botao = document.getElementById("pino-" + i);
        var circulo = document.getElementById("area-" + i);

        botao.className = "pino " + classe;

        if (i === pontoSelecionado) {
            botao.setAttribute("aria-pressed", "true");
        } else {
            botao.setAttribute("aria-pressed", "false");
        }

        botao.setAttribute(
            "aria-label",
            ponto.id + ": " + nomeEstado(classe) +
            ", " + ponto.agua + " cm. Selecionar."
        );

        if (classe === "critico") {
            circulo.hidden = false;
        } else {
            circulo.hidden = true;
        }
    }
}

// Mostra os dados do ponto selecionado
function mostrarPonto() {
    var ponto = pontos[pontoSelecionado];
    var classe = classificarPonto(ponto.agua, ponto.taxa, ponto.chuva, ponto.acumulada);
    var mensagem;

    document.getElementById("titulo-painel").textContent =
        "Boca de lobo " + ponto.id;

    document.getElementById("valor-agua").textContent =
        ponto.agua + " cm";

    document.getElementById("valor-chuva").textContent =
        ponto.chuva + " mm/h";

    estado.textContent = nomeEstado(classe);
    estado.className = classe;

    agua.value = ponto.agua;
    chuva.value = ponto.chuva;
    seletor.value = pontoSelecionado;

  if (classe === "critico") {
        mensagem = "Nível crítico na simulação. Não confirma alagamento ou obstrução.";
    } else if (classe === "atencao") {
        mensagem = "Nível elevado. Acompanhe as leituras simuladas.";
    } else {
     mensagem = "Nível baixo na simulação. Não comprova eficiência da drenagem.";
    }
    document.getElementById("descricao-ponto").textContent = mensagem;
    atualizarMapa();

    if (atualizarResumo !== null) {
        atualizarResumo();
    }

    if (atualizarProjecao !== null) {
        atualizarProjecao();
    }
}

// Altera somente a boca de lobo selecionada, sem modificar as demais.
function atualizarPainel(nivel, intensidade) {
    pontos[pontoSelecionado].agua = nivel;
    pontos[pontoSelecionado].chuva = intensidade;

    mostrarPonto();
}

// Troca o ponto exibido no painel
function selecionarPonto(indice) {
    pontoSelecionado = indice;

    mensagemSimulacao.textContent =
        "Ponto " + pontos[indice].id + " selecionado. Dados simulados.";

    mostrarPonto();
}

// Identifica o ponto pelo valor do botão clicado
function clicarNoPonto(evento) {
    var botao = evento.currentTarget;
    var indice = Number(botao.value);

    selecionarPonto(indice);
}

// Cria os botões, círculos e opções do seletor
function criarPontos() {
    var camadaPontos = document.getElementById("pontos-mapa");
    var camadaAreas = document.getElementById("areas-atencao");

    for (var i = 0; i < pontos.length; i++) {
        var ponto = pontos[i];

        var botao = document.createElement("button");

        botao.type = "button";
        botao.id = "pino-" + i;
        botao.value = i;
        botao.textContent = ponto.id;
        botao.style.left = ponto.x + "%";
        botao.style.top = ponto.y + "%";

        botao.addEventListener("click", clicarNoPonto);

        camadaPontos.appendChild(botao);

        var circulo = document.createElement("div");

        circulo.id = "area-" + i;
        circulo.className = "area-critica";
        circulo.style.left = ponto.x + "%";
        circulo.style.top = ponto.y + "%";
        circulo.style.width = larguraCirculo + "%";

        camadaAreas.appendChild(circulo);

        var opcao = document.createElement("option");

        opcao.value = i;
        opcao.textContent = ponto.id;

        seletor.appendChild(opcao);
    }
}

// Seleciona um ponto pela lista
seletor.addEventListener("change", function () {
    var indice = Number(seletor.value);

    selecionarPonto(indice);
});

// Valida e aplica os valores do formulário
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (agua.value.trim() === "") {
        mensagemSimulacao.textContent = "Preencha o nível da água.";
        return;
    }

    if (chuva.value.trim() === "") {
        mensagemSimulacao.textContent = "Preencha a intensidade da chuva.";
        return;
    }

    var nivel = Number(agua.value);
    var intensidade = Number(chuva.value);

    if (Number.isFinite(nivel) === false) {
        mensagemSimulacao.textContent = "Digite um nível válido.";
        return;
    }

    if (Number.isFinite(intensidade) === false) {
        mensagemSimulacao.textContent = "Digite uma intensidade válida.";
        return;
    }

    if (nivel < 0 || nivel > 100) {
        mensagemSimulacao.textContent = "O nível deve ficar entre 0 e 100 cm.";
        return;
    }

    if (intensidade < 0 || intensidade > 200) {
        mensagemSimulacao.textContent = "A chuva deve ficar entre 0 e 200 mm/h.";
        return;
    }


    if (formulario.reportValidity() === false) {
        return;
    }

    atualizarPainel(nivel, intensidade);

    mensagemSimulacao.textContent = "Simulação atualizada.";
});

// Aplica valores prontos ao ponto selecionado
function aplicarCenario(nivel, intensidade) {
    pontos[pontoSelecionado].taxa = 0;
    pontos[pontoSelecionado].acumulada = 0;
    atualizarPainel(nivel, intensidade);

    mensagemSimulacao.textContent = "Cenário fictício aplicado.";
}

document.getElementById("cenario-normal").addEventListener("click", function () {
    aplicarCenario(20, 5);
});

document.getElementById("cenario-atencao").addEventListener("click", function () {
    aplicarCenario(50, 25);
});

document.getElementById("cenario-critico").addEventListener("click", function () {
    aplicarCenario(80, 60);
});

// Marca no menu a seção indicada pelo endereço da página
var links = document.querySelectorAll("nav a");

function marcarSecao() {
    var secaoAtual = window.location.hash;

    for (var i = 0; i < links.length; i++) {
        var destino = links[i].getAttribute("href");

        if (destino === secaoAtual) {
            links[i].setAttribute("aria-current", "location");
        } else {
            links[i].removeAttribute("aria-current");
        }
    }
}

// Slideshow
var imagens = [
    "img/chuva.svg",
    "img/sensor.svg",
    "img/painel.svg"
];

var descricoes = [
    "Ilustração de chuva sobre uma rua",
    "Ilustração de sensor acima da água em um bueiro",
    "Ilustração de painel com três estados demonstrativos"
];

var legendas = [
    "Chuva na cidade",
    "Medição simulada",
    "Informação demonstrativa"
];

var slideAtual = 0;
var temporizador;
var pausado = false;

// Elementos do slideshow
var imagemSlide = document.getElementById("imagem-slide");
var legendaSlide = document.getElementById("legenda-slide");
var botaoAnterior = document.getElementById("anterior");
var botaoProximo = document.getElementById("proximo");
var botaoPausar = document.getElementById("pausar");

// Atualiza a imagem e a legenda
function mostrarSlide(numero) {
    slideAtual = numero;

    if (slideAtual > 2) {
        slideAtual = 0;
    } else if (slideAtual < 0) {
        slideAtual = 2;
    }

    imagemSlide.src = imagens[slideAtual];
    imagemSlide.alt = descricoes[slideAtual];

    legendaSlide.textContent =
        (slideAtual + 1) + " de 3 — " + legendas[slideAtual];
}

// Troca a imagem a cada cinco segundos
function iniciarSlideshow() {
    temporizador = setInterval(function () {
        mostrarSlide(slideAtual + 1);
    }, 5000);
}

// Volta para a imagem anterior
botaoAnterior.addEventListener("click", function () {
    mostrarSlide(slideAtual - 1);
});

// Avança para a próxima imagem
botaoProximo.addEventListener("click", function () {
    mostrarSlide(slideAtual + 1);
});

// Pausa ou continua a troca automática
botaoPausar.addEventListener("click", function () {
    if (pausado === true) {
        iniciarSlideshow();

        botaoPausar.textContent = "Pausar slideshow";
        pausado = false;
    } else {
        clearInterval(temporizador);

        botaoPausar.textContent = "Continuar";
        pausado = true;
    }
});

// Inicia a troca automática ao abrir a página
iniciarSlideshow();

window.addEventListener("hashchange", marcarSecao);

criarPontos();
mostrarPonto();
marcarSecao();

document.getElementById("limites").textContent =
    "Limites: atenção a partir de 50 cm; crítico a partir de 80 cm. " +
    "Subida e chuva também participam da classificação.";

// Valida um comentário fictício, sem enviar dados
var formularioFeedback = document.getElementById("form-feedback");

formularioFeedback.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (formularioFeedback.reportValidity() === false) {
        return;
    }

    var comentario = document.getElementById("mensagem");
    var retorno = document.getElementById("retorno-feedback");

    if (comentario.value.trim() === "") {
        retorno.textContent = "Digite um comentário:";
        comentario.focus();
        return;
    }

    retorno.textContent = "Demonstração sem envio ou armazenamento.";
});