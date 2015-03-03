var exec = require('child_process').exec;
var chalk = require('chalk');

// Output styling.
var success = chalk.green;
var notice = chalk.yellow;
var whoops = chalk.bold.red; // Can't name error as exec uses error in callback.
var underline = chalk.underline;

exports.init = function() {
	exec('git init', function(error, stdout, stderr) {
		if (stdout.substring(0, 13) == 'Reinitialized') {
			console.log(notice('[~] Reinitialized existing Git repository.'));
		} else {
			console.log(success('[✔] Initialized existing Git repository.'));
		}
	});
};

exports.clone = function(repository) {
	exec('git clone ' + repository, function(error, stdout, stderr) {
		if (stderr.substring(0, 7) == 'Cloning') {
			if (stderr.split('\n')[1].split(' ')[0] == 'fatal:') {
				console.log(whoops('[✖] Could not clone repository.'));
			} else {
				console.log(success('[✔] Cloned into ' + stderr.split('\n')[0].split(' ')[2]));
			}
		} else {
			if (stderr.substring(0, 23) == 'fatal: destination path') {
				console.log(notice('[~] Directory ' + stderr.split(' ')[3] + ' is not empty.'));
			} else {
				console.log(whoops('[✖] Could not clone repository.'));
			}
		}
	});
};

exports.addAll = function() {
	exec('git add -A');

	console.log(success('[✔] Added everything!'));
};

exports.commit = function(message) {
	// No commit message.
	if (message === '') {
		console.log(notice('[~] You must enter a commit message.'));
	} else {
		this.addAll();

		exec('git commit -m "' + message + '"', function(error, stdout, stderr) {
			if (stdout.substring(0, 1) == '[') {
				console.log(success('[✔] Commited!'));

				console.log();
				console.log('"' + underline(message) + '"');
			} else if (stdout.substring(0, 2) == 'On') {
				console.log(notice('[~] Everything already committed.'));
			} else {
				console.log(whoops('[✖] Could not commit changes.'));
			}
		});
	}
};

exports.push = function() {
	this.addAll();
	exec('git push', function(error, stdout, stderr) {
		if (stderr.substring(0, 10) == 'Everything') {
			console.log(notice('[~] All commits already pushed.'));
		} else if (stderr.substring(0, 2) == 'To') {
			console.log(success('[✔] Pushed!'));
		} else {
			// TODO: add handling for non-fast-forwards (when you need to pull first, merge, and then push).
			console.log(whoops('[✖] Could not push commits.') + chalk.red(' (may have to pull first, merge any conflicts, and then attempt to push again using the ') + chalk.red.underline('standard git command') + chalk.red('.)'));
		}
	});
};

exports.pull = function() {
	exec('git pull', function(error, stdout, stderr) {
		if (stdout.substring(0, 7) == 'Already') {
			console.log(notice('[~] Everything is already up-to-date.'));
		} else if (stdout.substring(0, 8) == 'Updating') {
			console.log(success('[✔] Pulled!'));
		} else {
			// TODO: add handling for merge conflicts.
			console.log(whoops('[✖] Could not pull commits.') + chalk.red(' (may have to pull using the ') + chalk.red.underline('standard git command') + chalk.red(' to handle merge conflicts.)'));
		}
	});
};

exports.fetch = function() {
	exec('git fetch', function(error, stdout, stderr) {
		if (stdout === '' && stderr === '') {
			console.log(success('[✔] Fetched!'));
		} else {
			console.log(whoops('[✖] Could not fetch commits.'));
		}
	});
};

exports.status = function() {
	exec('git status', function(error, stdout, stderr) {
		var status = stdout.split('\n');

		// Branch.
		console.log(chalk.dim('branch  ') + chalk.gray.dim(' | ') + success(status[0].split(' ')[2]));

		// Position in branch.
		var position;
		switch (status[1].split(' ')[3]) {
			case 'behind':
				position = 'position' + chalk.gray.dim(' | ') + notice(status[1].split(' ')[7] + ' commits behind (fetch or pull)');
				break;

			case 'up-to-date':
				position = chalk.dim('position') + chalk.gray.dim(' | ') + success('up-to-date');
				break;

			case 'ahead':
				position = 'position' + chalk.gray.dim(' | ') + notice(status[1].split(' ')[7] + ' commits ahead (push commits)');
				break;

			default:
				position = 'position' + chalk.gray.dim(' | ') + whoops('diverged');
		}
		console.log(position);

		console.log();

		// Staging and commits.
		var staging;
		if (status[3] == 'Changes not staged for commit:') {
			staging = 'staging ' + chalk.gray.dim(' | ') + notice('not all changes staged (add all changes)');
		} else {
			staging = chalk.dim('staging ') + chalk.gray.dim(' | ') + success('all changes staged');
		}

		console.log(staging);

		var commits;
		if (status[3] == 'Changes to be committed:') {
			commits = 'commits ' + chalk.gray.dim(' | ') + notice('not all changes committed (commit all changes)');
		} else {
			commits = chalk.dim('commits ') + chalk.gray.dim(' | ') + success('all changes committed');
		}

		console.log(commits);
	});
};

// https://gist.github.com/textarcana/1306223
exports.log = function() {
	exec('git log --pretty=format:\'{%n  "commit": "%H",%n  "author": "%an <%ae>",%n  "date": "%ad",%n  "message": "%f"%n},\' $@ | perl -pe \'BEGIN{print "["}; END{print "]\n"}\' | perl -pe \'s/},]/}]/\'', function(error, stdout, stderr) {
		var log = JSON.parse(stdout);
		log.reverse(); // Show newest at the bottom.

		for (var i = 0; i < log.length; i++) {
			console.log(); // New line between each commit.

			console.log(chalk.yellow('[' + log[i].commit + ']'));

			var author = {
				name: log[i].author.split('<')[0].trim(),
				email: '<' + log[i].author.split('<')[1]
			};

			console.log('|- ' + chalk.gray(author.name) + " " + chalk.gray.dim(author.email));
			console.log('|- ' + chalk.gray.dim(log[i].date));
			console.log('|- ' + chalk.green(log[i].message.split('-').join(' ')));
		}
	});
};
