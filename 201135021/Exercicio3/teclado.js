/**
 * Created by Héber on 09-Dec-15.
 */

var teclado = {
    esquerda: false,
    direita: false,
    cima: false,
    baixo: false
};

teclado.teclaPressionada = function(e){
    switch (e.keyCode){
        case 37:
            teclado.esquerda = true;
            break;
        case 38:
            teclado.cima = true;
            break;
        case 39:
            teclado.direita = true;
            break;
        case 40:
            teclado.baixo = true;
            break;
    }
};
teclado.teclaSolta = function(e){
    switch (e.keyCode){
        case 37:
            teclado.esquerda = false;
            break;
        case 38:
            teclado.cima = false;
            break;
        case 39:
            teclado.direita = false;
            break;
        case 40:
            teclado.baixo = false;
            break;
    }
};