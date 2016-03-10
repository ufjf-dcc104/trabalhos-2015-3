var CONST_CHAO=6;

var IMG_CHAO_X=7.9;
var IMG_CHAO_Y=8.9;

var IMG_SUBSOLO_X=9;
var IMG_SUBSOLO_Y=12.2;

var IMG_INICIO_X=8.9;
var IMG_INICIO_Y=11.1;

var IMG_FIM_X=9;
var IMG_FIM_Y=8.9;

var IMG_ARVORE_X = 13;
var IMG_ARVORE_Y = 11;

var IMG_MAR_X = 6.8;
var IMG_MAR_Y = 9;

var IMG_MEIO_MAR_X = 7.8;
var IMG_MEIO_MAR_Y = 3.5;


var IMG_PONTE_X = 4.55;
var IMG_PONTE_Y = 11.8;

var IMG_CERCA_X = 7.8;
var IMG_CERCA_Y = 1.2;

var IMG_CERCA_QUEB_X = 10;
var IMG_CERCA_QUEB_Y = 1.2;

var IMG_NUVEM_X = 0;
var IMG_NUVEM_Y = 0;

var IMG_OBS_X=0;
var IMG_OBS_Y=12.2;

var random=0;

var energiaPulando=0;

var numMoedasColetadas=0;
var moedaImg=new Image();
moedaImg.src="img/hud_coins.png";

var numVida=3;
var vidaImg=new Image();
vidaImg.src="img/hud_heartFull.png";

var semVidaImg=new Image();
semVidaImg.src="img/hud_heartEmpty.png";

var barraImg=new Image();
barraImg.src="img/barra.png";

var tamBarraVida=350;
var subbarraImg=new Image();
subbarraImg.src="img/subbarra1.png";

var pauseImg=new Image();
pauseImg.src="img/pause.png";

var numChaves=0;

var numChavesColetadas=0;

var tramp=false;

var textoHistoria="O seu inimigo armou uma emboscada,<br/> para você conseguir fugir precisa pegar <br/>as chaves e abrir a porta que está no fim <br/>da floresta!<br/><br/><button class='buttonModal' onclick='voltar();'>Voltar</button>";

var textoMenu="<button id='buttonInicio' class='buttonModal' onclick='iniciarJogo();'>Iniciar o Jogo</button><br/><br/><button class='buttonModal' onclick='historiaJogo();'>História</button><br/><br/><button class='buttonModal'  onclick='comoJogar();'>Como Jogar</button><br/><br/>";

var textoComoJogar="<img src='img/setas.png'><button class='buttonModal' onclick='voltar();'>Voltar</button>";


