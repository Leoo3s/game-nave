function start() { // Inicio da função start()

    $("#inicio").hide(); // Ocultar tag inicio

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); // Criar div jogador
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>"); // Criar div  inimigo1
    $("#fundoGame").append("<div id='inimigo2'></div>"); // Criar div inimigo 2
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>"); // Criar div amigo

} // Fim da função start

//Principais variáveis do jogo

var fimdejogo = false;
var jogo = {}
var velocidade = 5;
var posicaoY = parseInt(Math.random() * 340);
var podeAtirar = true;
var TECLA = {
    W: 87,
    S: 83,
    D: 68
}

//Game Loop

jogo.timer = setInterval(loop, 30);

function loop() {

    movefundo();
    movejogador(); // Move o Jogador
    moveinimigo1(); // Move o Helicoptero Inimigo
    moveinimigo2(); // Move Carro Inimigo
    moveamigo(); // Move Amigo Resgate
    colisao(); // Detecta colisao


} // Fim da função loop()

//Função que movimenta o fundo do jogo

function movefundo() {

    esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position", esquerda - 2);

} // fim da função movefundo()



jogo.pressionou = [];

//Verifica se o usuário pressionou alguma tecla	

$(document).keydown(function (e) {
    jogo.pressionou[e.which] = true;
});


$(document).keyup(function (e) {
    jogo.pressionou[e.which] = false;
});


function movejogador() {

    if (jogo.pressionou[TECLA.W]) {
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top", topo - 10);

        if (topo <= 0) {

            $("#jogador").css("top", topo + 10);
        }

    }

    if (jogo.pressionou[TECLA.S]) {

        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top", topo + 10);

        if (topo >= 434) {
            $("#jogador").css("top", topo - 10);
        }
    }

    if (jogo.pressionou[TECLA.D]) {

        //Chama função Disparo
        disparo(); // Disparo Helicoptero amigo	
    }

} // fim da função movejogador()


// Inicio da função moveInimigo1
function moveinimigo1() {

    posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidade);
    $("#inimigo1").css("top", posicaoY);

    if (posicaoX <= 0) {
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY);

    }
} //Fim da função moveinimigo1()

// Inicio da função moveInimigo 2
function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX - 3);

    if (posicaoX <= 0) {

        $("#inimigo2").css("left", 775);

    }
} // Fim da função moveinimigo2()


// Inicio da função moveamigo
function moveamigo() {

    posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left", posicaoX + 1);

    if (posicaoX > 906) {

        $("#amigo").css("left", 0);

    }

} // fim da função moveamigo()

// Inicio função disparo
function disparo() {

    if (podeAtirar == true) {

        podeAtirar = false;

        topo = parseInt($("#jogador").css("top"))
        posicaoX = parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;
        topoTiro = topo + 37;
        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top", topoTiro);
        $("#disparo").css("left", tiroX);

        var tempoDisparo = window.setInterval(executaDisparo, 30);

    } //Fecha podeAtirar

    function executaDisparo() {
        posicaoX = parseInt($("#disparo").css("left"));
        $("#disparo").css("left", posicaoX + 15);

        if (posicaoX > 900) {

            window.clearInterval(tempoDisparo);
            tempoDisparo = null;
            $("#disparo").remove();
            podeAtirar = true;

        }
    } // Fecha executaDisparo()
} // Fecha disparo()

//Inicio funcao de colisao
function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
    var colisao2 = ($("#jogador").collision($("#inimigo2")));
    // jogador com o inimigo1

    if (colisao1.length > 0) {

        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));
        explosao1(inimigo1X, inimigo1Y);

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY);
    }

    if (colisao2.length > 0) {

        inimigo1X = parseInt($("#inimigo2").css("left"));
        inimigo1Y = parseInt($("#inimigo2").css("top"));
        explosao1(inimigo1X, inimigo1Y);

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo2").css("left", 694);
        $("#inimigo").css("top", posicaoY);
    }

} //Fim da função colisao()

//Explosão 1
function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div");
    $("#explosao1").css("background-image", "url(imgs/explosao.png)");
    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    var tempoExplosao = window.setInterval(removeExplosao, 1000);

    function removeExplosao() {

        div.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao = null;

    }

} // Fim da função explosao1()
