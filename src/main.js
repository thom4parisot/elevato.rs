'use strict';

var window = require('global/document');
var document = require('global/document');

var editor = require('./ui/editor').create();
var scenarii = require('./lib/scenarii');
var elevators = require('./lib/elevators').create();
var activeScenario;

var updateStatus = function updateStatus(){
  require('./lib/elevators').updateStatus(scenarii.getCurrent());
};

var stopAll = function stopAll(){
  if (activeScenario) {
    activeScenario.stop();
    require('./lib/elevators').reset(elevators);

    activeScenario = null;
  }
};

document.getElementById('level').addEventListener('change', updateStatus);
setTimeout(updateStatus, 0);

document.getElementById('stop-code').addEventListener('click', stopAll);
document.getElementById('run-code').addEventListener('click', stopAll);

document.getElementById('run-code').addEventListener('click', function(){
  var currentScenario = scenarii.getCurrent();
  activeScenario = null;

  editor.save();

  if (currentScenario){
    activeScenario = scenarii.runScenario(currentScenario, elevators);
  }
});
