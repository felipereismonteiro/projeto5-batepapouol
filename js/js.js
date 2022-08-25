function alerta() {
    const input = document.querySelector("footer input").value;
    console.log(input);
}

// Buscando mensagens


buscandoMensagens()

setInterval(buscandoMensagens, 4000)

function buscandoMensagens() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(chegou)
}

function chegou(res) {
    let mensagens = []
    console.log(mensagens)
    const lista = document.querySelector(".lista")

    mensagens.push(res.data)
    // Colocando as mensagens no array, criando um novo array sempre que chega mensagem nova

    // Colocando as mensagens na tela 
    lista.innerHTML = ""
    for (i = 0; i < mensagens[0].length; i++) {


        lista.innerHTML += `<li>
                        <div class="${mensagens[0][i].to}">
                            <div class="text"><span class="timer">(${mensagens[0][i].time})</span><strong class="nome">${mensagens[0][i].from}</strong><span class="status">${mensagens[0][i].text}</span></div>
                        </div>
                    </li>`
    }
    lista.lastChild.scrollIntoView()
}


