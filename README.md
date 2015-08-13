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
