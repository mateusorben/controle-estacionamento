const nomeVeiculo = document.getElementById("nome-veiculo");
const horaEntrada = document.getElementById("hora-entrada");
const placa = document.getElementById("placa-veiculo");
const containerCards = document.querySelector(".container-cards");
const textPatioVazio = document.querySelector(".text-patio-vazio"); 
const imgGriloVazio = document.querySelector(".img-grilo-vazio"); 
const caixasContainerCarros = document.querySelector(".organizar-caixas-carros");
const caixasContainerMotos = document.querySelector(".organizar-caixas-motos");
let idCard = 0;

function entradaVeiculo() {
    const tipoVeiculo = document.getElementsByName("tipo-veiculo");
    let tipoVeiculoSelecionado = null;

    for (let i = 0; i < tipoVeiculo.length; i++) {
        if (tipoVeiculo[i].checked) {
            tipoVeiculoSelecionado = tipoVeiculo[i].value;
        }
    }

    if (nomeVeiculo.value === '' || nomeVeiculo.value === null) {
        alert('Insira o nome do veículo!');
    } else if (horaEntrada.value === '' || horaEntrada.value === null) {
        alert('Insira a hora de entrada do veículo!');
    } else if (placa.value === '' || placa.value === null) {
        alert('Insira a placa do veículo!');
    } else {
        idCard++;
        criarCardVeiculo(idCard, nomeVeiculo.value, horaEntrada.value, placa.value, tipoVeiculoSelecionado);
        nomeVeiculo.value = "";
        horaEntrada.value = "";
        placa.value = "";

        const caixaOcupadaCarros = caixasContainerCarros.querySelector(".box-carros:not(.ocupado)");
        const caixaOcupadaMotos = caixasContainerMotos.querySelector(".box-motos:not(.ocupado)");
        
        if (tipoVeiculoSelecionado == "tipo-carro-veiculo") {
            if (caixaOcupadaCarros) {
                caixaOcupadaCarros.classList.add("ocupado");
            }
        } else {
            if (caixaOcupadaMotos) {
                caixaOcupadaMotos.classList.add("ocupado");
            }
        }
    }
}

