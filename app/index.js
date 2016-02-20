'use strict';

var config = require('./config');
var MainWorld = require('./world/MainWorld');
var BX = require('./util/Box2DShortCuts') ;

console.log(config);

window.world = new MainWorld() ;



