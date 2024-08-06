const vscode = require('vscode');
const { createId } = require('@paralleldrive/cuid2');

function activate(context) {
    let disposable = vscode.commands.registerCommand('cuid.insert', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                // Get all active selections
                const selections = editor.selections;

                selections.forEach(selection => {
                    if (selection.isEmpty) {
                        // If it's a single cursor, just insert at that position
                        editBuilder.insert(selection.active, createId());
                    } else {
                        // If it's a selection (including multiple lines), replace each line
                        for (let i = selection.start.line; i <= selection.end.line; i++) {
                            const line = editor.document.lineAt(i);
                            const range = line.range;
                            editBuilder.replace(range, createId());
                        }
                    }
                });
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