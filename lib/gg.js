var exec = require('child_process').exec;
var Chalk = require('chalk');

// Force CLI coloring.
var chalk = new Chalk.constructor({enabled: true});

// Output styling.
var success = chalk.green;
var notice = chalk.yellow;
var whoops = chalk.bold.red; // Can't name error as exec uses error in callback.
var underline = chalk.underline;

exports.init = function() {
	exec('git init', function(error, stdout, stderr) {
		if (stdout.substring(0, 13) === 'Reinitialized') {
			console.log(notice('[~] Reinitialized existing Git repository.'));
		} else {
			console.log(success('[✔] Initialized new Git repository.'));
		}
	});
};

exports.cloneURL = function(repository) {
	// Nothing to clone.
	if (!repository) {
		console.log(notice('[~] You must enter a repository URL.'));
	} else {
		exec('git clone ' + repository, function(error, stdout, stderr) {
			if (stderr.substring(0, 7) === 'Cloning') {
				if (stderr.split('\n')[1].split(' ')[0] === 'fatal:') {
					console.log(whoops('[✖] Could not clone repository.'));
				} else {
					console.log(success('[✔] Cloned into ' + stderr.split('\n')[0].split(' ')[2]));
				}
			} else {
				if (stderr.substring(0, 23) === 'fatal: destination path') {
					console.log(notice('[~] Directory ' + stderr.split(' ')[3] + ' is not empty.'));
				} else {
					console.log(whoops('[✖] Could not clone repository.'));
				}
			}
		});
	}
};

exports.cloneGitHub = function(repository) {
	exports.cloneURL('https://github.com/' + repository + '.git');
};

exports.addAll = function() {
	exec('git add -A');

	console.log(success('[✔] Added everything!'));
};

exports.addSingle = function(target) {
	// TODO: Fix the Error handling! Currently just ignores warnings
	exec('git add ' + target, function(error, stdout, stderr) {
		if (typeof target === 'undefined') {// Then just add all.
			exports.addAll();
		} else {
			if (stderr.substring(0, 7) !== 'warning') {
				console.log(whoops('[✖] Could not add target specified. Are you sure the target exists?'));
			} else {
				console.log(success('[✔] Added ' + target + '!'));
			}
		}
	});
};

exports.addOptions = function(options, target) {
	// TODO: Fix the Error Handling! Currently just ignores warnings
	exec('git add -' + options + ' ' + target, function(error, stdout, stderr) {
		if (typeof target === 'undefined') {// Then just add all.
			exports.addAll();
		} else {
			if (stderr.substring(0, 7) !== 'warning') {
				console.log(whoops('[✖] Could not add target specified. Are you sure the target exists?'));
			} else {
				console.log(success('[✔] Added ' + target + '!'));
			}
		}
	});
};

exports.commit = function(message) {
	// No commit message.
	if (message === '' || typeof message === 'undefined') {
		console.log(notice('[~] You must enter a commit message.'));
	} else {
		exports.addAll();

		exec('git commit -m "' + message + '"', function(error, stdout, stderr) {
			if (stdout.substring(0, 1) === '[') {
				console.log(success('[✔] Committed!'));

				console.log();
				console.log('"' + underline(message) + '"');
			} else if (stdout.substring(0, 2) === 'On') {
				console.log(notice('[~] Everything already committed.'));
			} else {
				console.log(whoops('[✖] Could not commit changes.') + chalk.red(' Try again if there was a large amount of changes to add.'));
			}
		});
	}
};

exports.push = function() {
	exec('git push', function(error, stdout, stderr) {
		if (stderr.substring(0, 10) === 'Everything') {
			console.log(notice('[~] All commits already pushed.'));
		} else if (stderr.substring(0, 2) === 'To') {
			console.log(success('[✔] Pushed!'));
		} else {
			// TODO: add handling for non-fast-forwards (when you need to pull first, merge, and then push).
			console.log(whoops('[✖] Could not push commits.') + chalk.red(' (may have to pull first, merge any conflicts, and then attempt to push again using the ') + chalk.red.underline('standard git command') + chalk.red('.)'));
		}
	});
};

