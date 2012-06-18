/* GAME.JS */

function Game() {
  id = "g" + getId(25);
  this.getId = function() { return id; }
  this.board = null;
  
  this.boardDefaults = {
    game:          this,
    id:            "gameboard",
    width:         600,
    height:        600,
    rowCount:      8,
    colCount:      8,
    squareColor:   "rgb(100,100,100)",
    boardBg:       "rgb(200,200,100)",
    borderWidth:   10,
    borderStyle:   "solid",
    borderColor:   "rgb(50,50,50)"
  };
}

Game.prototype.initialize = function() {
  this.playerOne = new Player();
  this.playerTwo = new Player();
  this.playerOne.setColor("rgb(255,0,0)");
  this.playerTwo.setColor("rgb(255,255,0)");
  this.board = new Board(this, document.body, this.boardDefaults);
};
Game.prototype.load = function(gameData) {
  //
};
