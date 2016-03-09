define(function (require) {
    var GameObject = require('../engine/GameObject');

    function GameOver(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;

        this.update = function () {
            if(this.keyStatus.pressed('space')) {
                this.vx = 200;
                this.objectRepository.assignRemove(this.id);
                this.shared.startGame();
            }
        };

        this.draw = function() {
            this.context.font = "70px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('Game Over!' , 100, 170);

            this.context.font = "20px Arial";
            this.context.fillText('Press `space` to go back to start!' , 140, 210);
        };

    }

    GameOver.prototype = new GameObject();

    return GameOver;
});