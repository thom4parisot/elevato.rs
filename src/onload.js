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

  if (localStorage.previousCode && parseInt(localStorage.codeVersion, 10) >= currentVersion){
    editor.innerHTML = localStorage.previousCode;
  }
  else{
    editor.innerHTML = localStorage.previousCode = code.innerHTML;
    localStorage.codeVersion = currentVersion;
  }

  var strategyEditor = CodeMirror.fromTextArea(editor, {
    mode: {name: "javascript", json: true},
    lineNumbers: true,
    autofocus: true,
    indentWithTabs: false,
    tabSize: 2,
    theme: "solarized dark",
    extraKeys : {
      "Ctrl-S": function() {
        d.getElementById('run-code').click();
      }
    }
  });

  strategyEditor.setSize('100%', '450px');

  /*
   Selecting level
   */
  var level = d.getElementById('level');
  level.addEventListener('change', function(e){
    log('Switched to scenario', this.value);

    prepare(this);
  });

  function prepagePage(){
    context.location.href.match(/level=(\d+)/);
    var levelValue = RegExp.$1 || "";

    if (levelValue){
      level.value = levelValue;
    }
  }

  function prepare(levelElement){
    var scenario = scenarii[levelElement.value - 1];

    if (!scenario){
      return;
    }

    [].slice.call(d.querySelectorAll('[data-level]')).forEach(function(floor){
      if (floor.getAttribute('data-level') > scenario.floors){
        floor.setAttribute('hidden', true);
      }
      else{
        floor.removeAttribute('hidden');
      }
    });

    [].slice.call(d.querySelectorAll('.shaft')).forEach(function(shaft, i){
      if (parseInt(i, 10) >= scenario.elevators){
        shaft.setAttribute('hidden', true);
      }
      else{
        shaft.removeAttribute('hidden');
      }
    });
  }

  function hasToRun(){
    return !!context.location.href.match('&run');
  }

  /*
   Running scenario on click
   */
  d.getElementById('run-code').addEventListener('click', function(){
    var code = strategyEditor.getValue();
    var level = d.getElementById('level').value;

    localStorage.previousCode = code;

    context.location.href = '?level='+level+'&run';
  });

  /*
  On page load
   */
  prepagePage();
  prepare(level);

  if (level.value && hasToRun()){
    window['checkIfScenarioIsComplete'] = runScenario(level.value);
  }
})(document, window);
