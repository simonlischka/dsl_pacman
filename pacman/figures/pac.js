define(["underscore", "constants"], function(_, constants) {
    var Pac = function(ctx, images, gameBoard) {
        var gridX = 10;
        var gridY = 10;
        var BLOCK_SIZE = constants.BLOCK_SIZE;

        function move(direction) {
            switch (direction) {
                case "LEFT":
                    if (gameBoard.checkMove(gridX - 1, gridY)) {
                        gridX--;
                    }
                    break;
                case "RIGHT":
                    if (gameBoard.checkMove(gridX + 1, gridY)) {
                        gridX++;
                    }
                    break;
                case "UP":
                    if (gameBoard.checkMove(gridX, gridY - 1)) {
                        gridY--;
                    }
                    break;
                case "DOWN":
                    if (gameBoard.checkMove(gridX, gridY + 1)) {
                        gridY++;
                    }
                    break;
            }
        }
        
        function next_move(next_direction) {
            switch (next_direction) {
                case "LEFT":
                    if (gameBoard.checkMove(gridX - 1, gridY)) {
                        return true;
                    }
                    break;
                case "RIGHT":
                    if (gameBoard.checkMove(gridX + 1, gridY)) {
                        return true;
                    }
                    break;
                case "UP":
                    if (gameBoard.checkMove(gridX, gridY - 1)) {
                        return true;
                    }
                    break;
                case "DOWN":
                    if (gameBoard.checkMove(gridX, gridY + 1)) {
                        return true;
                    }
                    break;
            }
        }

        function getGridX() {
            return gridX;
        }

        function getGridY() {
            return gridY;
        }


        function draw() {
            ctx.clearRect(0, 0, 600, 600);
            ctx.drawImage(
                images.pac, 0, 0, BLOCK_SIZE, BLOCK_SIZE, gridX * BLOCK_SIZE, gridY * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE
            );
        }

        return {
            draw: draw,
            move: move,
            next_move: next_move,
            getGridX: getGridX,
            getGridY: getGridY
        };
    };

    return Pac;
});