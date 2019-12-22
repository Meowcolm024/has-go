// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "has-go" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let run_ghci = vscode.commands.registerCommand('has-go.ghci', function () {
		// The code you place here will be executed every time your command is executed
		let terminal = vscode.window.createTerminal("GHCi");
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let text = vscode.workspace.textDocuments[0]
		let b = text.fileName
		if (text.languageId == 'haskell') {
			let c = b.replace(a + "/", "")
			terminal.sendText('ghci ' + c);
		} else {
			terminal.sendText('ghci');
		}
		terminal.show();
	});

	let run_haskell = vscode.commands.registerCommand('has-go.runfile', function () {
		let terminal = vscode.window.createTerminal("Run Haskell");
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let b = vscode.workspace.textDocuments[0].fileName
		let c = b.replace(a + "/", "")
		terminal.sendText('runhaskell ' + c);
		terminal.show();
	});

	context.subscriptions.push(run_ghci);
	context.subscriptions.push(run_haskell);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
