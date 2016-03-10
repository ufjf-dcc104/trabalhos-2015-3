function desenhaVida(){
	var dist=600;
	
	for (var i = 0; i <numVida; i++) {
		ctx.drawImage(vidaImg, 0, 0, 65, 65, (pc.x+dist) , 25, 40, 40);
		dist-=40;
	};

	for (var i = numVida; i <3; i++) {
		ctx.drawImage(semVidaImg, 0, 0, 65, 65, (pc.x+dist) , 25, 40, 40);
		dist-=40;
	};
}

function desenhaBarra(){

	if(tamBarraVida<=0 && numVida>0){
		tamBarraVida=350;
		numVida--;
		pc.x=25;
		//pc.f = 1; 
		//pc.p = 1;
		pc.vx=0;

		numMoedas=0;
		numMoedasColetadas=0;
		criaMoedas();

		numChaves=0;
		numChavesColetadas=0;
		criaChaves();
		
		textoJogo("Você Morreu!<br/> Você tem "+numVida+" vida(s)!");
		
	}else if(numVida<=0){
		tamBarraVida=0;
	}

	ctx.drawImage(barraImg, 0, 0, 350, 70, (pc.x+25) , 20, 350, 40);
	ctx.drawImage(subbarraImg, 0, 0, 350, 70, (pc.x+42) , 30, tamBarraVida, 40);
}

