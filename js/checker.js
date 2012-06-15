/* CHECKER.JS */

function Checker(square, color) {
    // set options
    this.square = square;
    this.id = this.square.id;
    this.color = color;
    this.isKing = false;
    this.context = (this.square) ? this.square.context : null;
    this.x = (this.square) ? parseFloat(square.x) + parseFloat(this.square.size.wide/2) : 0;
    this.y = (this.square) ? parseFloat(square.y) + parseFloat(this.square.size.tall/2) : 0;
    this.size = (this.square) ? parseFloat(this.square.size.wide*0.4) : 0;
    this.square.checker = this;
    this.validMoves = [];
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
Checker.prototype.determineValidMoves = function() {
    //     
};