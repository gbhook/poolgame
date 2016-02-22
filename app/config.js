'use strict';

var config = {

  ball  : {
    ballRadius:0.4,
    linearDamping: 0.2 ,
    angularDamping: 0.2,
    restitution : 1,
    density : 1 ,
    friction : 0.1,
    mass:1
    },
  amountOfBalls:10,
  vectorDivisor:1.3,

  messages: {
    scratch:'You Scratched!'
  }

};

module.exports = config;
