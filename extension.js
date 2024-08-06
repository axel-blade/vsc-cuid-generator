const vscode = require('vscode');
const {createId} = require('@paralleldrive/cuid2');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.insertCUID', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, createId());
      });
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};