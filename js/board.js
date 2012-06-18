/* BOARD.JS */

function Board(game, containerElement, options) {
    // set properties = options || defaults
    this.game        = options.game;
    this.id          = options.id;
    this.width       = options.width;
    this.height      = options.height;
    this.rowCount    = options.rowCount;
    this.colCount    = options.colCount;
    this.squareColor = options.squareColor;
    this.boardBg     = options.boardBg;
    this.borderWidth = options.borderWidth;
    this.borderStyle = options.borderStyle;
    this.borderColor = options.borderColor;
    
    if (options == null) {
      console.log("Board options cannot be null");
      return;
    }
    
    // object collections
    this.squares  = [];
    this.checkers = [];
    
    // handle DOM stuff
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", this.id);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    //this.canvas.style.position = "relative";
    this.canvas.setAttribute("style", "border-width:" + this.borderWidth + 
        "px; border-color:" + this.borderColor + "; border-style:" + 
        this.borderStyle + "; background-color:" + this.boardBg + ";");

    this.$$ = $(this.canvas); // just for convenient jquery access
    
    console.log(this.canvas.style.position);
    
    this.draw();
    
    containerElement.appendChild(this.canvas);
};
Board.prototype.initCheckers = function() {
    this.checkers = []; // initialize the array
    
    var playerOneColor = "rgb(255,255,0)";
    var playerTwoColor = "rgb(0,255,255)";
    
    
    // player one checkers
    for (var i=1; i<=12; i++) {
      var checker = new Checker(this.getSquareById(i), this.game.playerOne);
      this.checkers.push(checker);
    }
    
    // player two checkers
    for (var i=21; i<=32; i++) {
      var checker = new Checker(this.getSquareById(i), this.game.playerTwo);
      this.checkers.push(checker);
    }
};
Board.prototype.draw = function() {
    // board color and border are set in css
    
    // clear the current board
    this.clear();
    
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
Board.prototype.clear = function() {
  this.context.clearRect(0,0,this.width, this.height);
};
Board.prototype.drawSquares = function() {
    var sqSize = {
        tall: (parseInt(this.canvas.height) / this.rowCount),
        wide: (parseInt(this.canvas.width) / this.colCount)
    };
    var squareCount = (this.colCount/2) * this.rowCount;
    var x = 0, 
        y = 0,
        xOffset = false;
    for (var i=squareCount; i>0; i--) {
      var sq = new Square(x, y, sqSize, this, this.squareColor);
      sq.id = i;
      if (sq) { this.squares.push(sq); }
      x += sqSize.wide * 2;
      if (x > sqSize.wide * this.colCount-1) {
        y += sqSize.tall;
        xOffset = !xOffset;
        x = (xOffset) ? sqSize.wide : 0;
      }
    }
}
Board.prototype.drawCheckers = function() {
    if (this.checkers.length > 0) {
        for (var i=0; i<this.checkers.length; i++) {
            this.checkers[i].draw();
        }
    }
}
Board.prototype.getSquareById = function(squareId) {
    var square = null;
    for (var i=0; i<this.squares.length; i++) {
      if (this.squares[i].id == squareId) {
        square = this.squares[i];
      }
    }
    return square;
};
Board.prototype.getSquareByCoord = function(x, y) {
    //loop through all the objects in squares[]
    for (var i=0; i<this.squares.length; i++) {
        // check to see if the mousex value is "in the square"
        if ((parseInt(x) > (parseInt(this.squares[i].x)) + this.borderWidth) && (parseInt(x) < (parseInt(this.squares[i].x) + this.borderWidth) + parseInt(this.squares[i].size.wide))) {
            // check to see if the mousey value is "in the square"
            if ((y > (parseInt(this.squares[i].y)) + this.borderWidth) && (y < (parseInt(this.squares[i].y) + this.borderWidth) + parseInt(this.squares[i].size.tall))) {
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
        square.checker = null;
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

