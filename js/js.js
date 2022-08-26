// Nome do usuario
let postando
let nome = prompt("Nos diga seu lindo nome!!!")
let server = { name: nome }
postar(server)

function postar(name) {
    postando = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name)
    postando.then(funcionou).catch(deuRuim)
}

function funcionou() { //se passar tudo corretamente ele mantem conexao
    setInterval(manterConexao, 5000)
}

function deuRuim() { // se der ruim
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
    const lista = document.querySelector(".lista")

    const novoArray = res.data.filter(foi)
    function foi (res){
        if (res.to === "Todos" || res.to === "todos" || res.to === server.name ) {
            console.log(res.to)
            return true
        } else {
            console.log(res)
            return false
        }
    }
    console.log(novoArray)
    // Filtrando as mensagens para passar soh as mensagens privadas pra vc ou para todos
    
    // Colocando as mensagens na tela 
    lista.innerHTML = ""
    for (i = 0; i < novoArray.length; i++) {


        lista.innerHTML += `<li>
                        <div class="${novoArray[i].to}">
                            <div class="text"><span class="timer">(${novoArray[i].time})</span><strong class="nome">${novoArray[i].from}</strong><span class="status">${novoArray[i].text}</span></div>
                        </div>
                    </li>`
    }
    lista.lastChild.scrollIntoView()
}


