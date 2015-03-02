var git = require('nodegit');
var exec = require('child_process').exec;

exports.getCurrentRepo = function() {
	return git.Repository.open("./");
};

exports.commit = function(message) {
	// No commit message.
	if (message === '') {
		console.log('[!] You must enter a commit message.');
	} else {
		this.addAll();
		exec('git commit -m "' + message + '"');

		console.log('[✓] Commited!');
	}
};

exports.addAll = function() {
	exec('git add -A');

	console.log('[✓] Added everything!');
};