document.addEventListener('click', (e) => {
    const caixaOcupadaCarro = caixasContainerCarros.querySelector(".ocupado");
    const caixaOcupadaMoto = caixasContainerMotos.querySelector(".ocupado");
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let cardId;

    if(targetEl.classList.contains("card-button-open-modal")) {
        if (parentEl && parentEl.getAttribute("data_id")) {
            cardId = parentEl.getAttribute("data_id");
        }

        const todosCards = document.querySelectorAll(".card");

        todosCards.forEach((card) => {
            let cardIdSelecao = card.getAttribute("data_id");

            if(cardIdSelecao && cardIdSelecao.trim().toLowerCase() === cardId.trim().toLowerCase()) {
                localStorage.setItem("idCardSelecionado", cardIdSelecao)
                let nomeVeiculoModal = card.querySelector(".card-title"); 
                let horaEntradaModal = card.querySelector(".card-text-hora-entrar"); 
                let placaModal = card.querySelector(".card-text-placa"); 

                abrirModalFinalizarVeiculo(cardId, nomeVeiculoModal.innerText, horaEntradaModal.innerText, placaModal.innerText);
            }
        });
    }

    if(targetEl.classList.contains("card-button-delete-card")) {

        let todosCards = document.querySelectorAll(".card");

        if (parentEl && parentEl.getAttribute("data_id")) {
            cardId = parentEl.getAttribute("data_id");
        }

        todosCards.forEach((card) => {
            let cardIdSelecao = card.getAttribute("data_id");

            if(cardIdSelecao && cardIdSelecao.trim().toLowerCase() === cardId.trim().toLowerCase()) {
                let tipoVeiculo = card.querySelector(".card-subtitle").textContent; 
                console.log(tipoVeiculo)

                if (tipoVeiculo == "Carro") {
                    if (caixaOcupadaCarro) {
                        caixaOcupadaCarro.classList.remove("ocupado");
                    } 
                } else {
                    if (caixaOcupadaMoto) {
                        caixaOcupadaMoto.classList.remove("ocupado");
                    } 
                }
            }
        });

        parentEl.remove();

        todosCards = document.querySelectorAll(".card");

        if (todosCards.length === 0) {
            textPatioVazio.style.display = "block";
            imgGriloVazio.style.display = "block";
            containerCards.style.flexDirection = "column";
        }
    }

    if (targetEl.classList.contains("btn-modal-confirmar")) {
        let idCardRecuperadoLS = localStorage.getItem("idCardSelecionado");

        const todosCards = document.querySelectorAll(".card");

        todosCards.forEach((card) => {
            let cardIdSelecao = card.getAttribute("data_id");

            if(cardIdSelecao && cardIdSelecao.trim().toLowerCase() === idCardRecuperadoLS.trim().toLowerCase()) {
                const cardToRemove = document.querySelector(`.card[data_id="${idCardRecuperadoLS}"]`);
                let tipoVeiculo = card.querySelector(".card-subtitle").textContent; 
                console.log(tipoVeiculo)

                if (tipoVeiculo == "Carro") {
                    if (caixaOcupadaCarro) {
                        caixaOcupadaCarro.classList.remove("ocupado");
                    } 
                } else {
                    if (caixaOcupadaMoto) {
                        caixaOcupadaMoto.classList.remove("ocupado");
                    } 
                }
                cardToRemove.remove();
            }
        });

        const todosCardsVerificarSeAindaExisteAlgum = document.querySelectorAll(".card");

        if (todosCardsVerificarSeAindaExisteAlgum.length === 0) {
            textPatioVazio.style.display = "block";
            imgGriloVazio.style.display = "block";
            containerCards.style.flexDirection = "column";
        }
    }
});

let tipoVeiculoFormatado;

function criarCardVeiculo(idCard, nomeVeiculoCard, horaEntradaCard, placaCard, tipoVeiculoCard) {
    if(textPatioVazio && imgGriloVazio) {
        textPatioVazio.style.display = "none";
        imgGriloVazio.style.display = "none";
        
        containerCards.style.flexDirection = "row";
    }

    var cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.width = "18rem";
    cardDiv.style.margin = "5px"
    cardDiv.setAttribute("data_id", idCard)

    var cardBodyDiv = document.createElement("section");
    cardBodyDiv.className = "card-body";

    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = nomeVeiculoCard;

    var cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    if (tipoVeiculoCard == 'tipo-carro-veiculo') {
        cardSubtitle.textContent = "Carro";
        tipoVeiculoFormatado = "Carro";
    } else {
        cardSubtitle.textContent = "Moto";
        tipoVeiculoFormatado = "Moto";
    }

    var cardTextHrEntrada = document.createElement("p");
    cardTextHrEntrada.className = "card-text-hora-entrar";
    cardTextHrEntrada.textContent = horaEntradaCard;

    var cardTextPlaca = document.createElement("p");
    cardTextPlaca.className = "card-text-placa";
    cardTextPlaca.textContent = placaCard;

    var cardLink1 = document.createElement("button");
    cardLink1.className = "card-button-open-modal btn btn-primary";
    cardLink1.textContent = "Finalizar";

    var cardLink2 = document.createElement("button");
    cardLink2.className = "card-button-delete-card btn btn-danger";
    cardLink2.textContent = "Excluir";

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardSubtitle);
    cardBodyDiv.appendChild(cardTextHrEntrada);
    cardBodyDiv.appendChild(cardTextPlaca);
    cardBodyDiv.appendChild(cardLink1);
    cardBodyDiv.appendChild(cardLink2);
    cardDiv.appendChild(cardBodyDiv);

    containerCards.appendChild(cardDiv)
}

