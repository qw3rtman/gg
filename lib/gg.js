var git = require('nodegit');
var exec = require('child_process').exec;
var chalk = require('chalk');

// Output styling.
var success = chalk.green;
var notice = chalk.yellow;
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
			console.log(success('[✔] Initialized existing Git repository.'));
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
			console.log(whoops('[✖] Could not push commits.'));
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
