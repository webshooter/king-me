/* EVENTHANDLERS.JS */

/* #########################################################
   # EVENTHANDLERS
   ######################################################### */
function canvasClick(event) {
    event.preventDefault();
    var sq;
    if (board) {
        sq = board.getSquareByCoord(event.clientX, event.clientY);
        if (sq) {
            clickSquare(sq);
        } else {
            //console.log("Not an active game square!");
        }
        return;
    }
}