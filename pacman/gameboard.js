define(["underscore", "jquery", "constants", "levels/level1"], function (_, $, constants, level) {
    var GameBoard = function (ctx, images, setPoint) {
        var BLOCK_SIZE = constants.BLOCK_SIZE;
        var ROWS = constants.ROWS;
        var COLS = constants.COLS;
        var level_reset = level.map;
        var figures = {};

        function registerFigures() {
            _.each(arguments, function(arg) {
                figures[arg.type] = arg;
            })
        }

        //function getPacPosition() {
        //
        //}

        //
        //function getDistanceToPac() {
        //
        //}

        function checkPacsEating() {
            var pac = figures.pac;
            var index = level.map[pac.gridY()][pac.gridX()];
            if (index == 1 || index == 2) {
                level.map[pac.gridY()][pac.gridX()] = 0;
                drawBoard();
                if (index == 1) {
                    setPoint("point");
                } else {
                    setPoint("fruit");
                    pac.hungry();
                }
            }
        }

        function checkKills() {
            var pac = figures.pac;
            var ghostHittingPac = getGhostHittingPac();
            if (!_.isUndefined(ghostHittingPac)) {
                if (pac.isHungry()) {
                    ghostHittingPac.eaten();
                    setPoint("ghost");
                } else {
                    pac.gotKilled();
                    setPoint("killed");
                }
            }
        }

        function getGhostHittingPac() {
            var pac = _.filter(figures, function(f) {
                return f.type === "pac";
            })[0]
            return _.each(_.without(figures, pac), function(f) {
                if(f.gridX() === pac.gridX() && f.gridY() == pac.gridY()) {
                    return f;
                }
            })[0];
        }

        function checkMove(xPos, yPos) {
            var exceedsLevelHorizontally = xPos < 0 || xPos >= COLS;
            var exceedsLevelVertically = yPos < 0 || yPos > ROWS;
            var WALL = 3;
            var fieldIsBlocked = level.map[yPos] == undefined || level.map[yPos][xPos] == WALL;
            return !(fieldIsBlocked || exceedsLevelHorizontally || exceedsLevelVertically);
        }

        function drawBoard() {
            ctx.clearRect(0, 0, 600, 600);
            for (var r = 0; r < ROWS; r++) {
                for (var c = 0; c < COLS; c++) {
                    if (level.map[r][c] === 3) {
                        ctx.drawImage(images.wall, c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                    else if (level.map[r][c] === 2) {
                        ctx.drawImage(images.fruit, 0, 0, BLOCK_SIZE, BLOCK_SIZE, c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                    else if (level.map[r][c] === 1) {
                        ctx.drawImage(images.point, 0, 0, BLOCK_SIZE, BLOCK_SIZE, c * BLOCK_SIZE + 7.5, r * BLOCK_SIZE + 7.5, BLOCK_SIZE / 2, BLOCK_SIZE / 2);
                    }
                }
            }
        }
        
        function resetLevel(){
            level.map = level_reset;
        }

        function getLevel() {
            return level;
        }

        return {
            registerFigures: registerFigures,
            getGhostHittingPac: getGhostHittingPac,
            checkMove: checkMove,
            checkKills: checkKills,
            checkPacsEating: checkPacsEating,
            drawBoard: drawBoard,
            resetLevel: resetLevel,
            getLevel: getLevel
        }
    };

    return GameBoard;
});