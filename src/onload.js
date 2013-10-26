(function(d, context){
  'use strict';

  context.log = function(){
    var container = document.getElementById('logs');
    var l = document.createElement('p');
    l.innerText = [].slice.call(arguments).join(' ');

    container.insertBefore(l, container.childNodes[0]);
    console.log(arguments);
  }

  /*
   CodeMirror Stuff
   */
  var editor = d.getElementById('editor');
  var code = d.getElementById('evaluated-scripts');
  var currentVersion = parseInt(code.getAttribute('data-version'), 10);

  if (localStorage.previousCode && parseInt(localStorage.codeVersion, 10) <= currentVersion){
    editor.innerHTML = localStorage.previousCode;
  }
  else{
    editor.innerHTML = code.innerHTML;
    localStorage.codeVersion = currentVersion;
  }

  var strategyEditor = CodeMirror.fromTextArea(editor, {
    mode: {name: "javascript", json: true},
    lineNumbers: true,
    autofocus: true,
    indentWithTabs: false,
    tabSize: 2,
    theme: "solarized dark"
  });

  strategyEditor.setSize('100%', '100%');

  /*
   Selecting level
   */
  d.getElementById('level').addEventListener('change', function(e){
    log('Changed to scenario', this.value);

    var scenario = scenarii[this.value - 1];

    [].slice.call(d.querySelectorAll('[data-level]')).forEach(function(floor){
      if (floor.getAttribute('data-level') > scenario.floors){
        floor.classList.add('hidden');
      }
      else{
        floor.classList.remove('hidden');
      }
    });

    [].slice.call(d.querySelectorAll('.shaft')).forEach(function(shaft, i){
      if (parseInt(i, 10) >= scenario.elevators){
        shaft.classList.add('hidden');
      }
      else{
        shaft.classList.remove('hidden');
      }
    });

    [].slice.call(d.querySelectorAll('.elevator')).forEach(function(elevator){
      elevator.removeAttribute('style');
      elevator.setAttribute('data-at-floor', 1);
    });
  });

  /*
   Running scenario
   */
  d.getElementById('run-code').addEventListener('click', function(){
    var code = strategyEditor.getValue();
    var level = d.getElementById('level').value;
    localStorage.previousCode = code;
    var functions = eval(new Function(code + '; return { onFloorRequest: onFloorRequest, onElevatorIdle: onElevatorIdle }'))();

    Object.keys(functions).forEach(function(functionName){
      context[functionName] = functions[functionName];
    });

    if (level){
      runScenario(level);
    }
  });
})(document, window);