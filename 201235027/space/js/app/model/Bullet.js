define(function (require) {
    var GameObject = require('../engine/GameObject');

    function Bullet(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.type = 'bullet';
        this.width = 2;
        this.height = 14;
        this.speed = -150;
        this.zIndex = 2;

        this.update = function() {
            this.y += this.speed*this.dt();

            if (this.y < -10)
                this.objectRepository.assignRemove(this.id);
        };

        this.draw = function() {
            this.context.drawImage(this.imageRepository.get('bullet'), this.x, this.y);
        };

        this.collideListener = function(obj) {
            this.objectRepository.assignRemove(this.id);
        };
    }

    Bullet.prototype = new GameObject();

    return Bullet;
});