# AlertaBueiro SP
Repositório: (https://github.com/AlertaBueiro-SP/Global-Solution-CitizenTech)

Protótipo acadêmico desenvolvido para a Global Solution 2026 — CitizenTech. A proposta é demonstrar como informações sobre o nível da água em bocas de lobo podem apoiar a compreensão de situações que exigem atenção na drenagem urbana.

O site apresenta um mapa fictício de Pinheiros, em São Paulo, com 12 pontos de monitoramento. Os valores podem ser alterados pelo usuário para explorar diferentes cenários.

ODS conectados:
ODS 11 — Cidades e comunidades sustentáveis, e ODS 13 — Ação contra a mudança global do clima. Relação proposta: informação preventiva e compreensão de riscos associados à chuva. |

## Equipe

- Francisco Carlos Rocha de Almeida — RM 574359
- Gabriel Almeida Areal — RM 575996
- Daniel de Oliveira Zuin — RM 575559
- Pedro Henrique Gomes Rodrigues — RM 574214
  
## Funcionalidades

- Seleção de pontos pelo mapa ou pela lista de bocas de lobo.
- Simulação do nível da água e da intensidade da chuva de cada ponto.
- Classificação demonstrativa em normal, atenção e crítico.
- Contadores atualizados conforme o estado dos pontos.
- Projeção linear do nível da água, com gráfico e tabela por minuto.
- Estimativa do tempo até uma altura limite informada.
- Cenários rápidos para testar os três estados.
- Alternância manual entre sol e chuva, com mudança do ícone, mensagem e fundo.
- Slideshow com três ilustrações locais e controles de navegação e pausa.
- Formulário demonstrativo com validação de campos.
- Acesso ao relatório de chuva, ao GeoGebra e ao circuito no Wokwi.
- Programa Python independente, executado no terminal.

## Tecnologias

HTML, CSS e JavaScript no site, sem frameworks ou instalação de pacotes. A aplicação de terminal utiliza Python. A fonte Manrope é carregada pelo Google Fonts, com fonte alternativa definida no CSS.

## Como executar o site

1. Baixe e extraia os arquivos do projeto.
2. Abra `index.html` em um navegador atualizado.
3. Se preferir, abra a pasta no Visual Studio Code e execute o HTML pela extensão Live Server.

Os arquivos HTML, CSS, JavaScript e SVG funcionam localmente. A fonte externa e os links para GeoGebra e Wokwi precisam de conexão com a internet.

## Como usar

1. Selecione uma boca de lobo no mapa ou na lista do painel.
2. Informe o nível da água e a intensidade da chuva e clique em **Aplicar simulação**.
3. Para testar valores prontos, utilize os botões de cenário normal, atenção e crítico.
4. No formulário de projeção, informe taxa de subida, tempo, altura limite e chuva acumulada.
5. Clique em **Calcular projeção** e consulte o resultado, o gráfico e a tabela.
6. Utilize **Sol** e **Chuva** para demonstrar a mudança visual do clima. O ícone de informação explica a proposta de uma integração meteorológica futura.

Cada ponto mantém seus próprios parâmetros durante a sessão. Recarregar a página restaura os dados iniciais. Os botões de cenário rápido zeram a taxa de subida e a chuva acumulada do ponto selecionado.

## Modelo de projeção

A função utilizada é:

```text
h(t) = h0 + r × t
```

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| h(t) | Nível projetado | cm |
| h0 | Nível inicial | cm |
| r | Taxa de subida | cm/min |
| t | Tempo da projeção | min |

Por exemplo, um nível inicial de 50 cm, com subida de 2 cm/min por 15 minutos, resulta em 80 cm.

Quando o nível inicial está abaixo do limite e a taxa é positiva, o tempo até essa altura é `(limite − h0) / r`. Se a taxa é zero, o nível permanece constante no modelo. Se a altura limite já foi alcançada, o sistema informa essa condição.

A classificação dos pontos usa o nível atual e regras combinadas de subida e chuva definidas em `js/modelo.js`. O gráfico representa a projeção futura; as cores do mapa representam a classificação atual.

## Aplicação Python

Requer Python **3.10 ou superior**, por utilizar `match/case`. Não utiliza pacotes externos.

Na pasta do projeto, execute:

```bash
python python/AlertaBueiroSP.py
```

Em ambientes que utilizam o comando `python3`:

```bash
python3 python/AlertaBueiroSP.py
```

O menu permite calcular o nível projetado, consultar a fórmula, gerar uma tabela, consultar a quantidade de cálculos e estimar o tempo até uma altura limite.

O programa Python funciona separadamente do navegador. O site executa os cálculos em JavaScript e disponibiliza o arquivo Python para download; não há comunicação automática entre as duas aplicações.

## Organização dos arquivos

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Estrutura, mapa, formulários e conteúdo do site |
| `css/style.css` | Estilos de base |
| `css/redesign.css` | Acabamento visual e ajustes de layout |
| `css/clima.css` | Aparência dos cenários de clima e controles |
| `js/modelo.js` | Funções de projeção e classificação |
| `js/script.js` | Pontos, painel, navegação, slideshow e validações |
| `js/projecao.js` | Formulário e resultados da projeção |
| `js/grafico.js` | Atualização do gráfico e da tabela |
| `js/resumo.js` | Contadores dos estados dos pontos |
| `js/clima.js` | Alternância manual do clima |
| `img/` | Ilustrações e ícones SVG locais |
| `materiais/relatorio-chuva-original.pdf` | Relatório de chuva fornecido pelo grupo |
| `python/AlertaBueiroSP.py` | Aplicação de terminal |

## Limites do protótipo

- O mapa, as posições e as leituras são fictícios. Não há monitoramento real ou identificação automática da localização.
- O clima é simulado manualmente. A consulta a uma API meteorológica é uma possibilidade de evolução.
- Os limites de classificação são demonstrativos, não limiares técnicos validados. O valor de 39,8 mm não deve ser interpretado como garantia de alagamento.
- O círculo de 30 m é uma representação ilustrativa; não calcula a extensão de uma área alagada.
- A projeção pressupõe taxa de subida constante e não representa um modelo hidráulico completo. Ultrapassar uma altura de referência não fornece, por si só, o volume ou a dinâmica do transbordamento.
- Intensidade de chuva em mm/h não equivale diretamente à taxa de subida da água em cm/min. São grandezas diferentes.
- O relatório original de chuva e a projeção de nível tratam de grandezas diferentes e devem ser interpretados conforme suas unidades.
- Os dados da simulação não são persistidos. O formulário de comentário apenas valida os campos, sem envio ou armazenamento.

## Materiais relacionados

- [Relatório original de chuva](materiais/relatorio-chuva-original.pdf)
- [Modelo no GeoGebra](https://www.geogebra.org/calculator/kyvpxgjy)
- [Circuito original no Wokwi](https://wokwi.com/projects/480870048680449025)

## Possíveis evoluções

Integração com dados meteorológicos, leituras de sensores e localização de pontos reais, acompanhadas da validação das regras de classificação e do modelo utilizado.

