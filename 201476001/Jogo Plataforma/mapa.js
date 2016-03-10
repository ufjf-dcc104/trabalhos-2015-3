var mapa = [];
mapa.img = new Image();
mapa.img.src = "img/platformer_32_mini.png";

nuvem = new Image();
nuvem.src = "img/items_spritesheet.png";


for (var l = 0; l < 10; l++) {
	mapa[l] = [];
	for (var c = 0; c < 100; c++){
		random = Math.floor(Math.random()*15);
		mapa[l][c] = 0;
		//NUVENS
		if(random==6 && l>0 && l<CONST_CHAO-2){
			if(mapa[l-1][c]!=6){
				mapa[l][c]=6;
				c+=10;
			}
		}	

		//CERCA
		if(random==5 && l==CONST_CHAO-1){
			mapa[l][c] = 5;
			continue;
		}

		//OBSTÁCULO PARA PULAR
		if(random==7 && l==CONST_CHAO-1){
			mapa[l][c] = 7;
			mapa[l][c+1] = 7;
			c++;
			continue;
		}

		//ARVORE
		if(random==3 && l==CONST_CHAO-2){
			mapa[l][c] = 3;
			continue;
		}

		if(l==CONST_CHAO){

			if(random==4) {
				//RIO
				mapa[l][c] = 4;
				continue;
			}else{
				mapa[l][c] = 1;
				continue;
			}	
		}

		//DETALHES DO SUBSOLO
		if(random==2 && l>CONST_CHAO){
			mapa[l][c] = 2;
			continue;
		}


		//AREAS SUSPENSAS
		if(random==8 && l>CONST_CHAO-4 && l<CONST_CHAO-2){
			mapa[l][c] = 8;
			continue;
		}

		if(l>CONST_CHAO){
			mapa[l][c] = 1;
			continue;
		}

	}
}


function desenharMapa(){

	for (var l = 0; l < 10; l++) {
		for (var c = 0; c < 100; c++){
			if(l==CONST_CHAO){
				desenhaChao(l , c, IMG_CHAO_X , IMG_CHAO_Y);
				continue;
			}

			if(l>CONST_CHAO){
				desenhaChao(l , c, IMG_SUBSOLO_X , IMG_SUBSOLO_Y);
				continue;
			}	
			ctx.strokeStyle = "white";
			//ctx.strokeRect(c*65, l*65, 65, 65);		
		}
	}

}	

function desenhaChao(l , c, xImg , yImg){
	ctx.drawImage(mapa.img, xImg*65,yImg*65, 55, 65,c*65, l*65, 65, 65);
}

function desenhaArvore(){

	for (var l = 4; l < 6; l++) {
		for (var c = 0; c < 100; c++){
			if(mapa[l][c]==3){
				
				ctx.drawImage(mapa.img, IMG_ARVORE_X*65,IMG_ARVORE_Y*65, 65, 130,c*65, l*65, 65, 130);
				ctx.drawImage(mapa.img, IMG_ARVORE_X*65,IMG_ARVORE_Y*65, 65, 70, c*65.5, (l+1)*65, 65, 70);
			}

			ctx.strokeStyle = "white";
			//ctx.strokeRect(c*65, l*65, 65, 65);	
		}
	}	
}

function desenhaSubsolo(){
	for (var l = 6; l < 10; l++) {
		for (var c = 0; c < 100; c++){
			if(mapa[l][c]==2){
				ctx.drawImage(mapa.img, IMG_INICIO_X*65,IMG_INICIO_Y*65, 60, 65,c*65, l*65, 65, 70);

				c++;
				for (var i = 0; i <= 4; i++) {
					ctx.drawImage(mapa.img, IMG_CHAO_X*65,IMG_CHAO_Y*65, 60, 65,c*65, l*65, 65, 70);
					c++;
				};

				//desenhaChao(l , c, IMG_SUBSOLO_X , IMG_SUBSOLO_Y);
				ctx.drawImage(mapa.img, IMG_FIM_X*65,IMG_FIM_Y*65, 60, 65,c*65, l*65, 65, 70);

				c+=5;

			}

			ctx.strokeStyle = "white";
			//ctx.strokeRect(c*65, l*65, 65, 65);	
		}
	}	
}

