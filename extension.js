// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// Load config
const config = vscode.workspace.getConfiguration()
const show_ghci = config.get('has-go.loadGHCiButton');
const show_run = config.get('has-go.runFileButton');
const show_stack = config.get('has-go.stackRunButton');
const tool = config.get('has-go.haskellTool');

var curr_ter = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "has-go" is now active!');

	// vscode.window.onDidChangeActiveTerminal
	vscode.window.onDidChangeActiveTerminal(e => {
		curr_ter = e;
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let runGhci = vscode.commands.registerCommand('has-go.ghci', function () {
		let use_ghci = config.get('has-go.ghciInterpreter') == 'GHCi'
		let ov_arg = config.get('has-go.overrideGHCiArgs');
		let text = vscode.window.activeTextEditor.document
		let b = text.fileName.replace('' + vscode.workspace.workspaceFolders[0].uri.path + "/", "")
		let c = `\"${b}\"`

		if (curr_ter == undefined || curr_ter.name != 'GHCi' || !config.get('has-go.reuseTerminal')) {
			let terminal = vscode.window.createTerminal("GHCi");
			if (text.languageId == 'haskell' || text.languageId == 'literate haskell') {
				if (ov_arg.trim() == "") {
					if (use_ghci) {
						terminal.sendText('ghci');
					} else {
						terminal.sendText(tool.toLowerCase() + ' repl');
					}
				} else {
					if (use_ghci) {
						terminal.sendText('ghci ' + ov_arg.replace('${current}', c));
					} else {
						terminal.sendText(tool.toLowerCase() + ' repl ' + ov_arg.replace('${current}', c));
					}
				};
			} else {
				terminal.sendText('ghci');
			};
			terminal.show();
		} else if (config.get('has-go.reuseTerminal')) {
			curr_ter.sendText(':l ' + c);
		};
	});

	let runHaskell = vscode.commands.registerCommand('has-go.runfile', function () {
		let terminal = vscode.window.createTerminal("Run Haskell");
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let b = vscode.window.activeTextEditor.document.fileName
		let c = b.replace(a + "/", "")
		let d = `\"${c}\"`
		terminal.sendText('runhaskell ' + d);
		terminal.show();
	});

	let stackRun = vscode.commands.registerCommand('has-go.stackrun', function () {
		let terminal = vscode.window.createTerminal(tool + " Run");
		let stack_args = vscode.workspace.getConfiguration().get('has-go.stackArgs');
		terminal.sendText(tool.toLowerCase() + ' run ' + stack_args);
		terminal.show();
	});

	let compile = vscode.commands.registerCommand('has-go.compilefile', function () {
		let terminal = vscode.window.createTerminal('Compile');
		let args = vscode.workspace.getConfiguration().get('has-go.ghcArgs');
		let a = vscode.workspace.workspaceFolders[0].uri.path
		let b = vscode.window.activeTextEditor.document.fileName
		let c = b.replace(a + "/", "")
		let d = `\"${c}\"`
		terminal.sendText('ghc ' + d + ' ' + args);
		terminal.show();
	})

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
	context.subscriptions.push(compile);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}