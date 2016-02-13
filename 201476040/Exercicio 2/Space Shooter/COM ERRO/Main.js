//definindo o canvas
var canvas;
var stage;

//background do jogo
var bgImg = new Image();
var bg;
var bg2Img = new Image();
var bg2;

//jogador
var pImg = new Image();
var player;
//jogador IA
var iImg = new Image();
var cImg = new Image();
var chefao;

//contadores,disparos, alertas,
var vidaImg = new Image();
var disparoImg = new Image();
var winImg = new Image();
var loseImg = new Image();
var win;
var lose;

//variaveis
var vidas = new Container(); //guarda as vidas
var disparo = new Container(); //guarda os disparos
var inimigos = new Container(); //guarda os inimigos
var vidaChefao = 100;
var score;
var gfxLoaded = 0;
var eixoX = 160;
var eixoY = 240;
var tkr = new Object();
var timerSource;

function Main()
{
	canvas = document.getElementById("Shooter");
	stage = new Stage(canvas);
	stage.mouseEventsEnabled = true;  //ativa o controle pelo mouse

	bgImg.src = "img/bg.png";
	bgImg.name = "bg";
	bgImg.onload = loadGfx; //carregando o background

	bg2Img.src = "img/bg2.png";
	bg2Img.name = "bg2";
	bg2Img.onload = loadGfx; //carregando o background2

	pImg.src = "img/player.png";
	pImg.name = "player";
	pImg.onload = loadGfx; //carregando o jogador

	iImg.src = "img/inimigo.png";
	iImg.name = "inimigo";
	iImg.onload = loadGfx;
	cImg.src = "img/chefao.png";
	cImg.name = "chefao";
	cImg.onload = loadGfx; //carregando o background //carregando os inimigos e chefão

	vidas.src = "img/vida.png";
	vidas.name = "vida";
	vidas.onload = loadGfx;
	disparo.src = "img/disparo.png";
	disparo.name = "disparo";
	disparo.onload = loadGfx;
	winImg.src = "img/win.png";
	winImg.name = "win";
	winImg.onload = loadGfx;
	loseImg.src = "img/lose.png";
	loseImg.name = "lose";
	loseImg.onload = loadGfx; //carregando as variaveis disparo, vida, alertas, etc

	Ticker.setFPS(30);
	Ticker.addListener(stage);
}

function loadGfx(e)
{
	if(e.target.name = 'bg') {bg = new Bitmap (bgImg);}
	if(e.target.name = 'bg2') {bg2 = new Bitmap (bg2Img);}
	if(e.target.name = 'player') {player = new Bitmap(pImg);}

	gfxLoaded++;

	if(gfxLoaded == 9)
	{
		addGameView();
	}
}

function addGameView() //adicionando o jogador, vidas, pontuação e o background na tela
{
	player.x = eixoX - 18.5;
	player.y = 480 +34;

	for(var i=0; i<3; i++)
	{
		var v = new Bitmap(vidas);

			v.x = 248 + (25 * i);
			v.y = 463;

			vidas.addChild(v);
			stage.uptade();
	}
	//adicionando agora o texto que mostra o score
	score = new Text('0', 'bold 14px Verdana', "#FFFFFF");
	score.maxWidth = 1000;
	score.x = 2;
	score.y = 476;

	bg2.y = -480;

	stage.addChild(bg, bg2, player, inimigos, disparo, vidas, score);
	Tween.get(player).to({y:425}, 1000).call(startGame);
}

function movePlayer(e) //movimentação do player
{
	player.x = e.stage - 18.5;
}

function tiro() //configuração do disparo do player
{
	var t = new Bitmap(disparoImg);

	t.x = player.x + 13;
	t.y = player.y - 20;

	disparo.addChild(t);
	stage.update();
}

function addInimigo()
{
	var i = new Bitmap(iImg);

	i.x = Math.floor(Math.random() * (320 - 50))
	i.y = -50

	inimigos.addChild(i);
	stage.update
}

function startGame()
{
	stage.onMouseMove = movePlayer;
	bg.onPress = tiro;
	bg2.onPress = tiro;

	Ticker.addListener(tkr, false);
	tkr.tick = update;

	timerSource = setInterval('addInimigo()', 1000);
}

function update()
{
	bg.y += 5;
	bg2.y += 5;

	if(bg.y >= 480)
	{
		bg.y = -480;
	}
	else if(bg2.y >= 480)
	{
		bg2.y = -480;
	}
	//move os tiros na tela e remove os que nao estão visiveis
	for (var i = 0; i < disparos.children.length; i--) 
	{ 
		disparos.children[i].y -= 10;
		
		if (disparos.children[i].y < - 20) 
		{
			disparos.removeChildAt(i);
		}
	}

	if (parseInt(score.text) >= 500 && chefao == null) 
	{
		chefao = new Bitmap (cImg);

		chefao.x = eixoX - 90;
		chefao.y = -183;

		stage.addChild(chefao);
		Tween.get(chefao).to({y:40}, 2000);
	}

	for (var j = 0; j < inimigos.children.length; j++) 
	{
		inimigos.children[j].y += 5;

		if (inimigos.children[j].y > 480 + 50)
		{
			inimigos.removeChildAt(j);
		}
	}
	
	for (var k = 0; k < disparos.children.length; k++) 
	{
		if(disparos.children[k].x >= inimigos.children[j].x >= chefao.x && disparos.children[k].x + 11 < chefao.x + 183 && disparos.children[k].y + chefao.y + 162)
		{
			disparos.removeChildAt(k);
			vidaChefao--;
			stage.uptade();
			score.text = parseFloat(score.text + 50);
		}		
	}
	
	if(inimigos.hitTest(player.x, player.y) || inimigos.hitTest(player.x + 37, player.y))
	{
		inimigos.removeChildAt(j);
		vidas.removeChildAt(vidas.length);
		player.y = 480 + 34;
		Tweem.get(player).to({y:425}, 500);
	}
	//verifica se ganhou
	if(chefao != null && vidaChefao <= 0)
	{
		alert('win');
	}
	//verifica se perdeu
	if(vidas.children.length <= 0)
	{
		alert('lose');
	}
}

function alert(e)
{
	stage.onMouseMove = null;
	bg.onPress = null;
	bg2.onPress = null;

	Ticker.removeListener(tkr);
	tkr = null

	timerSource = null;

	if(e == 'win')
	{
		win = new Bitmap(winImg);
		win.x = eixoX - 64;
		win.y = eixoY - 23;
		stage.addChild(win);
		stage.removeChild(inimigos, chefao);
	}
	else
	{
		lose = new Bitmap(loseImg);
		lose.x = eixoX - 64;
		lose.y = eixoY - 23;
		stage.addChild(lose);
		stage.removeChild(inimigos, player);
	}

	bg.onPress = function(){window.location.reload();};
	bg2.onPress = function(){window.location.reload();};
	stage.update()
}

