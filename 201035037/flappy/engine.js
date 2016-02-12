
function Sprite(){
	
	this.x=0;
	this.y=0;
	this.angulo=0;
	
	this.width=0;
	this.height=0;
	
	this.energia=0;//valor da energia ("vida") do sprite
	
	this.fillStyle= "red";
	this.strokeStyle= "cyan";
	
	this.vx=0;//vel eixo x;
	this.vy=0;//vel eixo y;
	this.vf=0;//vel resultante
	this.va=0;//vel angular;
	
	this.ax=0;//aceleração em x
	this.ay=0;//aceleração em y
	
	//funcão de movimento
	//parâmetros: dt- delta t; g- gravidade
	this.mover = function(dt,g){
		
		if(this.vy>=0) this.angulo= 0.75*Math.PI;
		
		this.vy= this.vy+ (g+this.ay)*dt;//vy linear
		this.y= this.y+ (this.vy*dt) + 0.5*g*dt*dt;//deslocamento em y
		
	};//fim mover
	
	//função de controle
	//parâmetros: tela- objeto onde está sendo desenhado o sprite
	this.controlar= function(){
	};//fim controlar
	
	
	//função de desenho
	//parametros: contexto
	this.desenhar = function(ctx){
		
		ctx.strokeStyle= this.strokeStyle;
		ctx.fillStyle= this.fillStyle;
		ctx.lineWidth=3;
		
		
		ctx.save();//salva as configurações padrão

		ctx.translate(this.x,this.y);//desloca a origem do contexo
									//(no centro de gravidade do sprite)
		ctx.rotate(this.angulo);
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(-this.width/2, this.height/2);
		ctx.lineTo(this.width/2, this.height/2);
		ctx.lineTo(0, -this.height/2);
		ctx.closePath();//fecha o polígono

		ctx.fill();///preenchimento
		ctx.stroke();//contorno
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	};//fim desenhar
	
};//fim Sprite


function Obstaculo(){
	
	this.x=0;
	this.y=0;
	
	this.width=0;//largura
	this.gapSize=0;//tamanho do gap
	this.gapBegin=0;//altura até o inicío do gap
	
	this.fillStyle= "#DEB887";
	this.strokeStyle= "#8B6914";
	
	this.ativo= true;//indica se o objeto ainda não interagiu com o flappy
	
	this.vx=0;//vel eixo x;
	
	//funcão de movimento
	//parâmetros: dt- delta t; g- gravidade
	this.mover = function(dt){
		
		this.x= this.x+ (this.vx*dt);
		
	};//fim mover
	
	//função de controle
	//parâmetros: tela- objeto onde está sendo desenhado o sprite
	this.controlar= function(){
	};//fim controlar
	
	
	//função de desenho
	//parametros: contexto, tela,tamanho do gap
	this.desenhar = function(ctx,tela){
		
		ctx.strokeStyle= this.strokeStyle;
		ctx.fillStyle= this.fillStyle;
		
		ctx.lineWidth=3;
		
		ctx.save();//salva as configurações padrão

		ctx.translate(this.x,this.gapBegin+this.gapSize/2);//desloca a origem do contexo
													  //(no centro de gravidade do sprite)
		
		
		ctx.beginPath();//inicia o polígono (parte de cima)
		ctx.moveTo(-this.width/2, -this.gapSize/2);
		ctx.lineTo(this.width/2, -this.gapSize/2);
		ctx.lineTo(this.width/2, -(this.gapBegin+this.gapSize));
		ctx.lineTo(-this.width/2, -(this.gapBegin+this.gapSize));
		ctx.closePath();//fecha o polígono

		ctx.fill();//preenchimento
		ctx.stroke();//contorno
		
		ctx.beginPath();//inicia o polígono (parte de baixo)
		ctx.moveTo(-this.width/2, this.gapSize/2);
		ctx.lineTo(this.width/2, this.gapSize/2);
		ctx.lineTo(this.width/2, tela.height-(this.gapBegin+this.gapSize/2));
		ctx.lineTo(-this.width/2, tela.height-(this.gapBegin+this.gapSize/2));
		ctx.closePath();//fecha o polígono

		ctx.fill();//preenchimento
		ctx.stroke();//contorno
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	};//fim desenhar
	
	this.colidiuCom= function(){};
	
};//fim Obstaculo


function InfoLabel(tela){
	
	this.tela= tela;
	
	this.desenhar = function(ctx, vidas, pontos, gameOver){
		ctx.strokeStyle="cyan";
		ctx.fillStyle="ywllow";
			
		ctx.save();//salva as configurações padrão

		var x = this.tela.width-50;
		var y = 20;
		
		ctx.translate(x,y);//desloca a origem do contexo
													//(no centro de gravidade do objeto)
		//desenha um "spritezinho"
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(0,-5);
		ctx.lineTo(5,5);
		ctx.lineTo(-5,5);
		ctx.closePath();//fecha o polígono

		ctx.fill();//preenchimento
		ctx.stroke();//contorno
		
		ctx.font='12px Arial';
		ctx.fillStyle= 'white';
		ctx.fillText('x '+vidas,10,5);
		ctx.fillText('pontos: '+pontos,-30,20);
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)
		
		if(gameOver){
			ctx.font='26px Arial';
			ctx.fillStyle= 'red';
			ctx.fillText('Fim de Jogo!!!',tela.width/2-80,tela.height/2);
		}
			
	}//fim desenhar
	
}//fim InfoLabel