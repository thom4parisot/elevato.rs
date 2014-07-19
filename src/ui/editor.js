'use strict';

var document = require('global/document');
var CodeMirror = require('global/window').CodeMirror;

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

module.exports = {
  create: function createEditor(el){
    var editor = CodeMirror.fromTextArea(el || document.getElementById('editor'), {
      mode: {
        name: "javascript",
        json: true
      },
      lineNumbers: true,
      autofocus: true,
      indentWithTabs: false,
      tabSize: 2,
      theme: "solarized dark",
      extraKeys : {
        "Ctrl-S": document.getElementById('run-code').click,
        "Cmd-S": document.getElementById('run-code').click
      }
    });

    editor.setSize('100%', '450px');

    return editor;
  }
};