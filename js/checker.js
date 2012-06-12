/* CHECKER.JS */

/* #########################################################
   # CHECKER
   ######################################################### */
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
    var colTags = this.square.board.getColumnTags();
    var rowTags = this.square.board.getRowTags();
    
    var normalMoves = [ 
        { colShift:-1 , rowShift:1 }, // move forward left
        { colShift:1 , rowShift:1 }, // move forward right
        { colShift:-2 , rowShift:2 }, // jump forward left
        { colShift:2 , rowShift:2 } // jump forward right
    ];
    var kingMoves = [
        { colShift:-1 , rowShift:-1 }, // move backward left
        { colShift:1 , rowShift:-1 }, // move backward right
        { colShift:-2 , rowShift:-2 }, // jump backward left
        { colShift:2 , rowShift:-2 } // jump backward right
    ];
    
    
    
    var moveLeftForwardSq    = null,
        moveRightForwardSq   = null,
        jumpLeftForwardSq    = null,
        jumpRightForwardSq   = null,
        moveLeftBackwardSq   = null,
        moveRightBackwardSq  = null,
        jumpLeftBackwardSq   = null,
        jumpRightBackwardSq  = null;
    
    var selectedColumn = this.id.substring(0,1),
        selectedRow = this.id.substring(1),
        selectedColumnIndex = parseInt(colTags.indexOf(selectedColumn)),
        selectedRowIndex = parseInt(rowTags.indexOf(selectedRow));

    
    for (var i=0; i<normalMoves.length; i++) {
        var colShift = parseInt(normalMoves[i].colShift);
        var rowShift = parseInt(normalMoves[i].rowShift);
        var newCol = colTags[selectedColumnIndex + colShift];
        var newRow = rowTags[selectedRowIndex + rowShift];
        if (undefined != newCol && undefined != newRow) {
            // both newCol and newRow are valid
            var sq = this.square.board.getSquareById(newCol + newRow);
            if (colShift < 0) { // left
                if (rowShift < 2) { // move
                    moveLeftForwardSq = sq;
                } else { //jump
                    jumpLeftForwardSq = sq;
                }
            } else {              //right
                if (rowShift < 2) { // move
                    moveRightForwardSq = sq;
                } else {          //jump
                    jumpRightForwardSq = sq;
                }
            }
        }
    }
    console.log(moveLeftForwardSq);
    console.log(moveRightForwardSq);
    console.log(jumpLeftForwardSq);
    console.log(jumpRightForwardSq);
        
};