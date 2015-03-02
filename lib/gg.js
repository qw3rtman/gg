var git = require('nodegit');
var exec = require('child_process').exec;
var chalk = require('chalk');

// Output styling.
var success = chalk.bold.green;
var error = chalk.bold.red;

exports.getCurrentRepo = function() {
	return git.Repository.open("./");
};

exports.addAll = function() {
	exec('git add -A');

	console.log(success('[✓] Added everything!'));
};

exports.commit = function(message) {
	// No commit message.
	if (message === '') {
		console.log(error('[!] You must enter a commit message.'));
	} else {
		this.addAll();
		exec('git commit -m "' + message + '"');

		console.log(success('[✓] Commited!\nMessage: "' + message + '"'));
	}
};

exports.push = function() {
	exec('git push');

	console.log(success('[✓] Pushed!'));
}