exports.pull = function() {
	exec('git pull', function(error, stdout, stderr) {
		if (stdout.substring(0, 7) === 'Already') {
			console.log(notice('[~] Everything is already up-to-date.'));
		} else if (stdout.substring(0, 8) === 'Updating') {
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

exports.fetchAll = function() {
	exec('git fetch --all', function(error, stdout, stderr) {
		if (stderr === '') {
			console.log(success('[✔] Fetched all!'));
		} else {
			console.log(whoops('[✖] Could not fetch commits.'));
		}
	});
};

exports.status = function() {
	exec('git status', function(error, stdout, stderr) {
		var status = stdout.split('\n');

		// Branch.
		var branch;
		if (status[0].split(' ')[0] === 'HEAD') { // If HEAD is at a commit.
			branch = chalk.dim('branch  ') + chalk.gray.dim(' | ') + success(status[0].split(' ')[3]);
		} else {
			branch = chalk.dim('branch  ') + chalk.gray.dim(' | ') + success(status[0].split(' ')[2]);
		}

		console.log(branch);


		// Position in branch.
		var position;
		switch (status[1].split(' ')[3]) {
			case 'behind':
				position = 'position' + chalk.gray.dim(' | ') + notice(status[1].split(' ')[7] + ' commits behind (fetch or pull)');
				break;

			case 'for': // Quick hack to get it working when changes are not staged.
			case 'working': // Quick hack to get it working with freshly initialized git repositories.
			case 'up-to-date':
				position = chalk.dim('position') + chalk.gray.dim(' | ') + success('up-to-date');
				break;

			case 'ahead':
				position = 'position' + chalk.gray.dim(' | ') + notice(status[1].split(' ')[7] + ' commits ahead (push commits)');
				break;

			default:
				// TODO: add proper handling for freshly initialized git repositories.
				if (typeof status[1].split(' ')[3] === 'undefined') { // Quick hack to get it working with freshly initialized git repositories.
					position = chalk.dim('position') + chalk.gray.dim(' | ') + success('up-to-date');
				} else if (status[1] === 'Changes to be committed:') {
					position = chalk.dim('position') + chalk.gray.dim(' | ') + success('up-to-date');
				} else {
					position = 'position' + chalk.gray.dim(' | ') + whoops('diverged');
				}
		}
		console.log(position);

		console.log();


		// Staging.
		var staging;
		if (status[2] === 'Initial commit') { // Fresh repository.
			switch (status[4]) {
				case 'Untracked files:':
					staging = 'staging ' + chalk.gray.dim(' | ') + notice('not all changes staged (add all changes)');
					break;

					case 'Changes to be committed:':
					case 'nothing to commit (create/copy files and use "git add" to track)':
						staging = chalk.dim('staging ') + chalk.gray.dim(' | ') + success('all changes staged');
						break;
			}
		} else {
			switch (status[1]) {
				case 'Changes not staged for commit:':
				case 'Untracked files:':
					staging = 'staging ' + chalk.gray.dim(' | ') + notice('not all changes staged (add all changes)');
					break;

				case 'Changes to be committed:':
				case 'nothing to commit, working directory clean':
					staging = chalk.dim('staging ') + chalk.gray.dim(' | ') + success('all changes staged');
					break;
			}
		}

		console.log(staging);

		// Commits.
		var commits;
		if (status[2] === 'Initial commit') {
			switch (status[4]) {
				case 'Changes to be committed:':
					commits = 'commits ' + chalk.gray.dim(' | ') + notice('not all changes committed (commit all changes)');
					break;

				case 'nothing to commit (create/copy files and use "git add" to track)':
					commits = chalk.dim('commits ') + chalk.gray.dim(' | ') + success('all changes committed');
					break;
			}
		} else {
			switch (status[1]) {
				case 'Changes not staged for commit:':
				case 'nothing to commit, working directory clean':
					commits = chalk.dim('commits ') + chalk.gray.dim(' | ') + success('all changes committed');
					break;

				case 'Changes to be committed:':
					commits = 'commits ' + chalk.gray.dim(' | ') + notice('not all changes committed (commit all changes)');
					break;
			}
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

			console.log(notice('[' + log[i].commit + ']'));

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

exports.branch = function(name) {
	if (name === '' || typeof name === 'undefined') { // List branches.
		exec('git branch', function(error, stdout, stderr) {
			if (stdout === '') {
				console.log(notice('[~] No branches exist.'));
			}

			var branches = stdout.split('\n');
			for (var i = 0; i < branches.length - 1; i++) {
				if (branches[i].substring(0, 1) === '*') { // Current branch.
					console.log('|- ' + success.bold(branches[i].substring(2)));
				} else {
					console.log(chalk.dim('|- ' + branches[i].substring(2)));
				}
			}
		});
	} else { // Create branch and checkout.
		exec('git branch ' + name, function(error, stdout, stderr) {
			if (stderr.split(' ')[0] === 'fatal:') {
				if (stderr.substring(0, 21) === 'fatal: A branch named') { // Branch already exists.
					console.log(notice('[~] Branch \'' + name + '\' already exists.'));

					// Checkout branch.
					exports.checkout(name);
				} else if (stderr.slice(-24) === 'not a valid branch name.') { // Invalid branch name.
					console.log(notice('[~] \'' + name + '\' is an invalid branch name.'));
				} else if (stderr.substring(7, 30) === 'Not a valid object name') { // No branches exist.
					console.log(notice('[~] No branches exist.'));
				} else { // Generic error.
					console.log(whoops('[✖] Could not create new branch \'' + name + '\'.'));
				}
			} else {
				console.log(success('[✔] Created new branch \'' + name + '\'!'));

				// Switch to new branch.
				exports.checkout(name);
			}
		});
	}
};

exports.checkout = function(branch) {
	if (branch === '' || typeof branch === 'undefined') { // If no branch provided, list the branches.
		exports.branch();
	} else {
		exec('git checkout ' + branch, function(error, stdout, stderr) {
			switch (stderr.split(' ')[0]) {
				case 'Already':
					console.log(notice('[~] Already on branch \'' + branch + '\'.'));
					break;

				case 'Switched':
					console.log(success('[✔] Switched to branch \'' + branch + '\'!'));
					break;

				case 'error:': // Branch does not exist.
					console.log(notice('[~] Branch \'' + branch + '\' doesn\'t exist.'));

					exports.branch(branch);
					break;

				case 'fatal':
					console.log(notice('[~] No branches exist.'));
					break;
			}
		});
	}
};
