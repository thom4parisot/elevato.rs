'use strict';

var window = require('global/document');
var document = require('global/document');

var editor = require('./ui/editor').create();
var scenarii = require('./scenarii');
var elevators = require('./elevators').create();

document.getElementById('level').addEventListener('change', function(){
  var currentScenario = scenarii.getCurrent();
  var bodyEl = document.querySelector('body');

  if (!currentScenario){
    return;
  }

  bodyEl.setAttribute('data-floors', currentScenario.floors);
  bodyEl.setAttribute('data-elevators', currentScenario.elevators);
});

document.getElementById('run-code').addEventListener('click', function(){
  var code = editor.getValue();
  var currentScenario = scenarii.getCurrent();

  localStorage.previousCode = code;

  if (currentScenario){
    scenarii.runScenario(currentScenario);
  }
});