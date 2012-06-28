/* EVENTHANDLERS.JS */

/* #########################################################
   # EVENTHANDLERS
   ######################################################### */
function canvasClick(event) {
    event.preventDefault();
    var sq;
    if (game.board) {
        sq = game.board.getSquareByCoord(event.clientX, event.clientY);
        if (sq) {
          console.log(game.board.getBoardStateArr());
          clickSquare(sq);
        }
        return;
    }
}

