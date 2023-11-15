const estado = {
    visual: {
        quadrados:document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        tempoRestante:document.querySelector("#tempo-restante"),
        pontuacao:document.querySelector("#pontuacao")
    },
    valores: {
        velocidadeDoJogo: 1000,
        posicaoDeAtaque: 0,
        resultado: 0,
        tempoAtual: 60.
    },
    acoes: {
        tempoId: setInterval(quadradoAleatorio, 1000),
        temporizadorDeContagemRegressiva: setInterval(contagemRegressiva, 1000),},
};

function contagemRegressiva() {
    estado.valores.tempoAtual--;
    estado.visual.tempoRestante.textContent = estado.valores.tempoAtual;

    if (estado.valores.tempoAtual <= 0) {
        clearInterval(estado.acoes.temporizadorDeContagemRegressiva);
        clearInterval(estado.acoes.tempoId);
        alert("Game Over! O seu resultado foi; " + estado.valores.resultado);
    }
}

function tocarMusica(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function quadradoAleatorio() {
    estado.visual.quadrados.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    })
        

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = estado.visual.quadrados[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo");
    estado.valores.posicaoDeAtaque = quadradoAleatorio.id;
    
}

function adicionarOuvinteCaixaDeToque() {
    estado.visual.quadrados.forEach((quadrado) => {
        quadrado.addEventListener("mousedown", () => {
            if (quadrado.id === estado.valores.posicaoDeAtaque) {
                estado.valores.resultado++
                estado.visual.pontuacao.textContent = estado.valores.resultado;
                estado.valores.posicaoDeAtaque = null;
                tocarMusica("hit");
            }
        })
    })
}

function inicial() {
    adicionarOuvinteCaixaDeToque();
}

inicial();