'use strict';

var window = require('global/document');
var document = require('global/document');

var activeScenario;

var editor = require('./ui/editor').create(null, localStorage.codeContent);
var scenarii = require('./lib/scenarii');
var elevators = require('./lib/elevators').create(function(){
  scenarii.checkCompletion(activeScenario, elevators);
});

var updateStatus = function updateStatus(){
  require('./lib/elevators').updateStatus(scenarii.getCurrent());
};

var stopAll = function stopAll(){
  if (activeScenario) {
    document.body.removeAttribute('data-state');
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

  localStorage.codeContent = editor.getValue();

  if (currentScenario){
    activeScenario = scenarii.runScenario(currentScenario, elevators);
  }
});
