define(function (require) {

    function IDGenerator() {

        this.get = function () {
            return ++IDGenerator.ID;
        };

    }

    IDGenerator.ID = 0;

    return IDGenerator;
});
