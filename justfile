# Like GNU `make`, but `just` rustier.
# https://just.systems/
# run `just` from this directory to see available commands

# Default command when 'just' is run without arguments
default:
    @just --list

# Fast forward main branch
[group('git')]
fast-forward branch="staging":
    git merge --ff {{ branch }}

# ssh with port forward
ssh host port="1313":
    ssh -L {{ port }}:localhost:{{ port }} {{ host }}
