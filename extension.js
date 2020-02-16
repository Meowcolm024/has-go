// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// Load config
const show_ghci = vscode.workspace.getConfiguration().get('has-go.loadGHCiButton');
const show_run = vscode.workspace.getConfiguration().get('has-go.runFileButton');
const show_stack = vscode.workspace.getConfiguration().get('has-go.stackRunButton');
const tool = vscode.workspace.getConfiguration().get('has-go.haskellTool');

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
	let runGhci = vscode.commands.registerCommand('has-go.ghci', function () {
		let terminal = vscode.window.createTerminal("GHCi");
		let ov_arg = vscode.workspace.getConfiguration().get('has-go.overrideGHCiArgs');
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let text = vscode.window.activeTextEditor.document
		let b = text.fileName.replace(a + "/", "")
		if (text.languageId == 'haskell') {
			if (ov_arg.trim() == "") {
				terminal.sendText('ghci ' + b);
			} else {
				terminal.sendText('ghci ' + ov_arg.replace('${current}', b));
			};
		} else {
			terminal.sendText('ghci');
		};
		terminal.show();
	});

	let runHaskell = vscode.commands.registerCommand('has-go.runfile', function () {
		let terminal = vscode.window.createTerminal("Run Haskell");
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let b = vscode.window.activeTextEditor.document.fileName
		let c = b.replace(a + "/", "")
		terminal.sendText('runhaskell ' + c);
		terminal.show();
	});

	let stackRun = vscode.commands.registerCommand('has-go.stackrun', function () {
		let terminal = vscode.window.createTerminal(tool + " Run");
		let stack_args = vscode.workspace.getConfiguration().get('has-go.stackArgs');
		terminal.sendText(tool.toLowerCase() + ' run ' + stack_args);
		terminal.show();
	});

	if (show_ghci) {
		let stat = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		stat.text = "Load GHCi"
		stat.command = 'has-go.ghci'
		stat.show()
		context.subscriptions.push(stat);
	}

	if (show_run) {
		let stat = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		stat.text = "Run File"
		stat.command = 'has-go.runfile'
		stat.show()
		context.subscriptions.push(stat);
	}

	if (show_stack) {
		let stat = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		stat.text = tool + " Run"
		stat.command = 'has-go.stackrun'
		stat.show()
		context.subscriptions.push(stat);
	}

	context.subscriptions.push(runGhci);
	context.subscriptions.push(runHaskell);
	context.subscriptions.push(stackRun);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}