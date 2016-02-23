'use strict' ;

var config = require('./config') ;

var GameState = function (mainWorld) {

  this.mainWorld = mainWorld ;
  this.players = [{name:'Player One',score:0}, {name:'Player Two',score:0}] ;
  this.activePlayer = 0 ;
  this.setState(config.gameState.playerReady) ;

} ;

var gsProto = GameState.prototype ;

gsProto.getState = function () {

  return this.state ;

} ;

gsProto.setState = function (state) {

  this.state = state ;

  switch(this.state) {

    case  config.gameState.playerReady :
          this.mainWorld.scoreboard.changeMessage(this.getActivePlayer().name + ', ' + config.messages.ready) ;
          break ;

    case config.gameState.shooting :
          this.mainWorld.scoreboard.changeMessage(this.getActivePlayer().name + ', ' + config.messages.shooting) ;
          break ;

  }

} ;

gsProto.getActivePlayer = function () {

  return this.players[this.activePlayer] ;

} ;

gsProto.shootCueBall = function () {

  this.state = config.gameState.shooting ;

} ;

gsProto.nextPlayer = function () {

  this.activePlayer++ ;

  if (this.activePlayer >= this.players.length) {
    this.activePlayer = 0 ;
  }

} ;

gsProto.update = function () {

  switch(this.state) {
    case config.gameState.shooting :
      if (!this.mainWorld.poolBalls.ballsMoving) {
        this.nextPlayer();
        this.setState(config.gameState.playerReady);
      }
          break ;

    case config.gameState.playerReady :
      if(this.mainWorld.poolBalls.ballsMoving) {
        this.setState(config.gameState.shooting) ;
      }
      break ;
  }


} ;

module.exports = GameState ;
