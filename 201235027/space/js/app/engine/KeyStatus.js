define(function (require) {

    function KeyStatus(mappedKeys) {
        var self = this;

        this.keys = mappedKeys;

        this.keysStatus = {};

        for(var key in this.keys){
            this.keysStatus[ this.keys[key] ] =  false;
        }

        this.pressed = function (name) {
          return this.keysStatus[name];
        };

        //Listeners
        addEventListener("keydown", function (event) {
            var code = event.which || event.keyCode;
            if(self.keys[code]) {
                event.preventDefault();
                self.keysStatus[self.keys[code]] = true;
            }
        });

        addEventListener("keyup", function (event) {
            var code = event.which || event.keyCode;
            if(self.keys[code]) {
                event.preventDefault();
                self.keysStatus[self.keys[code]] = false;
            }
        });
    }

    return KeyStatus;
});
