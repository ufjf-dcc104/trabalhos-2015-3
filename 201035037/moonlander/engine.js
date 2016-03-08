function Teclado(){
	this.esq=false;
	this.cima=false;
	this.dir=false;
	this.baixo=false;
	
	this.teclaPress = function(e){
		var key = e.keyCode;
		//console.log(key);
		switch(key){
			case 37: this.esq=true;
			break;
			case 38: this.cima=true;
			break;
			case 39: this.dir=true;
			break;
			case 40: this.baixo=true;
			break;
		}
	};//fim teclaPress
	
	this.teclaUp = function(e){
		var key = e.keyCode;
		//console.log(key);
		switch(key){
			case 37: this.esq=false;
			break;
			case 38: this.cima=false;
			break;
			case 39: this.dir=false;
			break;
			case 40: this.baixo=false;
			break;
		}
	};//fim teclaPress
	
	
};//fim  Teclado


function Sprite(){
	
	this.x=0;
	this.y=0;
	this.angulo=0;
	
	this.width=0;
	this.height=0;
	
	this.energia=0;//valor da energia ("vida") do sprite
	
	this.vx=0;//vel eixo x;
	this.vy=0;//vel eixo y;
	this.vf=0;//vel resultante
	this.va=0;//vel angular;
	
	this.ax=0;//aceleração em x
	this.ay=0;//aceleração em y
	
	//funcão de movimento
	//parâmetros: dt- delta t; g- gravidade
	this.mover = function(dt,g, vento){
		//this.ax-= 0.6*(this.vx);//atrito
		this.vx= this.vx+(this.ax*dt)+vento;//vx linear
		this.x= this.x+(this.vx*dt);//deslocamento em x
		
		
		//this.ay-= 0.6*(this.vy);//atrito
		this.vy= this.vy+(g*dt)-this.ay;//vy linear
		this.y= this.y+(this.vy*dt);//deslocamento em y
		
	};//fim mover
	
	//função de controle
	//parâmetros: tela- objeto onde está sendo desenhado o sprite
	this.controlar= function(){
	};//fim controlar
	
	
	//função de desenho
	//parametros: contexto
	this.desenhar = function(ctx){
		
		ctx.strokeStyle="cyan";
		ctx.fillStyle="red";
		
		ctx.save();//salva as configurações padrão

		ctx.translate(this.x,this.y);//desloca a origem do contexo
									//(no centro de gravidade do sprite)
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

function Land(){
	
	this.width=0;
	this.height=0;
	
	this.x=0;
	this.y=0;
	
	//função de desenho
	//parametros: contexto;
	this.desenhar = function(ctx){
		ctx.strokeStyle="white";
		ctx.fillStyle="brown";
		
		ctx.save();//salva as configurações padrão

		ctx.translate(this.x,this.y);//desloca a origem do contexo
										  //(no centro de gravidade do objeto)
		ctx.beginPath();//inicia o polígono
		ctx.moveTo(-this.width/2, -this.height/2);
		ctx.lineTo(this.width/2, -this.height/2);
		ctx.lineTo(this.width/2, this.height/2);
		ctx.lineTo(-this.width/2, this.height/2);
		ctx.closePath();//fecha o polígono

		ctx.fill();///preenchimento
		ctx.stroke();//contorno
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)

	}//fim desenhar
	
	this.colidiuCom= function(){};
	
	this.sortearPosicao= function(tela){
		this.width= Math.floor((Math.random() * 20)+10);
		this.height= Math.floor((Math.random() * 50)+5);
		this.x= Math.floor((Math.random() * tela.width-this.width)+this.width);//posicionamento inicial
		this.y= tela.height-land.height/2;
	}//fim sortearPosição
};//fim Land


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
	
	this.desenhar = function(ctx, vidas, pontos, vento, gameOver){
		ctx.strokeStyle="cyan";
		ctx.fillStyle="red";
			
		ctx.save();//salva as configurações padrão

		var x = this.tela.width-50;
		var y = 20;
		
		ctx.translate(x,y);//desloca a origem do contexo
													//(no centro de gravidade do objeto)
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
		ctx.fillText('pontos: '+pontos,-30,20);
		if(vento==0)
			ctx.fillText('vento: -',-30,35);
		else if(vento<0)
			ctx.fillText('vento: <<'+(-1)*(vento*100),-30,35);
		else
			ctx.fillText('vento: >>'+(vento*100),-30,35);
		
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
