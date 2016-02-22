'use strict';

var BX = require('../util/Box2DShortCuts') ;
var config = require('../config') ;

var PoolTable = function(world) {

  this.world = world ;

  this.fixDef = new BX.b2FixtureDef;
  this.bodyDef = new BX.b2BodyDef;

  this.fixDef.density = 1.0;
  this.fixDef.friction = 0.1;
  this.fixDef.restitution = 1;

  this.bodyDef.type = BX.b2Body.b2_staticBody;
  this.fixDef.shape = new BX.b2PolygonShape;
  this.fixDef.userData = {name : 'rail', rail:'lower'} ;
  this.fixDef.shape.SetAsBox(13.3, 1);
  this.bodyDef.position.Set(15, 16);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
  this.fixDef.userData = {name : 'rail', rail:'upper'} ;
  this.bodyDef.position.Set(15, 1);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
  this.fixDef.shape.SetAsBox(1, 5.8);
  this.bodyDef.position.Set(0, 8.5);
  this.fixDef.userData = {name : 'rail', rail:'left'} ;
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
  this.bodyDef.position.Set(30, 8.5);
  this.fixDef.userData = {name : 'rail', rail:'right'} ;
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.fixDef.shape = new BX.b2CircleShape(0.7);
  this.fixDef.userData = {name : 'pocket'} ;

  this.bodyDef.position.Set(1, 2);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.bodyDef.position.Set(15, 2);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.bodyDef.position.Set(1, 15);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.bodyDef.position.Set(29, 2);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.bodyDef.position.Set(15, 15);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

  this.bodyDef.position.Set(29, 15);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

} ;

module.exports = PoolTable ;
