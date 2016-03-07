define(function (require) {

    function ImageRepository() {
        var images = {};
        var imagesNum = 0;
        var imagesLoaded = 0;

        this.add = function(name, url){
            imagesNum++;

            images[name] = new Image();
            images[name].onload = function() {
                imagesLoaded++;
            };

            images[name].src = url;
        };

        this.get = function(name) {
            return images[name];
        };

        this.isReady = function() {
            return imagesNum == imagesLoaded;
        };
    }

    return ImageRepository;
});
