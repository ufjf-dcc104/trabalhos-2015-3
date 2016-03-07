define(function (require) {
    var GameObject = require('../engine/GameObject');

    function GameOver(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;

        this.update = function () {
            if(this.keyStatus.pressed('n')){
                this.shared.newGame();
            }
        };

        this.draw = function() {
            this.context.font = "70px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('Game Over!' , 120, 170);

            this.context.font = "20px Arial";
            this.context.fillText('Press n to play again!' , 220, 210);
        };

    }

    GameOver.prototype = new GameObject();

    return GameOver;
});