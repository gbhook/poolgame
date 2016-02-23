'use strict';

var config = {

  ball  : {
    ballRadius:0.4,
    linearDamping: 0.4 ,
    angularDamping: 0.4,
    restitution : 1,
    density : 1 ,
    friction : 0,
    mass:0
    },
  amountOfBalls:10,
  velocityThreshold:0.025 ,
  vectorDivisor:1,
  canvasWidth:950,
  canvasHeight:510,

  messages: {
    scratch:'you scratched!',
    ready: 'its your turn!',
    shooting: 'BOOM',
    sank: 'Score!'

  },

  gameState : {
    playerReady:'playerReady',
    shooting:'shooting',


  }

};

module.exports = config;
