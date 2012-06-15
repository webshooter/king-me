/* UTILITIES.JS */

function clickSquare(square) {
    
    // just for debugging
    if (square.hasChecker()) {
      console.log("[" + _currentChecker + "] square id: " + square.id + ", checker id: " + square.checker.id);
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
          console.log("!");
          _currentChecker = square.checker;
          square.highlightSelected(true, HIGHLIGHTCOLOR);
        }
      } else {
        // selected a new square/checker
        _currentChecker = square.checker;
        square.highlightSelected(true, HIGHLIGHTCOLOR);
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