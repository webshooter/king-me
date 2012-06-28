/* SQUARE.JS */

function Square(x, y, size, board, color) {
    // set options
    this.x       = x     || 0;
    this.y       = y     || 0;
    this.size    = size  || { tall:0, wide:0 };
    this.color   = color || "rgb(100,100,100)";
    this.board   = board || null;
    this.context = board.context;
    this.id      = null;
    this.checker = null;
    this.isHighlighted = false;
    //this.validMoves = this.getMoves();
};
Square.prototype.getOwner = function() {
  if (this.checker != null) {
    var gamedata = this.board.game.getData();
    if (this.checker.playerid == gamedata.playerid) {
      return 1; //player owned/controlled
    } else {
      return 2; //opponent owned/controlled
    }
  }
  return 0; // not owned/controlled
};
// Square.prototype.draw = function() {
//     this.context.beginPath();
//     this.context.fillStyle = this.color;
//     this.context.fillRect(this.x, this.y, this.size.wide, this.size.tall);
// };
// Square.prototype.clear = function() {
//     this.context.clearRect(this.x-1, this.y-1, this.size.wide+2, this.size.tall+2);
//     //this.checker = null;
// };
// Square.prototype.highlight = function(highlightOn, highlightColor) {
//   if (highlightOn) {
//     this.context.beginPath();
//     this.context.strokeStyle = highlightColor;
//     this.context.lineWidth = 1;
//     this.context.strokeRect(this.x+5, this.y+5, this.size.wide-10, this.size.tall-10);
//     this.isHighlighted = true;
//   } else {
//     //this.clear();
//     this.board.draw();
//     this.isHighlighted = false;
//   }
// };
// Square.prototype.highlightSelected = function(highlightOn, highlightColor) {
//     if (highlightOn) {
//         if (_currentSelectedSquare != null) {
//             _currentSelectedSquare.highlight(false);
//         }
//         this.highlight(highlightOn, highlightColor);
//         _currentSelectedSquare = this;
//     } else {
//       this.highlight(false);
//     }
// };
// Square.prototype.highlightValidMoves = function(highlightColor) {
//   if (this.hasChecker()) {
//     for (var i=0; i<validMoves.length; i++) {
//       if (this.validMoves[i] != 0) {
//         var sq = this.board.getSquare(moves[i]);
//         sq.highlight(true, "rgb(0,0,0)");
//       }
//     }
//   }
// };
// Square.prototype.hasChecker = function() {
//     return (this.checker != null) ? true : false;
//     // TODO: Write code/framework to determine player
//     // versus opponent checker
// };
// Square.prototype.getMoves = function(squareId) {
//   if (squareId == null) {
//     squareId = this.id + 1;
//   }
//                 //|--notpromoted--|---promoted---|
//   var moves=[]; // MFR,MFL,JFR,JFL,MBR,MBL,JBR,JBL
//   moves[0] = [0, 5, 0, 10, 0, 0, 0, 0];
//   moves[1] = [5, 6, 0, 0, 0, 0, 0, 0];
//   moves[2] = [6, 7, 10, 12, 0, 0, 0, 0];
//   moves[3] = [7, 8, 11, 0, 0, 0, 0, 0];
//   moves[4] = [9, 10, 0, 14, 1, 2, 0, 0];
//   moves[5] = [10, 11, 13, 15, 2, 3, 0, 0];
//   moves[6] = [11, 12, 14, 16, 3, 4, 0, 0];
//   moves[7] = [12, 0, 15, 0, 4, 0, 0, 0];
//   moves[8] = [0, 13, 0, 18, 0, 5, 0, 2];
//   moves[9] = [13, 14, 17, 19, 5, 6, 1, 3];
//   moves[10] = [14, 15, 18, 20, 6, 7, 2, 4];
//   moves[11] = [15, 16, 19, 0, 7, 8, 3, 0];
//   moves[12] = [17, 18, 0, 22, 9, 10, 0, 6];
//   moves[13] = [18, 19, 21, 23, 10, 11, 5, 7];
//   moves[14] = [19, 20, 22, 24, 11, 12, 6, 8];
//   moves[15] = [20, 0, 23, 0, 12, 0, 7, 0];
//   moves[16] = [0, 21, 0, 26, 0, 13, 0, 10];
//   moves[17] = [21, 22, 25, 27, 13, 14, 9, 11];
//   moves[18] = [22, 23, 26, 28, 14, 15, 10, 12];
//   moves[19] = [23, 24, 15, 16, 27, 0, 11, 0];
//   moves[20] = [25, 26, 17, 18, 0, 30, 0, 14];
//   moves[21] = [26, 27, 18, 19, 29, 31, 13, 15];
//   moves[22] = [27, 28, 19, 20, 30, 32, 14, 16];
//   moves[23] = [28, 0, 31, 0, 20, 0, 15, 0];
//   moves[24] = [0, 29, 0, 0, 0, 21, 0, 18];
//   moves[25] = [29, 30, 0, 0, 21, 22, 17, 19];
//   moves[26] = [30, 31, 0, 0, 22, 23, 18, 20];
//   moves[27] = [31, 32, 0, 0, 23, 24, 19, 0];
//   moves[28] = [0, 0, 0, 0, 25, 26, 0, 22];
//   moves[29] = [0, 0, 0, 0, 26, 27, 21, 23];
//   moves[30] = [0, 0, 0, 0, 27, 28, 22, 24];
//   moves[31] = [0, 0, 0, 0, 28, 0, 23, 0];
//   if (squareId > 0 && squareId < 32) {
//     return moves[squareId-1];
//   }
//   return null;
// };