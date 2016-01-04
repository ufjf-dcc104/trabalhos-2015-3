// Alguns ângulos constantes //
const PI2     = Math.PI / 2;	//< 90º
const PI4     = Math.PI / 4;	//< 45º
const RAD4DEG = Math.PI / 180;  //< radianos por grau
const DEG4RAD = 180 / Math.PI;  //< graus por radiano
///////////////////////////////

function Text(font, size, rgb) {
    this.font = font     || "Verdana";
    this.size = size     || 24;
    this.color = rgb     || "#008000";
    
	    this.raster = function(ctx, text, x, y) {
	        ctx.font = "" + this.size + "px " + this.font;
	        ctx.fillStyle = this.color;
	        ctx.fillText(text, x, y);
	    }
}

var obstaculos = new Array(10);
var pontosBool = new Array(10);

function start() {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	
	const WIDTH = canvas.offsetWidth;
	const HEIGHT = canvas.offsetHeight;
	
	const FPS = 60;
	const DT = 1/FPS;
	const G = -900;	
	
	var pos = 700;
	var posy = 0;
	var posObj1 = -135;
	var posObj2 = 295;
	for (var i = 0; i < 10 ; i++) {
		posy = Math.floor((Math.random() * 50) + 50);
		if (Math.floor((Math.random() * 10) + 1) <= 5)
		{
			posObj1 -= posy;
			posObj2 -= posy;
		}
		else
		{
			posObj1 += posy;
			posObj2 += posy;
		}
		pontosBool[i] = true;
		obstaculos[i] = new Obstaculo(new Point(pos, posObj1), new Size(300, 60),0, "img/cano.png");	
		i++;
		pontosBool[i] = true;
		obstaculos[i] = new Obstaculo(new Point(pos, posObj2), new Size(300, 60),0, "img/cano.png");

		//console.log(pos);
		pos += 200;
		posObj1 = -135;
		posObj2 = 295;
	};

	var bird = new Sprite(new Point(WIDTH/2, HEIGHT/2), new Size(40, 45) , 0, "img/pa.png");	

	var obj1 = new Obstaculo(new Point(( WIDTH/2 )+ 15, 295), new Size(300, 50), 0, "img/cano.png");	
	var obj2 = new Obstaculo(new Point(bird.coord.x - bird.size.w/2, 150), new Size(20, 20));
	var passo = false;
	var test = new Text();
	var pontos = new Text();
	var score = 0;


	var loop = function() {
		// Main Loop
		ctx.clearRect(0, 0, WIDTH, HEIGHT);			

		bird.move(DT, G);
		if(bird.coord.y + (bird.size.w/2)  >= HEIGHT) {
			//alert("You Lost!!");
			start = false;
			bird.vel.vy = 0;
			score = 0;
			bird.coord.x = WIDTH/2;
			bird.coord.y = HEIGHT/2;
			var pos = 700;
			for (var i = 0; i < 10 ; i++)
			{
				obstaculos[i].coord.x = pos ;
				pontosBool[i] = true;
				i++;
				obstaculos[i].coord.x = pos ;
				pontosBool[i] = true;
				pos += 200;
			}
			// RESET HERE
		}
		
		if (start){
			for (var i = 0; i < 10; i++) {
				
				posObj1 = -135;
				posObj2 = 295;

				if( (obstaculos[i].coord.x < bird.coord.x + bird.size.w)  && (obstaculos[i].coord.x > bird.coord.x - bird.size.w ))
				{

					if (pontosBool[i])
					{
						console.log("Passo");
						score++;
						pontosBool[i] = false;
						pontosBool[i+1] = false;
					} 

					
					if (bird.collision(obstaculos[i] , obstaculos[i+1]) )
					{
						start = false;
						bird.vel.vy = 0;
						score = 0;
						bird.coord.x = WIDTH/2;
						bird.coord.y = HEIGHT/2;
						var pos = 700;
						for (var i = 0; i < 10 ; i++)
						{
							obstaculos[i].coord.x = pos ;
							pontosBool[i] = true;
							i++;
							obstaculos[i].coord.x = pos ;
							pontosBool[i] = true;
							pos += 200;
						}
						break;
					}
					
				}				

				if (obstaculos[i].coord.x > -100)
				{
					obstaculos[i].move(DT, G);
					obstaculos[i].draw(ctx);	
					obstaculos[i+1].move(DT, G);
					obstaculos[i+1].draw(ctx);							
				}
				else
				{			
					posy = Math.floor((Math.random() * 50) + 50);
					if (Math.floor((Math.random() * 10) + 1) <= 5)
					{
						posObj1 -= posy;
						posObj2 -= posy;
					}
					else
					{
						posObj1 += posy;
						posObj2 += posy;
					}
					obstaculos[i].coord.x = 900 ; 	
					obstaculos[i+1].coord.x = 900 ; 
					obstaculos[i].coord.y = posObj1 ; 	
					obstaculos[i+1].coord.y = posObj2 ;	
					pontosBool[i] = true;
					pontosBool[i+1] = true;		

				}
				i++;
			};	
		}
		else
		{
			bird.vel.vy = -9;
		}
		test.raster(ctx,"Score:", 10, 30);	
		pontos.raster(ctx, score, 100, 30);		
		bird.draw(ctx);
	}

	setInterval(loop, 1000/FPS);
	
	var down = false;

	addEventListener("keydown", function(e){
		if(e.keyCode == 32 && !down) {
			start = true;
			bird.vel.vy = -10 * Math.sqrt(-G);
			down = true;
		}
	});

	addEventListener("keyup", function(e){
		if(e.keyCode == 32) {
			down = false;
		}
	});

	
}