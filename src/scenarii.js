'use strict';

var window = require('global/window');
var document = require('global/document');

var data = require('./scenarii-data');
var requestFloor = require('./elevators').requestFloor;

module.exports = {
  getCurrent: function getCurrentScenario(){
    var level = Number(document.querySelector('#level').value) - 1;

    return data[level] || null;
  },
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

    var start = Date.now();
    var configuredRequestFloorCallback = requestFloor.bind(null, allElevators.slice(0, scenario.elevators));

    scenario.run(configuredRequestFloorCallback);

    return (function(start){
      return function checkIfScenarioIsComplete(elevators){
        var allIdle = elevators.some(function(elevator){
          return elevator.state === "idle";
        });

        if (allIdle){
          document.body.setAttribute('data-state', document.querySelectorAll('.floor[data-state="waiting"]').length ? 'failure' : 'success');
          log("All elevators are now idle");
          log('Scenario', level, 'complete in', (Date.now()-start-1000) / 1000, 'seconds.');
        }
      }
    })(start);
  }
}




