var PointUI = (function () {
    function PointUI(pointId, onSelected) {
        this.pointDiv = document.createElement('div');
        var side = (pointId < 13 ? 'bottom' : 'top');
        var colour = (pointId % 2 == 0) ? 'black' : 'red';
        this.pointDiv.className = "point " + side + "-point " + colour + "-point";
        this.pointDiv.onmouseover = function () { onSelected(true); };
        this.pointDiv.onmouseout = function () { onSelected(false); };
    }
    PointUI.prototype.clearCheckers = function () {
        for (var i = 0; i < this.pointDiv.childNodes.length; i++) {
            this.pointDiv.removeChild(this.pointDiv.childNodes[i]);
        }
    };
    PointUI.prototype.setCheckers = function (player, count) {
        this.clearCheckers();
        var $pointDiv = $(this.pointDiv);
        for (var i = 1; i <= count; i++) {
            if (i > 5) {
                $('.checker-total', $pointDiv).text(count);
            }
            else if (i == 5) {
                $pointDiv.append($('<div class="checker checker-total">').addClass(Player[player]));
            }
            else {
                $pointDiv.append($('<div class="checker">').addClass(Player[player]));
            }
        }
    };
    PointUI.prototype.highlight = function (on) {
        if (on) {
            $(this.pointDiv).addClass('highlight');
        }
        else {
            $(this.pointDiv).removeClass('highlight');
        }
    };
    return PointUI;
})();
/// <reference path="PointUI.ts"/>
var BoardUI = (function () {
    function BoardUI(boardElementId) {
        this.boardDiv = document.getElementById(boardElementId);
        // TODO: check board element is empty
        this.boardDiv.className = 'board';
    }
    BoardUI.prototype.initialise = function (pointUIs) {
        this.boardDiv.appendChild(pointUIs[13].pointDiv);
        this.boardDiv.appendChild(pointUIs[14].pointDiv);
        this.boardDiv.appendChild(pointUIs[15].pointDiv);
        this.boardDiv.appendChild(pointUIs[16].pointDiv);
        this.boardDiv.appendChild(pointUIs[17].pointDiv);
        this.boardDiv.appendChild(pointUIs[18].pointDiv);
        this.boardDiv.appendChild(BoardUI.createBar(Player.BLACK));
        this.boardDiv.appendChild(pointUIs[19].pointDiv);
        this.boardDiv.appendChild(pointUIs[20].pointDiv);
        this.boardDiv.appendChild(pointUIs[21].pointDiv);
        this.boardDiv.appendChild(pointUIs[22].pointDiv);
        this.boardDiv.appendChild(pointUIs[23].pointDiv);
        this.boardDiv.appendChild(pointUIs[24].pointDiv);
        this.boardDiv.appendChild(BoardUI.createHome(Player.BLACK));
        this.boardDiv.appendChild(BoardUI.createClearBreak());
        this.boardDiv.appendChild(pointUIs[12].pointDiv);
        this.boardDiv.appendChild(pointUIs[11].pointDiv);
        this.boardDiv.appendChild(pointUIs[10].pointDiv);
        this.boardDiv.appendChild(pointUIs[9].pointDiv);
        this.boardDiv.appendChild(pointUIs[8].pointDiv);
        this.boardDiv.appendChild(pointUIs[7].pointDiv);
        this.boardDiv.appendChild(BoardUI.createBar(Player.RED));
        this.boardDiv.appendChild(pointUIs[6].pointDiv);
        this.boardDiv.appendChild(pointUIs[5].pointDiv);
        this.boardDiv.appendChild(pointUIs[4].pointDiv);
        this.boardDiv.appendChild(pointUIs[3].pointDiv);
        this.boardDiv.appendChild(pointUIs[2].pointDiv);
        this.boardDiv.appendChild(pointUIs[1].pointDiv);
        this.boardDiv.appendChild(BoardUI.createHome(Player.RED));
        this.boardDiv.appendChild(BoardUI.createClearBreak());
    };
    BoardUI.createBar = function (player) {
        var bar = document.createElement('div');
        bar.id = Player[player] + '-bar';
        bar.className = 'point bar';
        return bar;
    };
    BoardUI.createHome = function (player) {
        var bar = document.createElement('div');
        bar.id = Player[player] + '-home';
        bar.className = 'point home';
        return bar;
    };
    BoardUI.createClearBreak = function () {
        var br = document.createElement('br');
        br.className = 'clear';
        return br;
    };
    return BoardUI;
})();
/// <reference path="PointUI.ts"/>
var Point = (function () {
    function Point(pointId, onSelected) {
        var self = this;
        this.pointId = pointId;
        this.checkers = [0, 0];
        this.pointUI = new PointUI(pointId, function (selected) { onSelected(self, selected); });
    }
    Point.prototype.increment = function (player, count) {
        this.checkers[player] += count;
        this.pointUI.setCheckers(player, this.checkers[player]);
    };
    Point.prototype.highlight = function (on) {
        this.pointUI.highlight(on);
    };
    return Point;
})();
/// <reference path="BoardUI.ts"/>
/// <reference path="Point.ts"/>
var Board = (function () {
    function Board(boardUI) {
        var _this = this;
        this.boardUI = boardUI;
        var onPointSelected = function (point, selected) {
            if (_this.onPointSelected) {
                _this.onPointSelected(point, selected);
            }
        };
        this.points = new Array(26);
        for (var i = 0; i < 26; i++) {
            this.points[i] = new Point(i, onPointSelected);
        }
        this.increment(24, Player.RED, 2);
        this.increment(1, Player.BLACK, 2);
        this.increment(6, Player.RED, 5);
        this.increment(19, Player.BLACK, 5);
        this.increment(8, Player.RED, 3);
        this.increment(17, Player.BLACK, 3);
        this.increment(13, Player.RED, 5);
        this.increment(12, Player.BLACK, 5);
        this.boardUI.initialise(this.points.map(function (p) { return p.pointUI; }));
    }
    Board.prototype.increment = function (pointId, player, count) {
        this.points[pointId].increment(player, count || 1);
    };
    Board.prototype.highlightPoint = function (pointId, on) {
        this.points[pointId].highlight(on);
    };
    return Board;
})();
var DiceUI = (function () {
    function DiceUI(diceContainerElementId) {
        this.diceContainerDiv = document.getElementById(diceContainerElementId);
    }
    DiceUI.prototype.setDiceRolls = function (roll1, roll2) {
        this.diceContainerDiv.innerText = roll1 + ", " + roll2;
    };
    return DiceUI;
})();
/// <reference path="DiceUI.ts"/>
var Dice = (function () {
    function Dice(diceUI) {
        this.diceUI = diceUI;
    }
    Dice.generateDie = function () {
        return Math.floor(Math.random() * 6) + 1;
    };
    Dice.prototype.roll = function () {
        this.roll1 = Dice.generateDie();
        this.roll2 = Dice.generateDie();
        this.diceUI.setDiceRolls(this.roll1, this.roll2);
    };
    return Dice;
})();
var StatusUI = (function () {
    function StatusUI(statusSpanElementId) {
        this.statusSpan = document.getElementById(statusSpanElementId);
    }
    StatusUI.prototype.setStatus = function (s) {
        this.statusSpan.innerText = s;
    };
    return StatusUI;
})();
/// <reference path="StatusUI.ts"/>
var StatusLogger = (function () {
    function StatusLogger(statusUI) {
        this.statusUI = statusUI;
    }
    StatusLogger.prototype.logInfo = function (s) {
        this.statusUI.setStatus(s);
    };
    return StatusLogger;
})();
/// <reference path="Board.ts"/>
/// <reference path="Dice.ts"/>
/// <reference path="StatusLogger.ts"/>
var Player;
(function (Player) {
    Player[Player["BLACK"] = 0] = "BLACK";
    Player[Player["RED"] = 1] = "RED";
})(Player || (Player = {}));
var Game = (function () {
    function Game(boardElementId, diceElementId, statusElementId) {
        var self = this;
        this.dice = new Dice(new DiceUI(diceElementId));
        this.board = new Board(new BoardUI(boardElementId));
        this.board.onPointSelected = function (point, selected) {
            if (point.checkers[self.currentPlayer] > 0) {
                self.board.highlightPoint(point.pointId + self.dice.roll1, selected);
                if (self.dice.roll2 !== self.dice.roll1) {
                    self.board.highlightPoint(point.pointId + self.dice.roll2, selected);
                }
            }
        };
        this.statusLogger = new StatusLogger(new StatusUI(statusElementId));
        // TODO: roll to see who starts. Assume BLACK.
        this.currentPlayer = Player.BLACK;
        this.statusLogger.logInfo('BLACK to move');
        this.dice.roll();
    }
    return Game;
})();
