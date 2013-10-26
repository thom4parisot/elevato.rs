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
  editor.innerHTML = localStorage.previousCode || d.getElementById('evaluated-scripts').innerHTML;

  var strategyEditor = CodeMirror.fromTextArea(editor, {
    mode: {name: "javascript", json: true},
    lineNumbers: true,
    autofocus: true,
    indentWithTabs: false,
    tabSize: 2,
    theme: "solarized dark"
  });

  strategyEditor.setSize('100%', '100%');

  d.getElementById('run-code').addEventListener('click', function(){
    var code = strategyEditor.getValue();
    localStorage.previousCode = code;
    var functions = eval(new Function(code + '; return { onFloorRequest: onFloorRequest, onElevatorIdle: onElevatorIdle }'))();

    Object.keys(functions).forEach(function(functionName){
      context[functionName] = functions[functionName];
    });

    runAllScenarios();
  });
})(document, window);