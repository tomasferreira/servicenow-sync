// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request');

const URL = 'https://dev65260.service-now.com/api/now/table/sys_script_include/29c2578adb20330016b4112039961996';

// TODO: read url from config file
// TODO: how / where to store sys_ids of the script
// TODO: how to store (encrypted) credentials

async function syncFile(){
  var script = vscode.window.activeTextEditor.document.getText();
  vscode.window.showErrorMessage('preparing request');
  request.put(URL, {
    auth: {
      user: 'test',
      pass: 'tesst'
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    json: true,
    body: {
      script: script
    }
  }, processResponse);
  
  function processResponse(error, response, responseBody){
    if(error){
      vscode.window.showErrorMessage('Something went wrong while sending file - HTTP response code: ' + response.statusCode);
    }
    console.log(error);
    console.log(response);
    console.log(responseBody);
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "servicenow-sync" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.syncFile', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
    syncFile();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
