var git = require('nodegit');
var exec = require('child_process').exec;
var chalk = require('chalk');

// Output styling.
var success = chalk.bold.green;
var notice = chalk.bold.yellow;
var whoops = chalk.bold.red; // Can't name error as exec uses error in callback.
var underline = chalk.underline;

exports.getCurrentRepo = function() {
	return git.Repository.open("./");
};

exports.init = function() {
	exec('git init', function(error, stdout, stderr) {
		if (stdout.substring(0, 13) == 'Reinitialized') {
			console.log(notice('[~] Reinitialized existing Git repository.'));
		} else {
			console.log(success('[✓] Initialized existing Git repository.'));
		}
	});
};

exports.addAll = function() {
	exec('git add -A');

	console.log(success('[✓] Added everything!'));
};

exports.commit = function(message) {
	// No commit message.
	if (message === '') {
		console.log(notice('[~] You must enter a commit message.'));
	} else {
		this.addAll();
		exec('git commit -m "' + message + '"');

		console.log(success('[✓] Commited!'));
		console.log('\nMessage: "' + underline(message) + '"');
	}
};

exports.push = function() {
	exec('git push', function(error, stdout, stderr) {
		if (stderr.substring(0, 10) == 'Everything') {
			console.log(notice('[~] Everything already pushed.'));
		} else if (stderr.substring(0, 8) == 'Counting') {
			console.log(success('[✓] Pushed!'));
		} else {
			console.log(whoops('[!] Could not push commits.'));
		}
	});
};
