//! Escalas default dos personagens usadas na renderização para definir o tamanho
//! do personagem na cena, visto que a propriedade de dimensão faz referência ao 
//! tamanho real dos sprites
const SX = 1.8;
const SY = 1.8;

/**
 *	@class Sprite
 *	@brief Classe base para controle e exibição dos personagens do projeto
 *	@param r0 Vetor posição inicial {x: x0, y: y0}
 *	@param d  Dimensões do sprite {w: ?, h: ?}
 *	@param bd Borda do sprite {w: ?, h: ?}
 */
function Sprite(r0, d, bd) { 
	this.r = {x: r0.x, y: r0.y};	//< posição
	this.d = {w: d.w, h: d.h};		//< dimensões
	this.s = {x: SX, y: SY};		//< escala
	this.v = {x: 0, y: 0};			//< velocidade
	this.a = {x: 0, y: 0};			//< aceleração
	
	this.fatx = 1.5;				//< fator de atrito
	this.faty = 0.0;				//< fator de resistência do ar
	
	// Tamanho do objeto na cena
	this.sz = {w: this.s.x * this.d.w, h: this.s.y * this.d.h};
	// Borda do objeto para teste de colisão
	this.bd = bd || {w: 8, h: 8};
	
	Object.freeze(this.d);
	Object.freeze(this.sz);
	
	//! atualiza posição e orientação do personagem
	this.move = function(dt, g, map) {
		// atualiza estado do sprite, implementado na derivada
		this.update(dt, g);
		
		this.a.x -= this.fatx * this.v.x;
		this.a.y -= this.faty * this.v.y;
		
		this.v.x += this.a.x * dt;
		this.v.y += (this.a.y - g) * dt;
		
		if(Math.abs(this.v.x) < EPS) this.v.x = 0.0;
		if(Math.abs(this.v.y) < EPS) this.v.y = 0.0;
		
		var gr = map.getPosition(this.r.x, this.r.y + this.sz.h/2 - 1, this.sz.w, this.sz.h);

		var belowIsEmpty = true; var n = Math.floor((gr.w)/2 - 1); n = (n <= 0) ? 1 : n;
		for(var i = -n, k = 0; i <= n; i++) {
			k = (!map.isEmpty(gr.y + 1, gr.x + i)) ? k + 1 : 0;
			if(k == n) { belowIsEmpty = false; break; }
		}
		
		this.r.x += this.v.x * dt;
		if(belowIsEmpty) {
			this.r.y += this.v.y * dt;
		} else {
			var dy = Math.min(this.v.y * dt, (gr.y + 1) * DGRID - (this.r.y + this.sz.h/2));
			if(dy == 0) this.v.y = 0.0;
			this.r.y += dy;
		}

		this.positionLimit(map);
	}
	
	//! verifica se há colisão entre os sprites
	this.colidiu = function(sprite) {
		if(	this.left() > sprite.right() || this.right() < sprite.left() || 
			this.foot() < sprite.head()  || this.head() > sprite.foot() )
				return false;
		return true;
	}
	
	//! Gets da área de colisão
	this.left  = function() { return this.r.x - this.sz.w/2 + this.bd.w; }
	this.right = function() { return this.r.x + this.sz.w/2 - this.bd.w; }
	this.foot  = function() { return this.r.y + this.sz.h/2; }
	this.head  = function() { return this.r.y - this.sz.h/2 + this.bd.h; }
}

/************ Métodos a serem implementados nas derivadas ************/

//! retorna um identificador da derivada, usada como chave da base de imagens
Sprite.prototype.key = function() { throw new FaltaImplementacaoException("Sprite.key()"); }

//! renderiza o sprite na cena com textura img através do contexto passado por parâmetro 
//! parâmetros map é opcional, se passado desenha mapa e bounding boxes
Sprite.prototype.draw = function(ctx, map) { throw new FaltaImplementacaoException("Sprite.draw(ctx, img)"); }

//! atualiza as propriedades físicas do personagem causada por mudanças de estado via eventos
//! @note Este método é chamado automaticamente pelo método move(...) do sprite
Sprite.prototype.update = function(dt, g) { throw new FaltaImplementacaoException("Sprite.update(dt, g)"); }

//! limita a posição do personagem na tela, dado o mapa
Sprite.prototype.positionLimit = function(map) { throw new FaltaImplementacaoException("Sprite.positionLimit(map)");  }