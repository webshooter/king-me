/* BOARD.JS */

/* #########################################################
   # BOARD
   ######################################################### */
function Board(containerElement, options) {
    // set properties = options || defaults
    this.id          = options.id            || "gameboard";
    this.width       = options.width         || 600;
    this.height      = options.height        || 600;
    this.rowCount    = options.rowCount      || 8;
    this.colCount    = options.colCount      || 8;
    this.squareColor = options.squareColor   || "rgb(100,100,100)";
    this.yOffset     = options.yOffset       || 0;
    this.xOffset     = options.xOffset       || 0;
    
    // object collections
    this.squares  = [];
    this.checkers = [];
    
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", this.id);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.$$ = $(this.canvas); // just for convenient jquery access
    
    this.draw();
    
    containerElement.appendChild(this.canvas);
};
Board.prototype.getColumnTags = function() {
    return ["A","B","C","D","E","F","G","H"];
};
Board.prototype.getRowTags = function() {
    return ["1","2","3","4","5","6","7","8"];
};
Board.prototype.initCheckers = function() {
    this.checkers = [];
    var playerOneColor = "rgb(255,255,0)";
    var playerTwoColor = "rgb(0,255,255)";
    var playerOneSquares = ["B1","D1","F1","H1","A2","C2","E2","G2","B3","D3","F3","H3"];
    var playerTwoSquares = ["A6","C6","E6","G6","B7","D7","F7","H7","A8","C8","E8","G8"];
    var checker;

    for (var i=0; i<playerOneSquares.length; i++) {
        var mysquare = this.getSquareById(playerOneSquares[i]);
        checker = new Checker(this.getSquareById(playerOneSquares[i]), playerOneColor);
        this.checkers.push(checker);
    }
    for (var i=0; i<playerTwoSquares.length; i++) {
        checker = new Checker(this.getSquareById(playerTwoSquares[i]), playerTwoColor);
        this.checkers.push(checker);
    }
};
Board.prototype.draw = function() {
    // board color and border are set in css
    
    // draw squares
    this.drawSquares();
    
    // draw checkers
    if (this.checkers.length < 1) {
        // Note: This should really be handled in a 
        // game init routine, not here
        this.initCheckers();
    }
    this.drawCheckers();
    
};
Board.prototype.drawSquares = function(x) {
    var colTags = this.getColumnTags();
    var rowTags = this.getRowTags();
    var sqSize = {
        tall: (parseInt(this.canvas.height) / this.rowCount),
        wide: (parseInt(this.canvas.width) / this.colCount)
    };
    for (var row=0; row<rowTags.length; row++) {
        for (var col=0; col<this.colCount; col+=2) {
            var idRow = rowTags[(rowTags.length-row)-1];
            var idCol = colTags[col];
            x = sqSize.wide * col;
            y = sqSize.tall * row;
            if ((row+1) % 2 == 0) {
                x += sqSize.wide;
                idCol = colTags[col+1];
            }
            var sq = new Square(x, y, sqSize, this, this.squareColor);
            sq.id = idCol + idRow;
            if (sq) { this.squares.push(sq); }
        }
    }
}
Board.prototype.drawCheckers = function() {
    if (this.checkers.length > 0) {
        for (var i=0; i<this.checkers.length; i++) {
            this.checkers[i].draw();
        }
        //printCheckers(this.checkers);
    }
}
Board.prototype.getSquareById = function(squareId) {
    for (var i=0; i<this.squares.length; i++) {
        if (this.squares[i].id.toUpperCase() == squareId.toUpperCase()) {
            return this.squares[i];
        }
    }
};
Board.prototype.getSquareByCoord = function(x, y) {
    //loop through all the objects in squares[]
    for (var i=0; i<this.squares.length; i++) {
        // check to see if the mousex value is "in the square"
        if ((parseInt(x) > (parseInt(this.squares[i].x)) + this.xOffset) && (parseInt(x) < (parseInt(this.squares[i].x) + this.xOffset) + parseInt(this.squares[i].size.wide))) {
            // check to see if the mousey value is "in the square"
            if ((y > (parseInt(this.squares[i].y)) + this.yOffset) && (y < (parseInt(this.squares[i].y) + this.yOffset) + parseInt(this.squares[i].size.tall))) {
                // mousex and mousey are both in the square,
                // so this must be the square[] object we want
                return this.squares[i];
            }
        }
    }
};
Board.prototype.removeChecker = function(square) {
    var indexToRemove = -1;
    for (var i=0; i<this.checkers.length; i++) {
        if (this.checkers[i].square.id == square.id) {
            indexToRemove = i;
        }
    }
    if (indexToRemove != -1) {
        this.checkers.splice(indexToRemove, 1);
    }
};
Board.prototype.moveChecker = function(checker, fromSquare, toSquare) {
    console.log("moving from " + fromSquare.id + " to " + toSquare.id);
    var newChecker = new Checker(toSquare, checker.color);
    this.checkers.push(newChecker);
    this.removeChecker(fromSquare);
    fromSquare.clear();
    this.draw();
};