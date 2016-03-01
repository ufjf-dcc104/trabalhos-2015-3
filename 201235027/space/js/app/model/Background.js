define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Background(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.speed = 100;

        this.update = function () {
            this.y += this.speed*this.dt();

            if (this.y > this.controller.canvasHeight - 2)
                this.y = 0;
        };

        this.draw = function() {
            this.context.drawImage(this.imageRepository.get('bg'), this.x, this.y);
            this.context.drawImage(this.imageRepository.get('bg'), this.x, this.y - this.controller.canvasHeight);
        };
    }

    Background.prototype = new GameObject();

    return Background;
});