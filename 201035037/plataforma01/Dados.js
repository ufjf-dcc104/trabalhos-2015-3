/*
Mostrar na tela as informações correntes do jogo:
	pontos
	vidas
	status
*/
function Dados(){
	this.mostrarInfo= function(jogo, ctx, tela){
		var vidas= jogo.vidas;
		var pontos= jogo.pontos;
		var pause= jogo.pause;
		var fimdejogo= jogo.fimdejogo;
		
		
		ctx.save();//salva as configurações padrão

		var x = 20;
		var y = 20;
		
		ctx.translate(x,y);//desloca a origem do contexo
						   //(no centro de gravidade do objeto)
		ctx.font='bold 12px Arial';
		ctx.fillStyle= 'orange';
		ctx.fillText('Pontos: '+pontos,0,0);
		ctx.fillText("Vidas: "+vidas,0,15);
		
		if(pause && !fimdejogo){
			x= tela.width/2;
			y= tela.height/2;
			ctx.translate(x,y);//desloca a origem do contexo
								//(no centro de gravidade do objeto)
			ctx.font='bold 30px Arial';
			ctx.fillStyle= 'red';
			ctx.fillText('PAUSE',-40,-10);
		}
		
		if(fimdejogo){
			x= tela.width/2;
			y= tela.height/2;
			ctx.translate(x,y);//desloca a origem do contexo
								//(no centro de gravidade do objeto)
			ctx.font='bold 30px Arial';
			ctx.fillStyle= 'red';
			ctx.fillText('Fim de Jogo',-90,-10);
		}
		
		ctx.restore();//restaura o último save do contexto (origem 0,0)
		
	}
};