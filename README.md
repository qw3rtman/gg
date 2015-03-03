`gg`
==

the cookbook of git goodies

![status](screenshots/status.png)

`gg` helps you *work with `git` more efficiently*, saving you keystrokes for your most prized projects.

Think of `gg` as a wrapper for the `git` commands that you run all the time.

## Getting Started
Suppose we want to clone the [awesome spark shell script (created by Zach Holman)](https://github.com/holman/spark).
![status](screenshots/clone.png)
Alright, let's switch into that directory.
![status](screenshots/gettingstarted2.png)
After making a quick change, let's check the status of our clone.
![status](screenshots/gettingstarted3.png)
Looks like we haven't staged our changes.

In the standard git workflow, we would have to `git add -A` and then `git commit -m "Updated example in README."`.

With `gg`, we can simply `gg c Updated example in README.` and we're good to go.
![status](screenshots/gettingstarted4.png)
Let's check our clone's status again.
![status](screenshots/gettingstarted5.png)
Looking good!
