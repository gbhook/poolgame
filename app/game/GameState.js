'use strict' ;

var config = require('./config') ;

var GameState = function () {

  this.players = [{name:'Player One',score:0}, {name:'Player Two',score:0}] ;
  this.activePlayer = 0 ;
  this.state = config.gameState.playerOneReady ;

} ;

var gsProto = GameState.prototype ;


gsProto.nextPlayer = function () {



} ;

module.exports = GameState ;
