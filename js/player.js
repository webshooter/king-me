/* PLAYER.JS */

function Player() {
  
  this.id = null;  // id is assigned during load
  
  this.prefs = {
    tag: "newPlayer",
    myColor: "rgb(255,0,0)",
    opponentColor: "rgb(0,0,0)",
    boardColor: "rgb(255,0,0)",
    boardBorderWidth: 10,
    boardBorderColor: "rgb(100,100,100)",
    boardBorderStyle: "solid",
    squareColor: "rgb(150,150,150)",
    checkerSize: 0.4
  };
  
  this.load = function(playerData) {
    this.id = playerData.id;
    for (var attr in playerData) {
      if (playerData.hasOwnProperty(attr)) {
        this.prefs[attr] = playerData[attr];
      }
    }
  };
  
};