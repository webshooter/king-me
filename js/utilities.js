/* UTILITIES.JS */

/* #########################################################
   # UTILITY FUNCTIONS
   ######################################################### */

function clickSquare(square) {
    
    //var info;
    //info = {
    //    currentchecker: _currentChecker,
    //    squareid: square.id,
    //    haschecker: square.hasChecker()
    //};
    //console.log(info);
    
    if (square.hasChecker()) {
        square.checker.determineValidMoves();
        //console.log("A - has checker");
        if (_currentChecker != null) {
            //console.log("1 - _currentChecker is not null");
            if (_currentChecker.id == square.checker.id) {
                //console.log("a - selected checker is not _currentChecker");
                // unselect square/checker
                _currentChecker = null;
                square.highlightSelected(false);
            } else {
                //console.log("b - selected checker IS _currentChecker");
                // select new square/checker
                _currentChecker = square.checker;
                square.highlightSelected(true, HIGHLIGHTCOLOR);
            }
        } else {
            //console.log("2 - _currentChecker IS null");
            // select a square/checker
            _currentChecker = square.checker;
            square.highlightSelected(true, HIGHLIGHTCOLOR);
        }
    } else {
        //console.log("B - has NO checker");
        if (_currentChecker != null) {
            //console.log("1 - and _currentChecker is NOT null");
            square.board.moveChecker(_currentChecker, _currentChecker.square, square);
            _currentChecker = null;
        }
    }    
}



function printCheckers(arr) {
    var info = "";
    for (var i=0; i<arr.length; i++) {
        info +="[" + i + "]" + arr[i].square.id + " ";
    }
    console.log(info);
}