function abrirModalFinalizarVeiculo(cardId, nomeVeiculoModal, horaEntradaModal, placaModal) {
    let horaAtualSaida = obterHoraAtualFormatada();
    let valorCalculado = calcularValor(horaEntradaModal, horaAtualSaida);

    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    modalTitle.innerText = cardId + " | " + nomeVeiculoModal;
    modalBody.innerText = `Hora Entrada: ${horaEntradaModal} | Hora Saida: ${horaAtualSaida} | Placa: ${placaModal} | Valor: R$ ${valorCalculado}`;

    const myModal = new bootstrap.Modal(document.querySelector(".modal"));
    myModal.show();
}

function calcularValor(horaEntradaCalcularValor, horaAtualSaidaCalcularValor) {
    let diferencaEmMinutosCalcularValor =  calcularDiferencaEmMinutos(horaEntradaCalcularValor, horaAtualSaidaCalcularValor);

    const parametrosJSON = localStorage.getItem('parametros');

    if (parametrosJSON) {
        const parametros = JSON.parse(parametrosJSON);

        const parametro1 = parametros.parametro1;
        const valor1 = parseFloat(parametros.valor1);

        const parametro2Maior = parseFloat(parametros.parametro2.maior);
        const parametro2Menor = parseFloat(parametros.parametro2.menor);
        const valor2 = parseFloat(parametros.parametro2.valor);

        const parametro3Maior = parseFloat(parametros.parametro3.maior);
        const parametro3Menor = parseFloat(parametros.parametro3.menor);
        const valor3 = parseFloat(parametros.parametro3.valor);

        const parametro4Maior = parseFloat(parametros.parametro4.maior);
        const parametro4Menor = parseFloat(parametros.parametro4.menor);
        const valor4 = parseFloat(parametros.parametro4.valor);

        const valor5 = parseFloat(parametros.parametro5.valor);
       
        if (diferencaEmMinutosCalcularValor < parametro1) {
            return valor1;
        } else if (diferencaEmMinutosCalcularValor > parametro2Maior && diferencaEmMinutosCalcularValor < parametro2Menor){
            return valor2;
        } else if (diferencaEmMinutosCalcularValor > parametro3Maior && diferencaEmMinutosCalcularValor < parametro3Menor){
            return valor3;
        } else if (diferencaEmMinutosCalcularValor > parametro4Maior && diferencaEmMinutosCalcularValor < parametro4Menor){
            return valor4;
        } else {
            return valor5;
        }
    }
}
    

function obterHoraAtualFormatada() {
    var dataAtual = new Date();
    var horas = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();

    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    var horaFormatada = horas + ":" + minutos;

    return horaFormatada;
}

function calcularDiferencaEmMinutos(hora1, hora2) {
    var partesHora1 = hora1.split(":");
    var partesHora2 = hora2.split(":");

    var minutosHora1 = parseInt(partesHora1[0]) * 60 + parseInt(partesHora1[1]);
    var minutosHora2 = parseInt(partesHora2[0]) * 60 + parseInt(partesHora2[1]);

    var diferencaEmMinutos = minutosHora2 - minutosHora1;

    if (diferencaEmMinutos < 0) {
        diferencaEmMinutos += 24 * 60; 
    }

    return diferencaEmMinutos;
}

