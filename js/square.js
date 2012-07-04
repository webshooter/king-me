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