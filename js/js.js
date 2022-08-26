// Nome do usuario
let postando
let nome = prompt("Nos diga seu lindo nome!!!")
let server = { name: nome }
postar(server)

function postar(name) {
    postando = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name)
    postando.then(funcionou).catch(deuRuim)
}

function funcionou() {
    alert("foi")
    setInterval(manterConexao, 5000)
}

function deuRuim() {
    nome = prompt("Nos diga seu lindo nome!!!")
    server = { name: nome }
    postar(server)
}

function manterConexao() { // Mantendo conexao
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", server)
}


function alerta() { // Enviando mensagem
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
    const lista = document.querySelector(".lista")

    mensagens.push(res.data)
    // Colocando as mensagens no array 
    // Criando um novo array sempre que chega mensagem nova

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


