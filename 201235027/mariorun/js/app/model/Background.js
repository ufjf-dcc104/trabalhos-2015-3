define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Background(id, controller) {
        //Game Object Configs
        this.init(id, controller);

        this.draw = function() {
            this.context.fillStyle = "rgb(92, 148, 252)";
            this.context.fillRect(0, 0, this.controller.canvasWidth, this.controller.canvasHeight);
        };
    }

    Background.prototype = new GameObject();

    return Background;
});