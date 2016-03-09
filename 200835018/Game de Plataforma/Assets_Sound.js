Assets_Sound = function(){
	
	this.sons = {};
	this.ativo= {};
	this.canais = [];
	this.qtdCanais = 10;
	
	for (var i = 0 ; i < this.qtdCanais; i++) {
		this.canais[i] = {
			audio: new Audio(),
			fim: -1
		}
	};

	this.load = function(nome, src){
		this.sons[nome] = new Audio(src);
		this.sons[nome].load();
	}
	
	/*Essa função é exclusiva da música tema da fase. Para ela funcionar, é necessário que a música tema seja a primeira a ser tocada,
	 no jogo ou na fase. E é necessário também, saber sua duração (em segundos). Sua posição no vetor de canais deve ser a zero.*/
	this.reiniciaMusicaPrincipal = function(duracao){
		if(this.canais[0].audio.duration == duracao && this.canais[0].audio.ended){
			this.canais[0].audio.play();
		}
	}
	
	/*Essa função é exclusiva da música para quando o personagem morre e a música tema da fase ou do jogo deve ser reiniciada.
	 Para ela funcionar, é necessário que a música tema seja a primeira a ser tocada, no jogo ou na fase. E é necessário também, saber sua duração
	 (em segundos). Sua posição no vetor de canais deve ser a 1.*/
	this.reiniciaMusicaPrincipal_Morte = function(duracao){
		if(this.canais[1].audio.duration == duracao && this.canais[1].audio.ended){
			this.canais[0].audio.play();
		}
	}
	
	this.terminouMusicaStageComplete = function(duracao){
		
			var musicaParada = false;
		
			if(this.canais[1].audio.duration == duracao && this.canais[1].audio.ended){
				musicaParada = true;
				return musicaParada;
			}else{
				musicaParada = false;
				return musicaParada;
			}
	}
	
	this.terminouMusicaMortePersonagem = function(duracao){
		
			var musicaParada = false;
		
			if(this.canais[1].audio.duration == duracao && this.canais[1].audio.ended){
				musicaParada = true;
				return musicaParada;
			}else{
				musicaParada = false;
				return musicaParada;
			}
	}
	
	this.stop = function(nome){
		
		for(i = 0; i < this.qtdCanais; i++){
			var tocador = this.canais[i];
			tocador.audio.src = this.sons[nome].src;
			tocador.audio.pause();
			break;
		}
	}

	this.play = function(nome,volume){
		
		var agora = new Date();
		
		for(i = 0; i < this.qtdCanais; i++){
			
			var canal = this.canais[i];
			
			if(canal.fim < agora.getTime()){
				canal.audio.src = this.sons[nome].src;
				canal.audio.volume = volume?volume:1; 
				canal.fim = agora.getTime() + this.sons[nome].duration * 1000;
				canal.audio.play();
				break;
			}
		}
	};
}