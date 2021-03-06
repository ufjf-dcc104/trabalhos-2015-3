define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Map(id, controller, grid) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 1;

        this.grid = grid;

        this.height = 352;
        this.width = this.grid.length*32;

        this.drawOn = function(type, x, y) {
            switch (type) {
                case 0:
                    break;
                case 1: //Block
                case 2:
                    this.context.drawImage(this.imageRepository.get('tiles'), 0, 0, 16, 16, this.getDrawX(x), this.getDrawY(y), 32, 32);
                    break;

                case 3: //Cloud
                    this.context.drawImage(this.imageRepository.get('tiles'), 0, 352, 47, 32, this.getDrawX(x), this.getDrawY(y), 94, 64);
                    break;

                case 4: //Grass
                    this.context.drawImage(this.imageRepository.get('tiles'), 176, 145, 47, 16, this.getDrawX(x), this.getDrawY(y)+1, 96, 32);
                    break;
            }
        };

        this.draw = function() {
            var start = Math.max(0, (Math.floor(this.controller.camera.xView/32)) - 3),
                final =  Math.min((start+25), this.grid.length);

            for(var i = start; i < final; i++) {
                for (var j = 0; j < 11; j++) {
                    this.drawOn(this.grid[i][j], i*32, j*32);
                }
            }
        };

    }

    Map.prototype = new GameObject();

    return Map;
});