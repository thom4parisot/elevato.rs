'use strict';

var document = require('global/document');
var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/selection/active-line');
require('codemirror/addon/edit/matchbrackets');

//var code = document.getElementById('evaluated-scripts');
//var currentVersion = parseInt(code.getAttribute('data-version'), 10);
//
//if (localStorage.previousCode && parseInt(localStorage.codeVersion, 10) >= currentVersion){
//  editor.innerHTML = localStorage.previousCode;
//}
//else{
//  editor.innerHTML = localStorage.previousCode = code.innerHTML;
//  localStorage.codeVersion = currentVersion;
//}

function saveCodeState(editor){
  sessionStorage.codeDraft = editor.getValue();
}

module.exports = {
  create: function createEditor(textarea, defaultValue){
    textarea = textarea || document.getElementById('editor');

    var editor = CodeMirror.fromTextArea(textarea, {
      mode: {
        name: "javascript",
        json: true
      },
      lineNumbers: true,
      autofocus: true,
      indentWithTabs: false,
      styleActiveLine: true,
      matchBrackets: true,
      tabSize: 2,
      theme: "neo",
      extraKeys : {
        "Ctrl-S": saveCodeState,
        "Cmd-S": saveCodeState
      }
    });

    editor.setSize('auto', '100%');

    if (defaultValue || ''){
      editor.setValue(defaultValue);
    }

    editor.on('change', saveCodeState);

    return editor;
  }
};