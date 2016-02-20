'use strict';

var BX = require('../util/Box2DShortCuts');
var config = require('../config') ;
var PoolBalls = require('./PoolBalls') ;
var PoolTable = require('./PoolTable') ;

var MainWorld = function () {

  this.destroyQueue = [] ;

  this.world = new BX.b2World(new BX.b2Vec2(0, 0), true) ;
  this.poolTable = new PoolTable(this.world) ;
  this.poolBalls = new PoolBalls(this.world) ;

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

    this.world.DestroyBody(this.destroyQueue[i]) ;
    //this.destroyQueue[i] = null ;
  }

  this.world.DrawDebugData();
  this.world.ClearForces();

} ;

mwproto.getOffRail = function(ball, rail) {

  var currentVelocity = ball.GetLinearVelocity() ;
  var newVelocity ;

  switch(rail) {
    case 'upper' :
          newVelocity = new BX.b2Vec2(0,(currentVelocity.y*-1))  ;
          break ;
    case 'lower' :
          newVelocity = new BX.b2Vec2(0,(currentVelocity.y*-1))  ;
          break ;
    case 'left' :
          newVelocity = new BX.b2Vec2((currentVelocity.x*-1),0)  ;
          break ;
    case 'right' :
          newVelocity = new BX.b2Vec2((currentVelocity.x*-1),0)  ;
          break ;
  }

  console.log(currentVelocity) ;
  //ball.SetLinearVelocity(newVelocity) ;
} ;

mwproto.onClickHandler = function(e) {

  this.poolBalls.cueBall.SetAwake(true) ;
  var currentVelocity = this.poolBalls.cueBall.GetLinearVelocity() ;
  var mouseX = (e.clientX-this.poolBalls.cueBall.GetPosition().x)/30 ;
  var mouseY = (e.clientY-this.poolBalls.cueBall.GetPosition().y)/30 ;
  var newVelocity = {
    x: (mouseX-this.poolBalls.cueBall.GetPosition().x)/config.vectorDivisor,
    y: (mouseY-this.poolBalls.cueBall.GetPosition().y)/config.vectorDivisor
  } ;

  currentVelocity.Add(new BX.b2Vec2(newVelocity.x,newVelocity.y)) ;

  this.poolBalls.cueBall.SetLinearVelocity(currentVelocity);

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

  } else if (a.name==='ball' && b.name === 'rail') {

    //window.world.getOffRail(a.body, b.rail) ;

  } else if (a.name==='rail' && b.name === 'ball') {

    //window.world.getOffRail(b.body, a.rail) ;

  }
} ;

BX.b2ContactListener.prototype.EndContact = function(contact) {

  var a = contact.GetFixtureA().GetUserData();
  var b = contact.GetFixtureB().GetUserData();

  if (a.name==='ball' && b.name === 'rail') {

    window.world.getOffRail(a.body, b.rail) ;

  } else if (a.name==='rail' && b.name === 'ball') {

    window.world.getOffRail(b.body, a.rail) ;

  }

} ;

module.exports = MainWorld ;

