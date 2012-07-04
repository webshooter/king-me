/* UTILITIES.JS */

function clickSquare(square) {
  
  if (game) {
    
    // just for debugging
    if (square.hasChecker()) {
      console.log("[" + _currentChecker + "] square id: " + square.id + ", checker id: " + square.checker.id);
      console.log(square.checker);
    } else {
      console.log("[" + _currentChecker + "] square id: " + square.id + ", no checker.")
    }
    ////////////////////////////
    
    if (square.hasChecker()) {
      // clicked an active game square that has a checker
      if (_currentChecker != null) {
        if (_currentChecker.id == square.checker.id) {
          // unselect previously selected square/checker
          _currentChecker = null;
          square.highlightSelected(false);
        } else {
          // select new square/checker
          _currentChecker = square.checker;
          //square.checker.determineValidMoves();
          square.highlightSelected(true, HIGHLIGHTCOLOR);
          square.highlightValidMoves();
          //_currentChecker.highlightValidMoves(true, "rgb(255,255,255)");
        }
      } else {
        // selected a new square/checker
        _currentChecker = square.checker;
        square.highlightSelected(true, HIGHLIGHTCOLOR);
        _currentChecker.highlightValidMoves(true, "rgb(255,255,255)");
      }
    } else {
      // clicked an active game square that has NO checker
      if (_currentChecker != null) {
        // move currently selected checker to newly selected square
        aniMoveChecker(_currentChecker, square);
        _currentChecker = null;
      }
    }
  }
    
}

function getRandomId(idLength) {
  var id = "",
      pool = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  for (var i=0; i<idLength ;i++) {
    var rnd = Math.floor(Math.random() * (pool.length));
    id += pool.substring(rnd, rnd+1);
  }
  return id;
}