# Like GNU `make`, but `just` rustier.
# https://just.systems/
# run `just` from this directory to see available commands

# Default command when 'just' is run without arguments
default:
    @just --list

# Update flake.nix inputs
[group('git')]
fast-forward +branch="staging":
    git merge --ff {{ branch }}
