define(["underscore", "constants"], function(_, constants) {
    var Ghost = function(ctx, images, gameBoard) {
        var gridX = 8;
        var gridY = 9;
        var BLOCK_SIZE = constants.BLOCK_SIZE;

        var direction = "up";

        function move() {
            var randomWalkStrategy = {
                up: [
                    "up",

                    "left",
                    "right",

                    "down"
                ],

                down: [
                    "down",

                    "left",
                    "right",

                    "up"
                ],

                left: [
                    "left",

                    "up",
                    "down",

                    "right"

                ],

                right: [
                    "right", // Random: Go to (up, down) if one of them free.

                    // Random if both work
                    "up",
                    "down",

                    "left"
                ]
            };

            var bunchOfMoves = randomWalkStrategy[direction];

            var nextCoordinate = {
                up: [gridX, gridY - 1],
                down: [gridX, gridY + 1],
                left: [gridX - 1, gridY],
                right: [gridX + 1, gridY]
            };

            _.every(bunchOfMoves, function (m) {
                if (checkMove(nextCoordinate[m])) {
                    moveTo(nextCoordinate[m]);
                    direction = m;
                    //break loop
                    return false;
                }
                return true;
            });

        }

        function moveTo(coordTuple) {
            gridX = coordTuple[0];
            gridY = coordTuple[1];
        }

        function checkMove(p) {
            return gameBoard.checkMove(p[0], p[1]);
        }

        function draw() {
            ctx.drawImage(images.ghost, 0, 0, BLOCK_SIZE, BLOCK_SIZE, gridX * BLOCK_SIZE, gridY * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }

        return {
            type: "ghost",
            draw: draw,
            gridX: gridX,
            gridY: gridY,
            move: move
        };
    };

    return Ghost;
});