define(function (require) {
    var GameObject = require('../engine/GameObject');

    function StatusBar(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;
        this.showTime = 2.5;

        //
        this.size = 0;
        this.color = 0;

        this.update = function(){
            this.size = this.shared.shipLife* 4.5;
            this.color = (this.size * 100)/450;
        };

        this.draw = function() {
            this.context.font = "15px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('Life: ', 5, 15);
            this.context.fillText('Score: ' + Math.floor(this.shared.score), 492, 15);

            this.context.fillStyle = "hsl("+this.color+", 75%, 59%)";
            this.context.fillRect(36,4,this.size,12);
        };

    }

    StatusBar.prototype = new GameObject();

    return StatusBar;
});