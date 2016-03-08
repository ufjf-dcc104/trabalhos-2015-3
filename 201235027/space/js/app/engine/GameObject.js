define(function () {

    function GameObject() {
        this.id = 'default';
        this.zIndex = 0;
        this.type = 'default';

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;

        this.speed = 0;
        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        this.alive = true;

        this.init = function(id, controller){
            this.id = id;
            this.controller = controller;
            this.context = controller.getContext();
            this.keyStatus = controller.getKeyStatus();
            this.objectRepository = controller.getObjectRepository();
            this.audioRepository = controller.getAudioRepository();
            this.imageRepository = controller.getImageRepository();
            this.shared = controller.shared;
        };

        this.update = function () {
        };

        this.draw = function () {
        };

        this.collideListener = function(obj) {
        };

        // Helper Functions
        this.dt = function(){
            return this.controller.dt;
        };

        this.getDrawX = function(x) {
            return (x || this.x) - this.controller.camera.xView;
        };

        this.getDrawY = function(y) {
            return (y || this.y) - this.controller.camera.yView;
        };

        // Simple Bouding Box
        this.collide = function(obj) {
            return (this.x < obj.x + obj.width && this.x + this.width > obj.x &&
            this.y < obj.y + obj.height && this.height + this.y > obj.y);
        };
    }

    return GameObject;
});