// BANCO DE IMAGENS: armazena meus sprites
function BancoDeImagens () {
	this.imagens = {};
	this.add = function(nome,url){
		this.imagens[nome] = new Image();
		this.imagens[nome].src = url;
	};
	this.desenhaXY =  function(ctx,nome,x,y) {
		ctx.drawImage(this.imagens[nome],x,y);
	};
	this.desenha = function (ctx, nome, x, y, w, h, dx, dy, dw, dh) {
		ctx.drawImage(this.imagens[nome],x,y,w,h,dx,dy,dw,dh);
	};
};
