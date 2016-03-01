define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Win(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;

        this.draw = function() {
            this.context.font = "70px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('You Win!' , 160, 170);
        };

    }

    Win.prototype = new GameObject();

    return Win;
});