`gg`
==

the cookbook of git goodies

![status](screenshots/status.png)
![log](screenshots/log.png)


`gg` helps you *work with `git` more efficiently*, saving you keystrokes for your most prized projects.

Think of `gg` as a wrapper for the `git` commands that you run all the time.

## Getting Started
After the [super painless installation](#installation), suppose we want to clone the [awesome spark shell script (created by Zach Holman)](https://github.com/holman/spark).
![status](screenshots/clone.png)
Alright, let's switch into that directory.
![gettingstarted2](screenshots/gettingstarted2.png)
After making a quick change, let's check the status of our clone.
![gettingstarted3](screenshots/gettingstarted3.png)
Looks like we haven't staged our changes.

In the standard git workflow, we would have to `git add -A` and then `git commit -m "Updated example in README."`.

With `gg`, we can simply `gg c Updated example in README.` and we're good to go.
![gettingstarted4](screenshots/gettingstarted4.png)
Let's check our clone's status again.
![gettingstarted5](screenshots/gettingstarted5.png)
Looking good!

## Installation
`gg` can be installed via the Node Package Manager (`npm`).

```sh
	$ npm install -g gg
```
You can also get up and running without npm, but it is not recommended to do so.

`gg` relies on Node.js and `git`.

## Usage
### Initializing repositories
![initialize](screenshots/initialize.png)
* `$ gg i`
* `$ gg init`
* `$ gg initialize`

### Cloning repositories
![clone](screenshots/clone.png)
* `$ gg cl`
* `$ gg clone`

### Adding changes
![add](screenshots/add.png)
* `$ gg a`
* `$ gg aa # add all`
* `$ gg add`

### Committing changes
![commit](screenshots/commit.png)
* `$ gg c`
* `$ gg commit`

### Pushing commits
![push](screenshots/push.png)
* `$ gg p`
* `$ gg push`

### Pulling commits
![pull](screenshots/pull.png)
* `$ gg pl`
* `$ gg pull`

### Fetching commits
![fetch](screenshots/fetch.png)
* `$ gg f`
* `$ gg fetch`

### Viewing status
![status](screenshots/status.png)
* `$ gg s`
* `$ gg status`

### Viewing log
![log](screenshots/log.png)
* `$ gg l`
* `$ gg log`

## Contributing
Contributions are always welcome.

We follow [Airbnb's coding standard](https://github.com/airbnb/javascript), so make sure you use that as a guideline.

Fork our code, make a new branch, and send a pull request.

TODO:
* support for branches
* handling for non-fast-forwards (when you need to pull first, merge, and then push)
* handling for merge conflicts
* handling for freshly initialized git repositories status
* support for specifying path of repository initialization and cloning
