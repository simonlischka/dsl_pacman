define([], function () {


    return {
        load: function (onReadyCallback) {
            imgLoader = new BulkImageLoader();
            imgLoader.addImage("cherry.png", "cherry");
            imgLoader.addImage("wall.png", "wall");
            imgLoader.addImage("bitcoin.png", "Bitcoin");
            imgLoader.onReadyCallback = function() {
                onReadyCallback;
            }
            imgLoader.loadImages();
        }

    }
});