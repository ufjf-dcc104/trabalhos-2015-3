
function iniciarJogo(){
	
	if(numVida == 0){
		location.reload();
	}
	pause=false;
	modal.style.display = "none";
	span.style.display = "block";
}

function historiaJogo(){conteudo.innerHTML = textoHistoria;}

function voltar(){conteudo.innerHTML = textoMenu;}	

function comoJogar(){conteudo.innerHTML = textoComoJogar;}

function textoJogo(texto){
	
	texto +="<br/><br/><button class='buttonModal' onclick='iniciarJogo()'>Retornar ao Jogo</button>";
	
	conteudo.innerHTML = texto;
	modal.style.display = "block";
	pause=true;
}

function pauseJogo(){
	pause=true;
}