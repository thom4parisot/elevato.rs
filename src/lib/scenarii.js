'use strict';

var window = require('global/window');
var document = require('global/document');

var Scenario = require('./scenario');
var data = require('./../scenarii-data');
var requestFloor = require('./elevators').requestFloor;

module.exports = {
  /**
   *
   * @returns {*|null}
   */
  getCurrent: function getCurrentScenario(){
    var level = Number(document.querySelector('#level').value) - 1;

    return new Scenario(data[level]) || null;
  },
  /**
   *
   * @param scenario {Scenario}
   * @param allElevators
   */
  runScenario: function runScenario(scenario, allElevators){
    var currentCode = document.querySelector('#editor').value.trim();
    var functions = eval(new Function(currentCode + '; return { onFloorRequest: onFloorRequest, onElevatorIdle: onElevatorIdle }'))();

    Object.keys(functions).forEach(function(functionName){
      window[functionName] = functions[functionName];
    });

    if(typeof onFloorRequest !== 'function')
      throw new Error('An "onFloorRequest" function must be defined somewhere');

    if(typeof onElevatorIdle !== 'function')
      throw new Error('An "onElevatorIdle" function must be defined somewhere');

    var configuredRequestFloorCallback = requestFloor.bind(null, allElevators.slice(0, scenario.elevators));

    return scenario.run(configuredRequestFloorCallback);
  }
};




