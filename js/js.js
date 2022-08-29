// Nome do usuario
let postando
let nome = prompt("Nos diga seu lindo nome!!!")
let server = { name: nome } 
postar(server)

function postar(name) {
    postando = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name)
    postando.then(funcionou).catch(deuRuim)
}

function funcionou() { // Se passar tudo corretamente ele mantem conexao
    setInterval(manterConexao, 5000)
    buscandoMensagens()
}

function deuRuim() { // Se der ruim
    nome = prompt("Nos diga seu lindo nome!!!")
    server = { name: nome }
    postar(server)
}

function manterConexao() { // Mantendo conexao
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", server)
}

function alerta() { // Enviando mensagem
    const input = document.querySelector("footer input").value;
    const mensagem = {
        from: server.name,
        to: "Todos",
        text: input,
        type: "message" // ou "private_message" para o bônus
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    promise.then(buscandoMensagens)
    promise.catch(() => window.location.reload())
}

setInterval(buscandoMensagens, 4000) // Buscando mensagens a cada 4 segundos

function buscandoMensagens() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(chegou)
}

function chegou(res) {
    const lista = document.querySelector(".lista")

    const novoArray = res.data.filter(foi)
    function foi (res){
        if (res.to === "Todos" || res.to === "todos" || res.to === server.name ) {
            return true
        }else {
            return false
        }
    } // Filtrando as mensagens para passar soh as mensagens privadas pra vc ou para todos

    // Colocando as mensagens na tela 
    lista.innerHTML = ""
    for (i = 0; i < novoArray.length; i++) {

        if (novoArray[i].text == "entra na sala..." || novoArray[i].text == "sai da sala...") {
            novoArray[i].to = "Entrou"
        } else if(novoArray[i].type == "private_message" && novoArray[i].to === server.name) {
            lista.innerHTML += 
            `<li>
                <div class="Reservadamente">
                    <div class="text"><span class="timer">(${novoArray[i].time})</span><strong class="nome">${novoArray[i].from}</strong><span class="status">reservadamente para <strong class="nome">${novoArray[i].to}: </strong></span><span class="status">${novoArray[i].text}</span></div>
                </div>
            </li>`
        }   // Quando entrar ou sair da sala para ter um fundo cinza ja que o to fica como todos
            // O resto das mensagens fica como Todos normalmente
            

        lista.innerHTML += 
        `<li>
            <div class="${novoArray[i].to} ${novoArray[i].text}">
                <div class="text"><span class="timer">(${novoArray[i].time})</span><strong class="nome">${novoArray[i].from}</strong><span class="status">${novoArray[i].text}</span></div>
            </div>
        </li>`
    }
    lista.lastChild.scrollIntoView()
}