function salvarParametros() {
    const parametros = {
        parametroLimiteCarros: document.getElementById("limite-veiculo-carros").value,
        parametroLimiteMotos: document.getElementById("limite-veiculo-motos").value,

        parametro1: document.getElementById("parametroCrobanca-1").value,
        valor1: document.getElementById("parametroValor-1").value,
        parametro2: {
            maior: document.getElementById("parametroCrobancaMaior-2").value,
            menor: document.getElementById("parametroCrobancaMenor-2").value,
            valor: document.getElementById("parametroValor-2").value
        },
        parametro3: {
            maior: document.getElementById("parametroCrobancaMaior-3").value,
            menor: document.getElementById("parametroCrobancaMenor-3").value,
            valor: document.getElementById("parametroValor-3").value
        },
        parametro4: {
            maior: document.getElementById("parametroCrobancaMaior-4").value,
            menor: document.getElementById("parametroCrobancaMenor-4").value,
            valor: document.getElementById("parametroValor-4").value
        },
        parametro5: {
            maior: document.getElementById("parametroCrobancaMaior-5").value,
            valor: document.getElementById("parametroValor-5").value
        }
    };

    const parametrosJSON = JSON.stringify(parametros);

    localStorage.setItem('parametros', parametrosJSON);

    const textoParaIrAsConfiguracoes = document.querySelectorAll(".texto-para-ir-as-configuracoes");

    textoParaIrAsConfiguracoes.forEach(element => {
        element.style.display = "none";
    });    

    criarBoxesVeiculos(parametros.parametroLimiteCarros, parametros.parametroLimiteMotos);
}

function carregarParametros() {
    // Obter a string JSON armazenada no localStorage
    const parametrosJSON = localStorage.getItem('parametros');

    if (parametrosJSON) {
        // Converter a string JSON de volta para um objeto
        const parametros = JSON.parse(parametrosJSON);

        // Agora você pode acessar os valores como parametros.parametro1, parametros.valor1, etc.
        // Use esses valores para preencher os elementos HTML conforme necessário.
        document.getElementById("limite-veiculo-carros").value = parametros.parametroLimiteCarros;
        document.getElementById("limite-veiculo-motos").value = parametros.parametroLimiteMotos;

        document.getElementById("parametroCrobanca-1").value = parametros.parametro1;
        document.getElementById("parametroValor-1").value = parametros.valor1;

        document.getElementById("parametroCrobancaMaior-2").value = parametros.parametro2.maior;
        document.getElementById("parametroCrobancaMenor-2").value = parametros.parametro2.menor;
        document.getElementById("parametroValor-2").value = parametros.parametro2.valor;

        document.getElementById("parametroCrobancaMaior-3").value = parametros.parametro3.maior;
        document.getElementById("parametroCrobancaMenor-3").value = parametros.parametro3.menor;
        document.getElementById("parametroValor-3").value = parametros.parametro3.valor;

        document.getElementById("parametroCrobancaMaior-4").value = parametros.parametro4.maior;
        document.getElementById("parametroCrobancaMenor-4").value = parametros.parametro4.menor;
        document.getElementById("parametroValor-4").value = parametros.parametro4.valor;

        document.getElementById("parametroCrobancaMaior-5").value = parametros.parametro5.maior;
        document.getElementById("parametroValor-5").value = parametros.parametro5.valor;  
    }
}

document.addEventListener("DOMContentLoaded", carregarParametros);

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function criarBoxesVeiculos(numBoxesCarros, numBoxesMotos) {
    const organizarCaixasCarros = document.querySelector(".organizar-caixas-carros");
    const organizarCaixasMotos = document.querySelector(".organizar-caixas-motos");

    const todasBoxesCarros = document.querySelectorAll(".box-carros");
    const todasBoxesMotos = document.querySelectorAll(".box-motos");

    let numBoxesCarrosNum = Number(numBoxesCarros);
    let numBoxesMotosNum = Number(numBoxesMotos);

    todasBoxesCarros.forEach(box => box.remove());
    todasBoxesMotos.forEach(box => box.remove());

    for (let i = 0; i < numBoxesCarrosNum; i++) {
        const boxElement = document.createElement("div");
        boxElement.classList.add("box-carros"); 

        organizarCaixasCarros.appendChild(boxElement);
    }

    for (let i = 0; i < numBoxesMotosNum; i++) {
        const boxElement = document.createElement("div");
        boxElement.classList.add("box-motos"); 

        organizarCaixasMotos.appendChild(boxElement);
    }
}