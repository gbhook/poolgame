'use strict';

var BX = require('../../util/Box2DShortCuts');
var config = require('../config') ;
var PoolBalls = require('./PoolBalls') ;
var PoolTable = require('./PoolTable') ;
var ScoreBoard = require('../scoreboard/Scoreboard') ;
var GameState = require('../GameState') ;

var MainWorld = function () {

  this.destroyQueue = [] ;
  this.destroyCueBall = false ;

  this.world = new BX.b2World(new BX.b2Vec2(0, 0), true) ;
  this.context = document.getElementById("canvas").getContext("2d");

  this.poolTable = new PoolTable(this.world) ;
  this.poolBalls = new PoolBalls(this.world, this.context) ;
  this.scoreboard = new ScoreBoard() ;
  this.gameState = new GameState(this) ;


  //setup debug draw
  var debugDraw = new BX.b2DebugDraw();
  debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
  debugDraw.SetDrawScale(30.0);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(BX.b2DebugDraw.e_shapeBit | BX.b2DebugDraw.e_jointBit);
  this.world.SetDebugDraw(debugDraw);

  window.setInterval(this.update.bind(this), 1000 / 60);

  document.getElementById("canvas").addEventListener('click', this.onClickHandler.bind(this)) ;

} ;

var mwproto = MainWorld.prototype ;

mwproto.update = function () {

  this.world.Step(
    1 / 60   //frame-rate
    ,  10       //velocity iterations
    ,  10       //position iterations
  );

  for(var i in this.destroyQueue) {

    this.poolBalls.destroyBall(this.destroyQueue[i]) ;
    this.world.DestroyBody(this.destroyQueue[i]) ;

  }

  this.destroyQueue=[] ;

  if(this.destroyCueBall) {
    this.poolBalls.destroyCueBall() ;

    this.destroyCueBall = false ;
  }

  this.world.DrawDebugData();
  this.world.ClearForces();
  this.poolBalls.update() ;
  this.gameState.update() ;
  //this.context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

} ;

mwproto.onClickHandler = function(e) {

  if(this.gameState.getState()===config.gameState.playerReady)
  {
    this.poolBalls.shootCueBall(e.clientX, e.clientY) ;
  } else {
    console.log('No Shot - Balls in Motion') ;
  }

} ;

BX.b2ContactListener.prototype.BeginContact = function(contact) {

  var a = contact.GetFixtureA().GetUserData();
  var b = contact.GetFixtureB().GetUserData();

  if (a.name === 'ball' && b.name === 'pocket') {

    console.log('POCKET!!!');
    window.world.destroyQueue.push(a.body);

  } else if (a.name === 'pocket' && b.name === 'ball') {

    window.world.destroyQueue.push(b.body);
    console.log('TEKCOP!!!');

  } else if (a.name==='cueball' && b.name === 'pocket') {

    window.world.destroyCueBall = true ;
    console.log("SCRATCH") ;

  } else if (a.name==='cueball' && b.name === 'cueball') {

    window.world.destroyCueBall = true;
    console.log("SCRATCH") ;

  }
} ;

BX.b2ContactListener.prototype.EndContact = function(contact) {

  var a = contact.GetFixtureA().GetUserData();
  var b = contact.GetFixtureB().GetUserData();


} ;

module.exports = MainWorld ;

