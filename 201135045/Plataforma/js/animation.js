/**
 *	@class ImageBase
 *	@brief Base de imagens do projeto
 */
function ImageBase() {
	var data = {};
	//! Adiciona nova imagem na base dado uma chave e a url da imagem
	this.add = function(key, url) {
		data[key] = new Image();
		data[key].src = url;
	}
	//! Retorna a imagem chaveada em key
	this.get = function(key) {
		return data[key];
	}
	//! Imprime base
	this.print = function() {
		for(key in data) console.log(key + " --> " + data[key].src);
	}
}

//! Banco de sprite sheets global para as animações
var sheets = new ImageBase();

//! Modos de repetição da animação
const NO_REPEAT = 1;
const CYCLIC	= 2;
const RETURN	= 3;

/**
 *	@class Animation
 *	@brief Armazena os dados necessários de uma animação
 */
function Animation(keySheet, framesWidth, framesHeight, time) {
	this.sheet  = keySheet;
	this.width  = framesWidth;
	this.height = framesHeight;
	this.time   = time;
	this.event  = null;
	this.params = null;
	
	this.frames = [];
	this.timer  = 0.0;
	this.next   = this; // cyclic
	
	Object.freeze(this.sheet);
	Object.freeze(this.width);
	Object.freeze(this.height);
	Object.freeze(this.time);
	
	this.frame = function(index) {
		return {x: this.frames[index].x, y: this.frames[index].y, w: this.width, h: this.height };
	}
	
	this.ended  = function()	{ return (Math.floor(this.timer) >= this.frames.length); }
	this.update = function(dt) 	{ this.timer += (this.frames.length / this.time) * dt; }
}

/**
 *	@class Animator
 *	@brief Responsável pelas animações das personagens
 */
function Animator(auto) {
	this.animations = {};
	this.current = null;
	this.lock = false;
	this.auto = auto || true;
	
	//! Registra uma nova animação, passando sua chave/nome/id; a chave da sprite sheet que contém os frames da nova animação;
	//! o número de frames; o tamanho de cada frame em pixels (largura e altura); a posição do frame inicial na imagem (x, y);
	//! o tempo, em segundos, de uma execução da animação;
	this.createAnimation = function(key, keySheet, numberFrames, framesWidth, framesHeight, _x0, _y0, _t, _mode) {
		var animation = new Animation( keySheet, framesWidth, framesHeight, (_t || numberFrames) );
		for(var i = 0; i < numberFrames; i++)
			animation.frames.push( {x: (_x0 || 0) + i * framesWidth, y: _y0 || 0} );
		
		if(_mode) {
			if(_mode == RETURN) {
				for(var i = numberFrames - 1; i >= 0; i--)
					animation.frames.push( animation.frames[i] );
			} else if(_mode == NO_REPEAT) {
				animation.next = null;
			}
		}

		this.animations[key] = animation;
	}
	
	//! Configura a animação atual
	this.executeAnimation = function(key) {
		// verifica se já está em execução
		if(!Object.is(this.current, this.animations[key])) {
			if(this.current) {
				// reseta a animação atual
				this.current.timer = 0.0;
			}
			this.current = this.animations[key];
		}
	}
	
	//! Desenha o próximo quadro da animação atual
	this.drawFrame = function(ctx, dt) {
		if(!this.current) return;
		
		// Vai automaticamente para o próximo frame
		if(this.auto) this.current.update(dt);
		
		var index;
		if(this.current.ended()) {
			this.lock = false;
			this.current.timer = 0.0;
			
			// chama o evento
			if(this.current.event)
				this.current.event(this.current.params);
			
			// vai para o próximo, se houver, ou trava
			if(this.current.next) {
				this.current = this.current.next;
				index = 0;
			} else this.lock = true;
		}
		
		if(this.lock) { 
			index = this.current.frames.length - 1;
		} else {
			index = Math.floor(this.current.timer) % this.current.frames.length;
		}

		var frame = this.current.frame(index);
		ctx.drawImage(sheets.get(this.current.sheet),
				frame.x, frame.y, frame.w, frame.h, 
				-frame.w/2, -frame.h/2, frame.w, frame.h);
	}
	
	this.nextFrame = function(dt) {
		if(!this.current) return;
		this.current.update(dt);
	}
	
	this.clone = function() {
		var copy = new Animator(this.auto);
		var keys = Object.keys(this.animations);

		keys.forEach(function(key){
			var self = this.animations;
			
			var animation = new Animation(self[key].sheet, self[key].width, self[key].height, self[key].time);
			animation.event = self[key].event;
			animation.params = self[key].params;
			animation.frames = self[key].frames;
			
			if(self[key].next == null)
				animation.next = null;
			if(Object.is(self[key], this.current)) {
				copy.current = animation;
			}
			copy.animations[key] = animation;
		}, this);
		
		return copy;
	}
	
	//! Liga animações criando uma sequência
	this.linkAnimations = function(key, keyNext) { this.animations[key].next = this.animations[keyNext]; }
	//! Registra um evento que será chamado assim que a animação terminar
	this.addEventTo = function(key, event, params) { this.animations[key].event = event; this.animations[key].params = params; }
	//! Reseta o estado de uma animação
	this.resetTo = function(key) { this.animations[key].timer = 0.0; }
	//! Verifica se uma dada animação está em execução
	this.isExecuting = function(key) { return ( Object.is(this.current, this.animations[key]) && !this.current.ended() ); }
	//! Verifica se há animação a ser executada
	this.hasAnimation = function() { return (this.current != null); }
}