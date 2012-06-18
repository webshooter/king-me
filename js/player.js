/* PLAYER.JS */

function Player() {
  id = "p" + getId(25);
  this.getId = function() { return id; }
  this.color = "rgb(255,255,255)";
};

Player.prototype.setColor = function(color) {
  this.color = color;
};
