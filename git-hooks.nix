{
  hooks = {
    action-validator.enable = true;
    actionlint.enable = true;
    check-merge-conflicts.enable = true;
    commitizen.enable = true;
    deadnix.enable = true;
    end-of-file-fixer.enable = true;
    markdownlint.enable = true;
    nixfmt-rfc-style.enable = true;
    # TODO: figure out prettier cause it's having weird interactions with the
    # other formatters
    # prettier.enable = true;
    trim-trailing-whitespace.enable = true;
    vale.enable = true;
  };
}
