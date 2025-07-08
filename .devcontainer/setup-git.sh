#!/bin/bash

# Configure git settings for the development container
git config --global core.autocrlf input
git config --global trailer.Co-Authored-By.where after
git config --global trailer.Co-Authored-By.ifExists addIfDifferent
git config --global user.email leoncoto@gmail.com
git config --global user.name 'Leon Coto'
git config --global pull.rebase true
git config --global init.defaultBranch main
git config --global rerere.enabled true
git config --global push.autoSetupRemote true