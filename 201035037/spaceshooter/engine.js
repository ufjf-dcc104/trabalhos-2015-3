
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
	this.mover = function(dt){
		//this.ax-= 0.6*(this.vx);//atrito
		//this.vx= Math.cos(this.angulo)*this.vf;
		//this.vy= Math.sin(this.angulo)*this.vf;
		this.vx= this.vx+0.5*(this.ax*dt);//vx linear
		this.x= this.x+(this.vx*dt);//deslocamento em x
		
		
		//this.ay-= 0.6*(this.vy);//atrito
		this.vy= this.vy+0.5*(this.ay*dt);//vy linear
		this.y= this.y+(this.vy*dt);//deslocamento em y
		
	};//fim mover
	
	//função de controle
	//parâmetros: tela- objeto onde está sendo desenhado o sprite
	this.controlar= function(){
	};//fim controlar
	
	
	//função de desenho
	//parametros: contexto
	this.desenhar = function(ctx){
		
		ctx.save();//salva as configurações padrão

		ctx.strokeStyle= this.strokeStyle;
		ctx.fillStyle= this.fillStyle;
		
		ctx.translate(this.x,this.y);//desloca a origem do contexo
									//(no centro de gravidade do sprite)
									
		ctx.rotate(this.angulo);///rotacionar o sprite

		ctx.beginPath();//inicia o polígono
		ctx.moveTo(-this.width/2, this.height/2);
		ctx.lineTo(this.width/2, this.height/2);
		ctx.lineTo(0, -this.height/2);
		ctx.closePath();//fecha o polígono

		ctx.fill();///preenchimento
		ctx.stroke();//contorno
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	};//fim desenhar
	
	
	this.colidiuCom = function(){};
	
};//fim Sprite


function Disparo(){
	this.x=0;
	this.y=0;
	this.angulo=0;
	
	this.width=0;
	this.height=0;
	
	this.vx=0;//vel eixo x;
	this.vy=0;//vel eixo y;
	this.vf=0;//vel resultante
	this.va=0;//vel angular;
	
	this.ax=0;//aceleração em x
	this.ay=0;//aceleração em y
	
	//funcão de movimento
	//parâmetros: dt- delta t; g- gravidade
	this.mover = function(dt){
		//this.ax-= 0.6*(this.vx);//atrito
		//this.vx= this.vx+0.5*(this.ax*dt);//vx linear
		//this.x= this.x+(this.vx*dt);//deslocamento em x
		
		
		//this.ay-= 0.6*(this.vy);//atrito
		this.vy= this.vy+(this.ay*dt);//vy linear
		this.y= this.y+(this.vy*dt);//deslocamento em y
		
	};//fim mover
	
	//função de controle
	//parâmetros: tela- objeto onde está sendo desenhado o sprite
	this.controlar= function(){
	};//fim controlar
	
	
	//função de desenho
	//parametros: contexto
	this.desenhar = function(ctx){
		
		ctx.save();//salva as configurações padrão

		ctx.strokeStyle="orange";
		ctx.lineWidth=3;
		ctx.fillStyle="yellow";
		
		ctx.translate(this.x,this.y);//desloca a origem do contexo
									//(no centro de gravidade do sprite)
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(0, -this.height/2);
		ctx.lineTo(this.width/2, 0);
		ctx.lineTo(0, this.height/2);
		ctx.lineTo(-this.width/2, 0);
		ctx.closePath();//fecha o polígono

		ctx.fill();///preenchimento
		ctx.stroke();//contorno
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	};//fim desenhar
	
	this.colidiuCom = function(){};
	
	
};//fim Disparo



function BarraEnergia(){
	this.maxWidth=0;
	this.width=0;
	
	this.desenhar= function(ctx,energiaMax,energiaAtual){
		
		ctx.strokeStyle="white";
		ctx.fillStyle="yellow";
		
		ctx.save();//salva as configurações padrão

		ctx.translate(55,6);//desloca a origem do contexo
							 //(no centro de gravidade do objeto)
		
		this.width= (100*energiaAtual)/energiaMax;
		
		//contorno: tamanho da energia máx
		ctx.lineWidth=3;
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(-this.maxWidth/2, -3);
		ctx.lineTo(this.maxWidth/2, -3);
		ctx.lineTo(this.maxWidth/2, 3);
		ctx.lineTo(-this.maxWidth/2, 3);
		ctx.closePath();//fecha o polígono
		ctx.stroke();//contorno
		
		//barra de energia: tamanho de acordo com a energia atual

		ctx.beginPath();//inicia o polígono
		ctx.lineWidth=1;
		ctx.moveTo(-this.maxWidth/2, -3);
		ctx.lineTo(this.width-this.maxWidth/2, -3);
		ctx.lineTo(this.width-this.maxWidth/2, 3);
		ctx.lineTo(-this.maxWidth/2, 3);
		ctx.closePath();//fecha o polígono
		ctx.fill();///preenchimento
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	}
	
};//fim barra de energia


function InfoLabel(tela){
	
	this.tela= tela;
	
	this.desenhar = function(ctx, vidas, pontos, gameOver){
		ctx.strokeStyle="cyan";
		ctx.fillStyle="red";
			
		ctx.save();//salva as configurações padrão

		var x = this.tela.width-50;
		var y = 20;
		
		ctx.translate(x,y);//desloca a origem do contexo
													//(no centro de gravidade do objeto)
		/*
		//desenha uma "navezinha"
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(-5,5);
		ctx.lineTo(0,-9);
		ctx.lineTo(5,5);
		ctx.closePath();//fecha o polígono

		ctx.fill();///preenchimento
		ctx.stroke();//contorno
		
		ctx.font='12px Arial';
		ctx.fillStyle= 'white';
		ctx.fillText('x '+vidas,10,5);
		*/
		ctx.font='12px Arial';
		ctx.fillStyle= 'white';
		//ctx.fillText('pontos: '+pontos,-30,20);
		ctx.fillText('pontos: '+pontos,-30,5);
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)
		
		if(gameOver){
			ctx.font='26px Arial';
			ctx.fillStyle= 'red';
			ctx.fillText('Fim de Jogo!!!',tela.width/2-80,tela.height/2);
		}
			
	}//fim desenhar
	
}//fim InfoLabel


function BancoDeImagens(){
	this.imagens= {};
	this.add= function(nome, url){
		this.imagens[nome]= new Image;
		this.imagens[nome].src= url;
	};//fim add
	this.desenhaXY= function(ctx, nome, x, y){
		ctx.drawImage(this.imagens[nome], x, y);
	};//fim desenhaXY
	
	this.desenha= function(ctx, nome, x, y, w, h, dx, dy, dw, dh){
		ctx.save();//salva as configurações padrão

		ctx.translate(x,y);//desloca a origem do contexo
									//(no centro de gravidade do sprite)
			
		ctx.drawImage(this.imagens[nome], x, y, w, h, dx, dy, dw, dh);
		ctx.restore();//restaura o último save do contexto (origem 0,0)
	};//fim desenha
	
};//fim banco de imagens
