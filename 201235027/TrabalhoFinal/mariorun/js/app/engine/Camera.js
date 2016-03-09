define(function (require) {

    function Camera(gameController)
    {
        // position of camera (left-top coordinate)
        this.xView = 0;
        this.yView = 0;

        // viewport dimensions
        this.wView = gameController.canvasWidth;
        this.hView = gameController.canvasHeight;

        // World
        this.x1World = 0;
        this.y1World = 0;
        this.x2World = gameController.canvasWidth;
        this.y2World = gameController.canvasHeight;

        this.setWorldBox = function (x1, y1, x2, y2) {
            this.x1World = x1;
            this.y1World = y1;
            this.x2World = x2;
            this.y2World = y2;
        };

        this.move = function (x, y) {
            this.xView = x || 0;
            this.yView = y || 0;

            // don't let camera leaves the world's boundary
            if(this.xView < this.x1World)
                this.xView = this.x1World;
            else if(this.xView + this.wView > this.x2World)
                this.xView = this.x2World - this.wView;

            if(this.yView < this.y1World)
                this.yView = this.y1World;
            else if(this.yView + this.hView > this.y2World)
                this.yView = this.y2World - this.hView;
        };
    }

    return Camera;
});
