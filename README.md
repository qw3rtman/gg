Git Goodies
===========

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

All this installation script does is download the `gg` script, make it an executable, and copy it to your $PATH (/usr/local/bin). For copying to your $PATH, it may require you to enter your password. If there is a better way to do this, please send in a pull request.

If you don't feel comfortable executing a random script, [its source is available here](https://github.com/qw3rtman/gg/blob/master/install.sh).

**If you use [`oh-my-zsh`](https://github.com/robbyrussell/oh-my-zsh), `gg` is already aliased to `git gui citool`. If you don't use this alias, you can unalias it in your `.zshrc` file by adding `unalias gg` at the end of `.zshrc`.**

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

![`gg i`](http://nimitkalra.com/images/gg/init.png)

* `gg i`
* `gg init`

### Adding a template to .gitignore

![`gg ig`](http://nimitkalra.com/images/gg/ignore_template.png)

* `gg ig <template>`
* `gg ignore <template>`

*Templates provided by [.gitignore.io](https://www.gitignore.io/)*

### Adding a file to .gitignore

![`gg igf`](http://nimitkalra.com/images/gg/ignore_file.png)

* `gg igf <file ...>`
* `gg ignorefile <file ...>`

### Cloning a repository

![`gg cl`](http://nimitkalra.com/images/gg/clone.png)

* `gg cl <url>`
* `gg clone <url>`

*The URL can be provided in any format (SSH, HTTP, etc.)*

### Adding all files

![`gg a`](http://nimitkalra.com/images/gg/add.png)

* `gg a`
* `gg add`

### Adding specific files

![`gg a`](http://nimitkalra.com/images/gg/add_file.png)

* `gg a <file ...>`
* `gg add <file ...>`

### Adding all and committing

![`gg c`](http://nimitkalra.com/images/gg/commit.png)

* `gg c <message>`
* `gg commmit <message>`

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Committing

![`gg cn`](http://nimitkalra.com/images/gg/commit_no_add.png)

* `gg cn <message>`

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Uncommiting (resetting: `git reset HEAD~count`)

![`gg back`](http://nimitkalra.com/images/gg/uncommit.png)

* `gg uc <count>`
* `gg uncommit <count>`
* `gg back <count>`

*If no <count> is provided, 1 will be used.*

### Adding all and recommitting (amending: `git commit --amend`)

![`gg am`](http://nimitkalra.com/images/gg/amend.png)

* `gg rc <message>`
* `gg recommit <message>`
* `gg am <message>`
* `gg amend <message>`

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Recommitting (amending: `git commit --amend`)

![`gg am`](http://nimitkalra.com/images/gg/amend_no_add.png)

* `gg rcn <message>`
* `gg amn <message>`

*If no <message> is provided, a generic one listing all files modified/added will be generated.*

### Pushing

![`gg p`](http://nimitkalra.com/images/gg/push.png)

* `gg p`
* `gg push`

### Pulling

![`gg pl`](http://nimitkalra.com/images/gg/pull.png)

* `gg pl`
* `gg pull`

### Fetching

![`gg f`](http://nimitkalra.com/images/gg/fetch.png)

* `gg f`
* `gg fetch`

### Getting repository status

![`gg s`](http://nimitkalra.com/images/gg/status.png)

* `gg s`
* `gg status`

### Displaying commit log

![`gg l`](http://nimitkalra.com/images/gg/log.png)

* `gg l`
* `gg log`

### Listing all branches

![`gg b`](http://nimitkalra.com/images/gg/branch.png)

* `gg b`
* `gg ch`

### Checking out existing branch

![`gg ch`](http://nimitkalra.com/images/gg/checkout.png)

* `gg ch <branch>`

### Creating and checking out new branch

![`gg b`](http://nimitkalra.com/images/gg/branch_checkout.png)

* `gg b <branch>`

### Displaying commit info

![`gg in`](http://nimitkalra.com/images/gg/info.png)

* `gg in <hash>`
* `gg info <hash>`
* `gg view <hash>`

*If no <hash> is provided, HEAD (last commit) will be used.*

### Displaying **Git Goodies** version

![`gg -V`](http://nimitkalra.com/images/gg/version.png)

* `gg -V`
* `gg --version`

### Displaying **Git Goodies** help

![`gg -h`](http://nimitkalra.com/images/gg/help.png)

* `gg`
* `gg -h`
* `gg --help`
* `gg help`

## Contributing

Contributions are always welcome, from a typo in the README to an enhancement of a feature to a completely new feature itself.

Avoid [code smells](http://blog.codinghorror.com/code-smells/), [create reusable code](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and follow the loosely-modeled coding standard found in the current code.

Fork the code, make a new branch, and send in a pull request.
