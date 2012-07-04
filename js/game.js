/* GAME.JS */

$(window).bind("load", function() {
  //(function() {
    server = new Server();
    game = new Game();
    game.startNew();
    //})(window);
});

function Game() {
  
  var _id = "",
      _data = {},
      _playerid = "",
      _opponentid = "",
      _board = null,
      _playerPrefs = {},
      _boardPrefs = {},
      _colorPrefs = {},
      _contexts = [];
      _boardContext = "gameboard",
      _fxContext = "fx";
  
  // square control states
  var NOTCONTROLLED      = 0,
      PLAYERCONTROLLED   = 1,
      OPPONENTCONTROLLED = 2;

  
  this.getData = function() { return _data; }
  this.getPlayerPrefs = function() { return _playerPrefs };
  this.getBoardPrefs = function() { return _boardPrefs };
  this.getColorPrefs = function() { return _colorPrefs };
  
  this.contexts = {
    new: function(options) {
      // options:
      //   canvasid:  String. Label for canvas element id.
      //   position:  Object literal. Holds context
      //              canvas element positon information
      //              style: String. "relative" or "absolute"
      //              left: Number. pixel position for left side
      //              top: Number. pixel position for the element top
      //   zindex:    Number. Index to assigne to the canvas element.
      //              Only effective when position is specified. If
      //              unspecified the default value will be set to
      //              the current number of canvas elements.
      //   height:    Number. Canvas element height.
      //   width:     Number. Canvas element width.
      //   cssclass:  String. The name of a css class to apply
      //              to the canvas.
      //   container: Element to which the canvas will be
      //              appended. If null or missing will
      //              default to document.body.
      //   add:       Boolean. If true the new context will
      //              be added to the _contexts array. If
      //              false or missing it will not be added.
      if (options) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.setAttribute("id", options.canvasid);
        if (options.position) {
          canvas.style.position = options.position.style;
          canvas.style.left = options.position.left;
          canvas.style.top = options.position.top;
          if (options.zindex || options.zindex == 0) {
            canvas.style.zIndex = options.zindex;
          } else {
            canvas.style.zIndex = _contexts.length;
          }
        }        
        console.log(options.canvasid + ": " + canvas.style.zIndex);
        canvas.height = options.height;
        canvas.width = options.width;
        if (canvas.cssclass) {
          canvas.setAttribute("class", options.cssclass);
        }
        if (canvas.container) {
          canvas.container.appendChild(canvas);
        } else {
          document.body.appendChild(canvas);
        }
        if (options.add) {
          _contexts.push({
            id: options.canvasid, 
            ctx: ctx
          });
        }
        return ctx;
      } else {
        return null;
      }
    },
    add: function(id, ctx) {
      _contexts.push({ 
        id: id,
        ctx: ctx
      });
    },
    get: function(id) {
      for (var i=0; i<_contexts.length; i++) {
        if (_contexts[i].id == id) {
            return _contexts[i].ctx;
        }
      }
      return null;
    },
    item: function(index) {
      if (index < _contexts.length) {
        return _contexts[index].ctx;
      }
    },
    top: function() {
      if (_contexts.length > 0) {
        return _contexts[_contexts.length-1].ctx;
      }
    },
    count: function() {
      return _contexts.length;
    },
    clear: function() {
      _contexts = [];
    }
  };
  
  
  this.init = function() {
	  if (!_data) {
		  console.log("Either start a new game or load a current game! Exiting...");
	  }
    
    var gamespaceElement = document.createElement("div");
    gamespaceElement.style.position = "relative";
    
    _playerPrefs = _data.playerPrefs,
    _boardPrefs = _playerPrefs.board,
    _colorPrefs = _playerPrefs.colors;
    
    var boardOpts = {
      game: this,
      x: 0,
      y: 0,
      width: _boardPrefs.width,
      height: _boardPrefs.height,
      squareColor: _colorPrefs.squareColor,
      boardColor: _colorPrefs.boardColor,
      showBorder: _boardPrefs.showBorder, 
      borderWidth: _boardPrefs.borderWidth,
      borderStyle: _boardPrefs.borderStyle,
      borderColor: _colorPrefs.boardBorderColor,
      checkerSize: _boardPrefs.checkerSize
    }
    
    _board = new Board(boardOpts);
    _board.init();
    _board.setGameState(_data.boardState);
    this.contexts.clear();
    this.contexts.new({
      canvasid: _boardContext,
      container: gamespaceElement,
      position: {
        style: "absolute",
        left: 0,
        top: 0
      },
      height: 600,
      width: 600,
      add: true
    });
    this.contexts.new({
      canvasid: _fxContext,
      container: gamespaceElement,
      position: {
        style: "absolute",
        left: 0,
        top: 0
      },
      height: 600,
      width: 600,
      add: true
    });
        
    this.render.board(this.contexts.get(_boardContext));
    this.contexts.top().canvas.addEventListener("click", this.boardClick, true);
    
    //aniSelection(_board.getSquareById(15), this.contexts.get("fx"));
  };
  
  this.startNew = function() { 
	  this.load(server.startNew());
    this.init();
  };
  
  this.load = function(gameData) {
    // load game data
    _id = gameData.id;
    _playerid = gameData.playerid;
    _opponentid = gameData.opponentid;
    for (var attr in gameData) {
      if (gameData.hasOwnProperty(attr)) {
        _data[attr] = gameData[attr];
      }
    }
  };
  
  this.render = {
    board: function(ctx) {
      
      // draw board and border
      ctx.beginPath();
      ctx.fillStyle = _board.color;
      ctx.strokeStyle = _board.borderColor;
      ctx.lineWidth = _board.borderWidth;
      ctx.strokeRect(_board.x, _board.y, _board.width, _board.height);
      ctx.fillRect(_board.x + _board.borderWidth/2, _board.y + _board.borderWidth/2, 
                   _board.width - _board.borderWidth, _board.height - _board.borderWidth);
      
      // draw game squares
      for (var i=0; i<_board.squares.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = _board.squares[i].color;
        ctx.fillRect(_board.squares[i].x, _board.squares[i].y, _board.squares[i].size.wide, _board.squares[i].size.tall);
      }
      
      // draw checkers
      for (var i=0; i<_board.checkers.length; i++) {
        ctx.beginPath();
        ctx.arc(_board.checkers[i].x, _board.checkers[i].y, _board.checkers[i].size, 0, 2 * Math.PI, false);
        ctx.fillStyle = _board.checkers[i].color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(_board.checkers[i].x, _board.checkers[i].y, _board.checkers[i].size*0.75, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "rgb(50,50,50)";
        ctx.stroke();
      }
      
      //var s = _board.getSquareById("1");
      //ctx.clearRect(s.x-1, s.y-1, s.size.wide+2, s.size.tall+2);
      
    },
    highlightSquare: function(ctx, square, highlightOn, highlightColor) {
      if (ctx && square) {
        if (highlightOn) {
          console.log(highlightColor);
          ctx.beginPath();
          ctx.strokeStyle = highlightColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(square.x+1, square.y+1, square.size.wide-2, square.size.tall-2);
          square.isHighlighted = true;
          //console.log("[" + this.id + "] (ON) has checker? " + this.hasChecker());
        } else {
          this.render.board(ctx);
          square.isHighlighted = false;
          //console.log("[" + this.id + "] (OFF) has checker? " + this.hasChecker());
        }
      }
    }
  };
  
  this.highlightValidMoves = function(square) {
    //possibleMoves[MFR,MFL,JFR,JFL,MBR,MBL,JBR,JBL];
    if (square && square.getOwner() == PLAYERCONTROLLED) {
      var possibleMoves = _board.getMoves(square),
          validMoves = [];
          i = 0;
      for (; i<possibleMoves.length; i++) {
        if (possibleMoves[i] > 0) {
          switch(i) {
            case 0: // forward right
              var sq = _board.getSquareById(possibleMoves[i]);
              if (sq.getOwner() == NOTCONTROLLED) {
                validMoves.push(sq);
              } else {
                if (sq.getOwner() == OPPONENTCONTROLLED) {
                  sq = _board.getSquareById(possibleMoves[i+2]);
                  console.log("sqid:" + sq.id);
                  console.log("owner:" + sq.getOwner());
                  if (sq.getOwner() == NOTCONTROLLED) {
                    console.log("!");
                    validMoves.push(sq);
                  }
                }
              }
              break;
            case 1: // forward left
              var sq = _board.getSquareById(possibleMoves[i]);
              if (sq.getOwner() == NOTCONTROLLED) {
                validMoves.push(sq);
              } else {
                if (sq.getOwner() == OPPONENTCONTROLLED) {
                  sq = _board.getSquareById(possibleMoves[i+2]);
                  if (sq.getOwner() == NOTCONTROLLED) {
                    validMoves.push(sq);
                  }
                }
              }
              break;
            case 4: // backward right
              if (square.checker.isKing) {
                var sq = _board.getSquareById(possibleMoves[i]);
                if (sq.getOwner() == NOTCONTROLLED) {
                  validMoves.push(sq);
                } else {
                  if (sq.getOwner() == OPPONENTCONTROLLED) {
                    sq = _board.getSquareById(possibleMoves[i+2]);
                    if (sq.getOwner() == NOTCONTROLLED) {
                      validMoves.push(sq);
                    }
                  }
                }
              }
              break;
              case 5: // backward left
                if (square.checker.isKing) {
                  var sq = _board.getSquareById(possibleMoves[i]);
                  if (sq.getOwner() == NOTCONTROLLED) {
                    validMoves.push(sq);
                  } else {
                    if (sq.getOwner() == OPPONENTCONTROLLED) {
                      sq = _board.getSquareById(possibleMoves[i+2]);
                      if (sq.getOwner() == NOTCONTROLLED) {
                        validMoves.push(sq);
                      }
                    }
                  }
                }
                break;
          } // switch(i)
        }
      }
      console.log(validMoves.length);
      for (var i=0; i<validMoves.length; i++) {
        game.render.highlightSquare(game.contexts.get(_boardContext), validMoves[i], true, _colorPrefs.normalHighlightColor);
      }
    }
  };
  
  this.boardClick = function(e) {
    var xd = new Date();
    var xt = xd.getTime();
    aniSelection(_board.getSquareById(15), game.contexts.get("fx"), 0, xt);
    var pt = new Point(e.clientX, e.clientY),
        currentSquare = _board.selectedSquare,
        controlState,
        newSquare = _board.getSquareByCoord(pt.x, pt.y);
    if (newSquare) {
      controlState = newSquare.getOwner();
      if (controlState == PLAYERCONTROLLED) {
        game.render.board(game.contexts.get(_boardContext));
        game.render.highlightSquare(game.contexts.get(_boardContext), newSquare, true, _colorPrefs.selectedHighlightColor);
        game.highlightValidMoves(newSquare);
        _board.selectedSquare = newSquare;
      } else {
        if (controlState == NOTCONTROLLED) {
          if (currentSquare != null) {
            var moves = _board.getMoves(currentSquare),
                index = moves.indexOf(newSquare.id);
            if (index != -1) {
              var checker = currentSquare.checker;
              if (checker) {
                if (index < 4 || checker.isKing) {
                  // move checker
                  game.render.board(game.contexts.get(_boardContext));
                  console.log("Move checker from " + currentSquare.id + " to " + newSquare.id);
                }
              }
            } // else invalid move
          }
        }
      }
    }
  };
  
} // Game()


function Point(x, y) {
	this.x = x;
	this.y = y;
}
function clone(obj){
    var temp = {}; // changed

    for(var key in obj)
        temp[key] = obj[key];
		
    return temp;
}
