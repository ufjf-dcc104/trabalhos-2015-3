define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Stage(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;
        this.showTime = 2.5;

        this.update = function() {
            this.showTime -= this.dt();
            if(this.showTime < 0)
                this.objectRepository.assignRemove(this.id);
        };

        this.draw = function() {
            this.context.font = "70px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('Stage ' + this.shared.stage, 180, 200);
        };

    }

    Stage.prototype = new GameObject();

    return Stage;
});