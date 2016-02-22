'use strict' ;

var BX = require('../util/Box2DShortCuts') ;
var config = require('../config') ;

var PoolBalls = function(world) {

  this.world = world ;
  this.balls = [] ;
  this.startPosition = {x:20, y:8} ;
  this.ballPosition = [
    {x:0, y:0},
    {x:config.ball.ballRadius, y:config.ball.ballRadius} ,
    {x:config.ball.ballRadius, y:0-config.ball.ballRadius},
    {x:config.ball.ballRadius*2, y:config.ball.ballRadius*2},
    {x:config.ball.ballRadius*2, y:0},
    {x:config.ball.ballRadius*2, y:0-config.ball.ballRadius*2},
    {x:config.ball.ballRadius*3, y:config.ball.ballRadius},
    {x:config.ball.ballRadius*3, y:0-config.ball.ballRadius},
    {x:config.ball.ballRadius*3, y:0-config.ball.ballRadius*3},
    {x:config.ball.ballRadius*3, y:config.ball.ballRadius*3},
  ] ;

  this.bodyDef = new BX.b2BodyDef;
  this.fixDef = new BX.b2FixtureDef;
  this.bodyDef.type = BX.b2Body.b2_dynamicBody;
  this.bodyDef.awake = true ;
  this.bodyDef.allowSleep = true ;
  this.bodyDef.linearDamping = config.ball.linearDamping ;
  this.bodyDef.angularDamping = config.ball.angularDamping ;
  this.bodyDef.restitution = config.ball.restitution;
  this.fixDef.shape = new BX.b2CircleShape(config.ball.ballRadius);
  this.fixDef.density = config.ball.density ;
  this.fixDef.friction = config.ball.friction ;

  //build racked balls
  for(var i = 0 ; i < config.amountOfBalls ; i++) {

    this.bodyDef.position.x = this.startPosition.x + this.ballPosition[i].x ;
    this.bodyDef.position.y = this.startPosition.y + this.ballPosition[i].y ;
    var ball = this.world.CreateBody(this.bodyDef) ;
    var userData = {name:'ball', body:ball} ;
    this.fixDef.userData = userData ;
    ball.CreateFixture(this.fixDef);

    this.balls.push(ball);
  }

  this.createCueBall() ;
  //this.cueBall = this.world.CreateBody(this.bodyDef) ;
  //this.cueBall.CreateFixture(this.fixDef);

} ;

var pbProto = PoolBalls.prototype ;

pbProto.createCueBall = function () {

  this.bodyDef.type = BX.b2Body.b2_dynamicBody;
  this.bodyDef.awake = true ;
  this.bodyDef.allowSleep = true ;
  this.bodyDef.linearDamping = config.ball.linearDamping ;
  this.bodyDef.angularDamping = config.ball.angularDamping ;
  this.bodyDef.restitution = config.ball.restitution;
  this.bodyDef.mass = config.ball.mass ;
  this.fixDef.shape = new BX.b2CircleShape(config.ball.ballRadius);
  this.fixDef.density = config.ball.density ;
  this.fixDef.friction = config.ball.friction ;

  this.bodyDef.position.x =  5;
  this.bodyDef.position.y =  8;
  this.cueBall = this.world.CreateBody(this.bodyDef) ;
  var userData = {name:'cueball', body:this.cueBall} ;
  this.fixDef.userData = userData ;
  this.cueBall.CreateFixture(this.fixDef);

};

pbProto.shootCueBall = function(e) {

  this.cueBall.SetAwake(true) ;
  var currentVelocity = this.cueBall.GetLinearVelocity() ;
  var mouseX = (e.clientX-this.cueBall.GetPosition().x)/30 ;
  var mouseY = (e.clientY-this.cueBall.GetPosition().y)/30 ;
  var newVelocity = {
    x: (mouseX-this.cueBall.GetPosition().x)/config.vectorDivisor,
    y: (mouseY-this.cueBall.GetPosition().y)/config.vectorDivisor
  } ;

  currentVelocity.Add(new BX.b2Vec2(newVelocity.x,newVelocity.y)) ;

  this.cueBall.SetLinearVelocity(currentVelocity);

} ;

pbProto.destroyCueBall = function () {
  this.world.DestroyBody(this.cueBall) ;
  this.cueBall = null ;
  this.createCueBall() ;
};

module.exports = PoolBalls ;
