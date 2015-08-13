`gg`: Git Goodies
=================

### [Looking for the old, unmaintained, and buggy Node.js version?](https://github.com/qw3rtman/gg.js)

![Introduction](http://nimitkalra.com/images/gg/gg.gif)

`gg` helps you *work with `git` more efficiently*, saving you keystrokes for your most prized projects.

Think of `gg` as a wrapper for the `git` commands that you run all the time; a wrapper that adds functionality and is aesthetically pleasing.

### Hold up. Aren't these basically Git aliases?
There's more to the package than just shortcuts or aliases.

For example, the `gg s` command presents you with an easy to look at a quick glance status of your repository. In addition, there are aesthetic changes that increase the intuitiveness of Git itself.

Here's a screenshot of the `gg s` command in action:

![`gg s`](http://nimitkalra.com/images/gg/s.png)

You can see the current local branch and its respective remote branch, the latest commit hash and message, the local repository's position in relation with the respective remote repository (alerting you that you should push two commits to reach up-to-date status with the remote repository), the status of staging and commits, and the commits that waiting to be pushed.

**All of this from one four character command.**

## Installation
```sh
curl -fsSL git.io/gg.sh | sh
```

All this installation script does is download the `gg` script, make it an executable, and copy it to your $PATH (/usr/local/bin).

If you don't feel comfortable executing a random script, [its source is available here](https://github.com/qw3rtman/gg/blob/master/install.sh).

`gg` relies solely on `git` and attempts to use built-in Shell features over external programs, such as using Bash substitution instead of `sed`.

## Usage

```

  usage:
    gg [options] [COMMAND] [args]

  commands:
    gg                              Display this help information
    gg i                            Initialize new Git repository
    gg ig                           List available .gitignore templates
    gg ig <template>                Add .gitignore file from <template>
    gg igf <file ...>               Add all <file>(s) to .gitignore
    gg cl <url>                     Clone repository from <url>
    gg a                            Add all files
    gg a <file ...>                 Add all <file>(s)
    gg c <message>                  Add all files and commit with <message>
    gg cn <message>                 Commit with <message>
    gg uc <count>                   Go back (uncommit) <count> commits
    gg rc <message>                 Add all files and recommit (amend) with <message>
    gg rcn <message>                Recommit (amend) with <message>
    gg p                            Push all commits to remote
    gg pl                           Pull all commits from remote
    gg f                            Fetch all commits from remote
    gg s                            Display repository status
    gg l                            Display repository commit log
    gg b                            List all branches in repository
    gg b <branch>                   Create and checkout <branch>
    gg ch                           List all branches in repository
    gg ch <branch>                  Checkout <branch>
    gg in <hash>                    Display info about <hash>

  options:
    -V, --version                   Output current version of Git Goodies
    -h, --help                      Display this help information

```

### Initializing repositories

* gg i
* gg init

### Adding a template to .gitignore

* gg ig <template>
* gg ignore <template>

*Templates provided by [.gitignore.io](https://www.gitignore.io/)*

### Adding a file to .gitignore

* gg igf <file ...>
* gg ignorefile <file ...>

### Cloning a repository

* gg cl <url>
* gg clone <url>

*The URL can be provided in any format (SSH, HTTP, etc.)*

### Adding all files

* gg a
* gg add

### Adding specific files

* gg a <file ...>
* gg add <file ...>

### Adding all and committing

* gg c <message>
* gg commmit <message>

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Committing

* gg cn <message>

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Uncommiting (resetting: `git reset HEAD~count`)

* gg uc <count>
* gg uncommit <count>
* gg back <count>

*If no <count> is provided, 1 will be used.*

### Adding all and recommitting (amending: `git commit --amend`)

* gg rc <message>
* gg recommit <message>
* gg am <message>
* gg amend <message>

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Recommitting (amending: `git commit --amend`)

* gg rcn <message>
* gg amn <message>

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Pushing

* gg p
* gg push

### Pulling

* gg pl
* gg pull

### Fetching

* gg f
* gg fetch

### Getting repository status

* gg s
* gg status

### Displaying commit log

* gg l
* gg log

### Listing all branches

* gg b
* gg ch

### Checking out existing branch

* gg ch <branch>

### Creating and checking out new branch

* gg b <branch>

### Displaying commit info

* gg in <hash>
* gg info <hash>
* gg view <hash>

*If no <hash> is provided, HEAD (last commit) will be used.*

### Displaying **Git Goodies** version

* gg -V
* gg --version

### Displaying **Git Goodies** help

* gg
* gg -h
* gg --help
* gg help
