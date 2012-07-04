/* CHECKER.JS */

function Checker(square) {
  // set options
  this.square = square;
  this.id = this.square.id;
	this.square.checker = this;
  this.playerid = null;
  this.color = null;
	this.isKing = false;
  this.x = (this.square) ? parseFloat(square.x) + parseFloat(this.square.size.wide/2) : 0;
  this.y = (this.square) ? parseFloat(square.y) + parseFloat(this.square.size.tall/2) : 0;
	var sizeVal = 0.4; // default
	this.setSize = function(size) {
	  if (size < 1) {
	    sizeVal = size;
	  }
	}
	this.size = (this.square) ? parseFloat(this.square.size.wide*sizeVal) : 0;
};
Checker.prototype.draw = function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "black";
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size*0.75, 0, 2 * Math.PI, false);
    this.context.strokeStyle = "rgb(50,50,50)";
    this.context.stroke();
};



