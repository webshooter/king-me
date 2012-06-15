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
    
    if (this.board != null) {
        this.draw();
    }
};
Square.prototype.draw = function() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.size.wide, this.size.tall);
};
Square.prototype.clear = function() {
    this.context.clearRect(this.x-1, this.y-1, this.size.wide+2, this.size.tall+2);
    this.checker = null;
};
Square.prototype.highlightSelected = function(highlightOn, highlightColor) {
    if (highlightOn) {
        if (_currentSelectedSquare != null) {
            _currentSelectedSquare.highlightSelected(false);
        }
        this.context.beginPath();
        this.context.strokeStyle = "rgb(255,0,0)";
        this.context.lineWidth = 1;
        this.context.strokeRect(this.x, this.y, this.size.wide, this.size.tall);
        this.isHighlighted = true;
        _currentSelectedSquare = this;
    } else {
        this.clear();
        this.board.draw();
        this.isHighlighted = false;
    }
};
Square.prototype.hasChecker = function() {
    return (this.checker != null) ? true : false;
    // TODO: Write code/framework to determine player
    // versus opponent checker
};