/* BOARD.JS */

function Board(options) {
  
  if (options == null) {
    console.log("Board options cannot be null. Exiting...");
    return;
  }
  
  // load options
  this.game = options.game;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width;
  this.height = options.height;
  this.squareColor = options.squareColor;
  this.color = options.boardColor;
  this.showBorder = options.showBorder;
  this.borderWidth = options.borderWidth;
  this.borderStyle = options.borderStyle;
  this.borderColor = options.borderColor;
  this.checkerSize = options.checkerSize;
  
  // set other properties
  this.selectedSquare = null;
  this.rowCount = 8;
  this.colCount = 8;
    
  // object collections
  this.squares  = [];
  this.checkers = [];
  
  

  this.init = function() {
    // create squares
    var sqSize = {
      tall: (parseInt(this.height-this.borderWidth) / this.rowCount),
      wide: (parseInt(this.width-this.borderWidth) / this.colCount)
    };
    var squareCount = (this.colCount/2) * this.rowCount;
    var x = this.borderWidth/2, 
        y = this.borderWidth/2,
        xOffset = false;
    for (var i=squareCount; i>0; i--) {
      var sq = new Square(x, y, sqSize, this, this.squareColor);
      sq.id = i;
      if (sq) { this.squares.push(sq); }
      x += sqSize.wide * 2;
      if (x > sqSize.wide * this.colCount-1) {
        y += sqSize.tall;
        xOffset = !xOffset;
        x = (xOffset) ? sqSize.wide + this.borderWidth/2 : this.borderWidth/2;
      }
    }
  };

  this.setGameState = function(gameState) {
      if (gameState != null && (gameState.length == this.squares.length)) {
        var chars = gameState.split("");
        for (var i=0; i<chars.length; i++) {
          if (chars[i] > 0) {
            var checker = new Checker(this.getSquareById(i+1));
            checker.setSize(this.game.getBoardPrefs().checkerSize);
            switch (parseInt(chars[i])) {
              case 1:  // [1] player checker (non-promoted)
                //console.log("[1][" + )
                checker.playerid = this.game.getData().playerid;
                checker.color = this.game.getColorPrefs().myColor;
                checker.isKing = false;
                break;
              case 2:  // [2] opponent checker (non-promoted)
                checker.playerid = this.game.getData().opponentid;
                checker.color = this.game.getColorPrefs().opponentColor;
                checker.isKing = false;
                break;
              case 3:  // [3] player checker (promoted)
                checker.playerid = this.game.getData().playerid;
                checker.color = this.game.getColorPrefs().myColor;
                checker.isKing = true;
                break;
              case 4:  // [4] opponent checker (promoted)
                checker.playerid = this.game.getData().opponentid;
                checker.color = this.game.getColorPrefs().opponentColor;
                checker.isKing = true;
                break;
            }
            this.checkers.push(checker);
          }
        }
      }
    };
  
  this.getSquareById = function(squareId) {
    var square = null;
    for (var i=0; i<this.squares.length; i++) {
      if (this.squares[i].id == squareId) {
        square = this.squares[i];
      }
    }
    return square;
  };
  
  this.getSquareByCoord = function(x, y) {
    for (var i=0; i<this.squares.length; i++) {
        if ((parseInt(x) > (parseInt(this.squares[i].x)) + (parseInt(this.borderWidth)/2)-1) && 
            (parseInt(x) < (parseInt(this.squares[i].x) + (parseInt(this.borderWidth)/2)-1) + parseInt(this.squares[i].size.wide))) {
            if ((y > (parseInt(this.squares[i].y)) + (parseInt(this.borderWidth)/2)-1) && 
                (y < (parseInt(this.squares[i].y) + (parseInt(this.borderWidth)/2)-1) + parseInt(this.squares[i].size.tall))) {
              console.log("[" + x + "," + y + "] Square id: " + this.squares[i].id);
              return this.squares[i];
            }
        }
    }
  };
  
  this.getMoves = function(square) {
                  //|--notpromoted--|---promoted---|
    var moves=[]; // MFR,MFL,JFR,JFL,MBR,MBL,JBR,JBL
    moves[0] = [0, 5, 0, 10, 0, 0, 0, 0];
    moves[1] = [5, 6, 0, 0, 0, 0, 0, 0];
    moves[2] = [6, 7, 10, 12, 0, 0, 0, 0];
    moves[3] = [7, 8, 11, 0, 0, 0, 0, 0];
    moves[4] = [9, 10, 0, 14, 1, 2, 0, 0];
    moves[5] = [10, 11, 13, 15, 2, 3, 0, 0];
    moves[6] = [11, 12, 14, 16, 3, 4, 0, 0];
    moves[7] = [12, 0, 15, 0, 4, 0, 0, 0];
    moves[8] = [0, 13, 0, 18, 0, 5, 0, 2];
    moves[9] = [13, 14, 17, 19, 5, 6, 1, 3];
    moves[10] = [14, 15, 18, 20, 6, 7, 2, 4];
    moves[11] = [15, 16, 19, 0, 7, 8, 3, 0];
    moves[12] = [17, 18, 0, 22, 9, 10, 0, 6];
    moves[13] = [18, 19, 21, 23, 10, 11, 5, 7];
    moves[14] = [19, 20, 22, 24, 11, 12, 6, 8];
    moves[15] = [20, 0, 23, 0, 12, 0, 7, 0];
    moves[16] = [0, 21, 0, 26, 0, 13, 0, 10];
    moves[17] = [21, 22, 25, 27, 13, 14, 9, 11];
    moves[18] = [22, 23, 26, 28, 14, 15, 10, 12];
    moves[19] = [23, 24, 15, 16, 27, 0, 11, 0];
    moves[20] = [25, 26, 17, 18, 0, 30, 0, 14];
    moves[21] = [26, 27, 18, 19, 29, 31, 13, 15];
    moves[22] = [27, 28, 19, 20, 30, 32, 14, 16];
    moves[23] = [28, 0, 31, 0, 20, 0, 15, 0];
    moves[24] = [0, 29, 0, 0, 0, 21, 0, 18];
    moves[25] = [29, 30, 0, 0, 21, 22, 17, 19];
    moves[26] = [30, 31, 0, 0, 22, 23, 18, 20];
    moves[27] = [31, 32, 0, 0, 23, 24, 19, 0];
    moves[28] = [0, 0, 0, 0, 25, 26, 0, 22];
    moves[29] = [0, 0, 0, 0, 26, 27, 21, 23];
    moves[30] = [0, 0, 0, 0, 27, 28, 22, 24];
    moves[31] = [0, 0, 0, 0, 28, 0, 23, 0];
    if (square) {
      if (square.id > 0 && square.id < moves.length) {
        return moves[square.id-1];
      }
    }
    return null;
  };

  this.getBoardState = function() {
    var state = "";
    for (var i=0; i<this.squares.length; i++) {
      for (var j=0; j<this.squares.length; j++) {
        if (this.squares[j].id == i) {
          if (this.squares[j].hasChecker()) {
            state += "1";
          } else {
            state += "0";
          }
        }
      }
    }
    return state;
  };
};


