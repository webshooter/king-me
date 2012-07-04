window.requestAnimFrame = (function(callback){  //  TODO:
    return window.requestAnimationFrame ||      //  Figure out what is going on
    window.webkitRequestAnimationFrame  ||      //  with requestAnimationFrame so
    window.mozRequestAnimationFrame     ||      //  I can better control the  
    window.oRequestAnimationFrame       ||      //  animation speed and fps
    window.msRequestAnimationFrame      ||      //
    function(callback){
        window.setTimeout(callback, 1000 / 120);
    };
})();

function aniSelection(square, ctx, dx, lastTime, dir) {
  
  if (dir == null) {
    dir = "out";
  }
  
  if (dx == null) {
    dx = 0;
  }
  
  if (lastTime == null) {
    lastTime = 0;
  }

  var date = new Date();
  var time = date.getTime();
  var timeDiff = time - lastTime;
  //console.log(time + ", " + lastTime + " [" + timeDiff + "]");
  
  if (timeDiff > 15) {
    //console.log("dir: " + dir + ", dx: " + dx);
    if (dir == "out") {
      ++dx;
      //console.log(">>>> " + dx);
      if (dx > 9) {
        dir = "in";
      }
    } else {
      --dx;
      //console.log("<<<< " + dx);
      if (dx < 1) {
        dir = "out";
      }
    }
    lastTime = time;
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }
  
  var x = square.x,
      y = square.y,
      w = square.size.wide,
      h = square.size.tall;
  
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 1;
    ctx.strokeRect(square.x-dx, square.y-dx, square.size.wide+(2*dx), square.size.tall+(2*dx));
    
  
    requestAnimFrame(function(){
      aniSelection(square, ctx, dx, lastTime, dir);
    });
}


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
        
        var absX = Math.abs((checker.square.x + checker.square.size.wide/2)-(targetX)) ,
            absY = Math.abs((checker.square.y + checker.square.size.tall/2)-(targetY));
        if (Math.abs(dX) < (absX*0.1) || Math.abs(dX) > (absX*0.9)) {
          stepX = 1;
        }
        if (Math.abs(dY) < (absY*0.1) || Math.abs(dY) > (absY*0.9)) {
          stepY = 1;
        }
        
        if (dX < 0) { stepX = stepX*(-1) };
        if (dY < 0) { stepY = stepY*(-1) };

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