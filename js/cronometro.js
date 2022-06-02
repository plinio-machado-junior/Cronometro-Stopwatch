const cronometro = document.querySelector("#cronometro"); // local onde o cronometro será exibido
const startStopBtn = document.querySelector("#startStopBtn"); // botão para iniciar/pausar contagem
const resetarBtn = document.querySelector("#resetarBtn"); // botão para resetar o cronômetro

let intervaloTempo;
let tempoInicio = 0;
let tempoPassado = 0;
let horas = 0;
let minutos = 0;
let segundos = 0;
let milissegundos = 0;

startStopBtn.addEventListener("click", () => {
    if (startStopBtn.textContent === "Iniciar" || startStopBtn.textContent === "Retomar") {
        pausado = false; // muda para false, assim se o usuario clicar novamente, retorna para true e pausa a contagem, e vice-versa
        tempoInicio = Date.now() - tempoPassado; // captura a hora atual (em ms) e subtrai pelo tempo passado
        intervaloTempo = setInterval(atualizarCronometro, 100);
        startStopBtn.textContent = "Pausar";
    } else {
        tempoPassado = Date.now() - tempoInicio;
        clearInterval(intervaloTempo);
        startStopBtn.textContent = "Retomar";
    }
});

function atualizarCronometro() {
    tempoPassado = Date.now() - tempoInicio; // atualiza o tempo contando a partir de tempoInicio (começará em 0) e vai incrementando esse valor, já que tempoInicio vai ficar estático, e tempoPassado vai sempre ser atualizado de acordo com intervaloTempo(setInterval)
    segundos = Math.floor((tempoPassado / 1000) % 60);
    minutos = Math.floor((tempoPassado / (1000 * 60)) % 60);
    horas = Math.floor((tempoPassado / (1000 * 60 * 60)) % 60);
    cronometro.textContent = `${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;
}

resetarBtn.addEventListener("click", () => {
    clearInterval(intervaloTempo);
    tempoInicio = 0;
    tempoPassado = 0;
    cronometro.textContent = `00:00:00`;
    startStopBtn.textContent = "Iniciar";
});