function Server() {
  
  var gameData = {};
  
  this.getGameData = function(gameid, playerid) {
    gameData = {
      gameid: "g0uGTvdw5gUTJZeWAvZLJUtRgJ",
      playerid: "pWqtHV9hTiATu0qPIqp2tg8G39",
      opponentid: "plqROkILN0NX4gXu0fbxSyWOE6",
      boardState: "11111111111100200000022222222222",
      moves: [],
      playerPrefs: {
        tag: "Randall",
        board: {
          width: 600,
          height: 600,
          showBorder: true,
          borderWidth: 20,
          borderStyle: "solid",
          checkerSize: 0.4
        },
        colors: {
          myColor: "rgb(255,0,0)",
          opponentColor: "rgb(0,0,0)",
          boardColor: "rgb(255,40,40)",
          squareColor: "rgb(100,100,100)",
          boardBorderColor: "rgb(25,25,25)",
	      normalHighlightColor: "rgb(255,255,0)",
	      selectedHighlightColor: "rgb(255,255,255)"
        },
        background: {
          color: "rgb(255,255,255)",
          image: ""
        }
      }
    };
    return gameData;
  };
  
  this.startNew = function(challengerId, opponentId) {
	  // TODO: have server verify player ids
	  //       for now just return the gameData
	  return this.getGameData(null, null);
  };
  
  this.updateGameData = function(gameid, playerid, gameDataUpdate) {
    // need to make sure we have code to determine
    // if submitted game data is valid and that any
    // moves are legal
  };
  
}