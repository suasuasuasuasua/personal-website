{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = with pkgs; [
    # source control
    git
    pre-commit

    # formatting
    treefmt
    nodePackages.prettier # general
    markdownlint-cli # markdown
    nixfmt-rfc-style # nix

    # lsps
    nixd
    marksman
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  git-hooks.hooks = {
    commitizen.enable = true;

    check-merge-conflicts.enable = true;
    end-of-file-fixer.enable = true;
    trim-trailing-whitespace.enable = true;

    treefmt.enable = true;
  };

  devcontainer.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
