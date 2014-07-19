'use strict';

var window = require('global/document');
var document = require('global/document');

var editor = require('./ui/editor').create();
var scenarii = require('./scenarii');
var elevators = require('./elevators').create();

var updateStatus = function updateStatus(){
  require('./elevators').updateStatus(scenarii.getCurrent());
};

document.getElementById('level').addEventListener('change', updateStatus);
setTimeout(updateStatus, 0);

document.getElementById('run-code').addEventListener('click', function(){
  var currentScenario = scenarii.getCurrent();

  editor.save();

  if (currentScenario){
    scenarii.runScenario(currentScenario, elevators);
  }
});