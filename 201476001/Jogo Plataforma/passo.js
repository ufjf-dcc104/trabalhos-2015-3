function passo(){

	ctx.fillStyle = "#87CEFF";//"#A0F3F9";
	ctx.fillRect(0,0, tela.width, tela.height);
	ctx.save();
	ctx.scale(0.6,0.6);
	ctx.translate(300-pc.x, 0);
	
	
	desenhaEstruturaJogo();
	funcoesSprites();
	funcoesSpritesHeroi();
	funcoesSpritesTramp();
	funcoesSpritesChaves();
	funcoesSpritesMoedas();
	desenhaPorta();

	ctx.restore();

	if(pc.x>=6150 && numVida>0 && numChavesColetadas==numChaves){
		textoJogo("Parabéns!<br/>Você ganhou!");
	}else if(numVida<=0){
		desenhaVida();
		textoJogo("Você Perdeu!");
	}	
}

function funcoesSpritesTramp (){
	//trampolim
	for(var sp in spritesTramp){
		var sprite = spritesTramp[sp];
		sprite.moverCartGrid(dt,200, mapa);
		sprite.colidiuCom(pc);
		sprite.desenhar(ctx);
	}
}

function funcoesSprites (){
	//abelha
	for(var sp in sprites){
		var sprite = sprites[sp];
		if(numVida>0){
			sprite.controlar();
			sprite.moverCartGrid(dt,200, mapa);
			sprite.colidiuCom(pc);
		}
		sprite.desenhar(ctx);
	}
}

function funcoesSpritesHeroi (){
	if(numVida>0){
		pc.controlar();
		pc.moverCartGrid(dt,200, mapa);
	}
	pc.desenhar(ctx);
}

function funcoesSpritesMoedas (){
	for(var sp in spritesMoedas){
		var sprite = spritesMoedas[sp];
		//sprite.moverCartGrid(dt,200, mapa);
		sprite.desenhar(ctx);
		if(sprite.colidiuCom(pc))
			spritesMoedas.splice(sp,1);
	}
}

function funcoesSpritesChaves (){
	for(var sp in spritesChaves){
		var sprite = spritesChaves[sp];
		sprite.desenhar(ctx);
		if(sprite.colidiuCom(pc))
			spritesChaves.splice(sp,1);
	}
}

function desenhaEstruturaJogo(){
	
	desenhaInicioFim();
	desenhaNuvem();
	desenhaCerca();
	desenhaArvore();
	desenharMapa();
	desenhaMar();
	desenhaSubsolo();
	desenhaObstaculo();
	desenhaAreasSuspensas();
	desenhaMoedasColetadas();
	desenhaBarra();
	desenhaVida();
}

function rodarJogo(){
	var buttonInicio = document.getElementById('buttonInicio');

	if(pause){
		modal.style.display = "block";
	}else{
		passo();
		inicioJogo=true;
		span.style.display = "block";
	}

	if(pause && inicioJogo){
		buttonInicio.innerHTML="Retornar ao Jogo";
		span.style.display = "none";
	}
}