function desenhaMar(){
	for (var l = 6; l < 10; l++) {
		for (var c = 0; c < 100; c++){
			if(mapa[l][c]==4){
				
				ctx.clearRect(c*65,l*65,195,260);
				ctx.fillStyle="#87CEFF";
				ctx.fillRect(c*65,l*65,195,260);

				for(var i = c;i < c+3; i++){
					ctx.drawImage(mapa.img, IMG_PONTE_X*65,IMG_PONTE_Y*65, 60, 22,i*65, l*65, 65, 22);
					ctx.drawImage(mapa.img, IMG_MAR_X*65,IMG_MAR_Y*65, 60, 65,i*65, (l+1)*65, 65, 72);

					for(var j=CONST_CHAO+2; j<10; j++){
						ctx.drawImage(mapa.img, IMG_MEIO_MAR_X*65,IMG_MEIO_MAR_Y*65, 60, 65,i*65, j*65, 65, 72);
					}
					
				}
				
				
			}

			ctx.strokeStyle = "white";
			//ctx.strokeRect(c*65, l*65, 65, 65);	
		}
	}	
}

function desenhaCerca(){
	var l=CONST_CHAO-1;
	for (var c = 0; c < 100; c++){

		if(mapa[l][c]==5){
			ctx.drawImage(mapa.img, IMG_CERCA_X*65,IMG_CERCA_Y*65, 65, 65,c*65, l*65, 65, 65);
			ctx.drawImage(mapa.img, IMG_CERCA_X*65,IMG_CERCA_Y*65, 65, 65,(c+1)*65, l*65, 65, 65);
		}

		ctx.strokeStyle = "white";
		//ctx.strokeRect(c*65, l*65, 65, 65);	
	}	
}

function desenhaNuvem(){
	for (var l = 0; l < CONST_CHAO-1; l++) {
		for (var c = 0; c < 100; c++){

			if(mapa[l][c]==6){
				ctx.drawImage(nuvem, IMG_NUVEM_X*65,IMG_NUVEM_Y*65, 130, 65,c*65, l*65, 130, 65);
			}

			ctx.strokeStyle = "white";
			//ctx.strokeRect(c*65, l*65, 65, 65);	
		}
	}
}

function desenhaInicioFim(){

	for(var l=CONST_CHAO+1; l<10; l++){
		for(var c=1; c<10; c++){

			if(l==CONST_CHAO+1)
				ctx.drawImage(mapa.img, IMG_MAR_X*65,IMG_MAR_Y*65, 60, 65,c*-65, l*65, 65, 72);
			else{
				for(var j=CONST_CHAO+2; j<10; j++){
					ctx.drawImage(mapa.img, IMG_MEIO_MAR_X*65,IMG_MEIO_MAR_Y*65, 60, 65,c*-65, l*65, 65, 72);
				}
			}		
				
		}
	}

	for(var l=CONST_CHAO+1; l<10; l++){
		for(var c=100; c<150; c++){

			if(l==CONST_CHAO+1)
				ctx.drawImage(mapa.img, IMG_MAR_X*65,IMG_MAR_Y*65, 60, 65,c*65, l*65, 65, 72);
			else{
				for(var j=CONST_CHAO+2; j<10; j++){
					ctx.drawImage(mapa.img, IMG_MEIO_MAR_X*65,IMG_MEIO_MAR_Y*65, 60, 65,c*65, l*65, 65, 72);
				}
			}		
				
		}
	}
}

function desenhaObstaculo(){
	var l=CONST_CHAO-1;
	for (var c = 0; c < 100; c++){

		if(mapa[l][c]==7){
			ctx.drawImage(mapa.img, IMG_OBS_X*65,IMG_OBS_Y*65, 65, 65,c*65, l*65, 65, 65);
		}

		ctx.strokeStyle = "white";
		//ctx.strokeRect(c*65, l*65, 65, 65);	
	}	
}

function desenhaAreasSuspensas(){
	for (var l = 2; l < 4; l++) {
		for (var c = 0; c < 100; c++){
			if(mapa[l][c]==8){
				
				
				ctx.drawImage(mapa.img, IMG_INICIO_X*65,IMG_INICIO_Y*65, 60, 65,c*65, l*65, 65, 70);
				
				c++;
				ctx.drawImage(mapa.img, IMG_CHAO_X*65,IMG_CHAO_Y*65, 60, 65,c*65, l*65, 65, 70);
				mapa[l][c]=8;			

				c++;
				ctx.drawImage(mapa.img, IMG_FIM_X*65,IMG_FIM_Y*65, 60, 65,c*65, l*65, 65, 70);
				mapa[l][c]=8;
			
				c+=5;
			}

			ctx.strokeStyle = "white";
		}
	}	
}

function desenhaPorta(){
		ctx.drawImage(mapa.img, 10*65,6*65, 65, 115,90*65, 4.2*65, 65, 115);
}
