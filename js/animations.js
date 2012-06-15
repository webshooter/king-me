window.requestAnimFrame = (function(callback){    //  TODO:
    //return window.requestAnimationFrame ||      //  Figure out what is going on
    //window.webkitRequestAnimationFrame ||       //  with requestAnimationFrame so
    //window.mozRequestAnimationFrame ||          //  I can better control the  
    //window.oRequestAnimationFrame ||            //  animation speed and fps
    //window.msRequestAnimationFrame ||           //
    return function(callback){
        window.setTimeout(callback, 1000 / 120);
    };
})();


function aniMoveChecker(checker, square) {
      if (checker && square) {
        var ctx = checker.context;
        var brd = square.board;
        
        // update
        var currentX = checker.x,
            currentY = checker.y,
            targetX = square.x + square.size.wide/2
            targetY = square.y + square.size.tall/2,
            dX = targetX - currentX,
            dY = targetY - currentY,
            stepX = 2,
            stepY = 2;
        
        if (dX < 0) { stepX = -2 };
        if (dY < 0) { stepY = -2 };

        if (currentX != targetX) {
          checker.x += stepX; 
        } 
        if (currentY != targetY) {
          checker.y += stepY;
        }

        // redraw board
        brd.draw();
        
        // request new frame
        if (currentX != targetX || currentY != targetY) {
          
          requestAnimFrame(function(){
            aniMoveChecker(checker, square);
          });
          
        } else { // animation complete, reassign properties

          // remove checker from original square
          checker.square.checker = null;
          
          // assign checker to new square
          square.checker = checker;
          
          // assign new square to checker
          checker.square = square;
        }
    }
    
}