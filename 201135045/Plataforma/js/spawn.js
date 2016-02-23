
function Spawn(map) {
	this.map = map;
	this.objects = [];
	this.actives = 0;
	this.start = new Date().getTime();
	
	this.enableObjects = function() {
		if(this.actives < 0.70 * this.objects.length) {
			var begin = new Date().getTime();
			var k = Math.floor(Math.random() * this.objects.length);
			while(this.objects[k].appear) {
				k = (k + 1) % this.objects.length;
				// termina se demorar muito
				if(new Date().getTime() - begin > 100) 
					return;
			}
			
			this.objects[k].start = new Date().getTime();
			this.objects[k].appear = true;
			this.actives++;
		}
	}
}

Spawn.prototype.spawn = function(callback, dt, g, wait) { throw new FaltaImplementacaoException("Spawn.spawn(callback, dt, g, wait)"); }

/*************************************** BananaSpawn ***************************************/
function BananaSpawn(sprite, map) {
	Spawn.call(this, map);
	
	this.animation = sprite.animation;
	this.animation.auto = false; // desliga modo automático
	
	sprite.r = {x: 0, y: -DGRID};
	var qtd = (this.map.getSize().w - this.map.getMargin().l - this.map.getMargin().r) / (sprite.sz.w + 1);
	for(var i = 0; i < qtd; i++) {
		this.objects[i] = new Things(sprite.r, sprite.d, sprite.bd);
		// compartilha a mesma animação entre todas as bananas
		this.objects[i].animation = sprite.animation;
		this.objects[i].r.x += i * (sprite.sz.w + 1);
	}
	
} herda(BananaSpawn, Spawn);

///////// implementação dos métodos herdados ///////////

BananaSpawn.prototype.spawn = function(callback, dt, g, wait) {
	// se passou o tempo de espera, ativa mais objetos
	if (this.start + wait <= new Date().getTime()) {
		this.enableObjects();
		this.start = new Date().getTime();
	}
	
	// vai manualmente parapróximo frame
	this.animation.nextFrame(dt);
	// spawna os objetos visíveis
	for (var i = 0; i < this.objects.length ; i++) {
		if(this.objects[i].appear) {
			this.objects[i].move(dt, g, this.map);
			var reset = callback(this.objects[i]);

			if (reset || Math.abs(this.objects[i].v.y) < EPS) {
				// quando objeto alcançar o chão, espera 3s e desaparece
				setTimeout( (function(self, i) {
					return function() {
						self.objects[i].appear = false;
						self.objects[i].r.y = -DGRID;
						self.objects[i].v.y = 0;
						self.actives--;
					}
				})(this, i), reset ? 0 : 3000);
			}
		}
	}
}