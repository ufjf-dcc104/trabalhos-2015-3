//! Constantes
const DGRID = 16;	//< delta grid
const EPS  = 0.05;	//< floating error
const FPS = 60;		//< frames per second
const DT = 1.0/FPS;	//< seconds per frame
const G = -450;		//< gravity
// inicializadas e congeladas no início do programa
var WIDTH;	//< largura da tela
var HEIGHT; //< altura da tela
//////////////////////////////////////////

/**
 *	@brief Faz derivada herdar de base via protótipos
 *	@param derivada Método construtor da derivada em questão
 *	@param base 	Método construtor da base em questão
 */
var herda = function(derivada, base) {
	derivada.prototype = Object.create(base.prototype);
	derivada.prototype.constructor = derivada;
}

/**
 *	@param  sprite Método construtor de uma especificação de Sprite
 *	@return Chave do sprite passado
 */
var key = function(sprite) {
	return sprite.prototype.key();
}

/**
 *	@class Exception
 *	@brief Classe base para exceções do projeto
 */
function Exception(code, msg, local) {
	var _code = code;
	var _msg = msg;
	var _local = local;
	
	this.showMessage = function() {
		console.error("Erro (" + _code + "): " + _msg + " na função: " + _local);
	}
}

// Especificações de Exception
function ParametroInvalidoException(local)  { Exception.call(this, 501, "um ou mais parâmetros passados para o método são inválidos", local); }
function FaltaImplementacaoException(local) { Exception.call(this, 505, "método não implementado", local); }

// Faz a herança das exceções
herda(ParametroInvalidoException, Exception);
herda(FaltaImplementacaoException, Exception);

/**
 *	@class Map
 *	@brief Mapa do cenário, faz o mapeamento dos objetos na cena
 *	@param w Largura a ser mapeada
 *	@param h Altura a ser mapeada
 */
 function Map(w, h) {
	const GX0 = 10;
	const WIDTH = Math.ceil(w/DGRID) + 2 * GX0;
	const HEIGHT = Math.ceil(h/DGRID);
	
	this.grid = [];
	for(var i = 0; i < WIDTH; i++) {
		this.grid[i] = [];
		for(var j = 0; j < HEIGHT; j++) {
			this.grid[i][j] = false; //< posição vazia
		}
	}
	
	this.isEmpty = function(row, col) { return !this.grid[col + GX0][row] }
	this.getDelta = function() { return DGRID; }
	this.getSize = function() { return {w: WIDTH * DGRID, h: HEIGHT * DGRID}; }
	this.getMargin = function() { return {t: 0, r: GX0 * DGRID, b: 0, l: GX0 * DGRID}; }
	
	//! converte a posição na tela em posição no grid
	this.getPosition = function(rx, ry) {
		return {x: Math.floor(rx/DGRID), y: Math.floor(ry/DGRID)};
	}
	//! converte a área ocupada na tela em area ocupada no grid
	this.getPosition = function(rx, ry, sw, sh) {
		return { x: Math.floor(rx/DGRID), y: Math.floor(ry/DGRID),
				 w: Math.ceil(sw/DGRID),  h: Math.ceil(sh/DGRID) };
	}
	
	this.fillRow = function(row) { for(var i = 0; i < WIDTH; i++) this.grid[i][row] = true; }
	this.emptyRow = function(row){ for(var i = 0; i < WIDTH; i++) this.grid[i][row] = false; }
	this.fillCol = function(col) { for(var j = 0; j < HEIGHT; j++) this.grid[col + GX0][j] = true;	}
	this.emptyCol = function(col){ for(var j = 0; j < HEIGHT; j++) this.grid[col + GX0][j] = false; }
	
	this.fillArea = function(area) {
		for(var i = GX0; i < area.w + GX0; i++)
			for(var j = 0; j < area.h; j++)
				this.grid[area.x + i][area.y + j] = true;
	}
	
	this.emptyArea = function(area) {
		for(var i = GX0; i < area.w + GX0; i++)
			for(var j = 0; j < area.h; j++)
				this.grid[area.x + i][area.y + j] = false;
	}
	
	this.draw = function(ctx) {
		ctx.strokeStyle = "#A83";
		ctx.fillStyle = "#A83";
		for (var i = 0; i < WIDTH - 2 * GX0; i++) {
			for (var j = 0; j < HEIGHT; j++) {
				if(this.grid[i + GX0][j])
					ctx.fillRect(i * DGRID, j * DGRID, DGRID, DGRID);
				else 
					ctx.strokeRect(i * DGRID, j * DGRID, DGRID, DGRID);
			}
		}
	}
 }

/**
 *	@class Text
 *	@brief Classe para rasterização de textos na cena
 */
function Text(font, size, rgb) {
	this.font = font 	|| "Courier";
	this.size = size 	|| 24;
	this.color = rgb 	|| "#00F";
	
	this.raster = function(ctx, text, x, y) {
		ctx.font = "" + this.size + "px " + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(text, x, y);
	}
}