{ pkgs, ... }:
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
    prettier = {
      enable = true;
      settings = {
        configPath = ".prettierrc";
        plugins = [
          "${pkgs.prettier-plugin-go-template}/lib/node_modules/prettier-plugin-go-template/lib/index.js"
        ];
      };
    };
    trim-trailing-whitespace.enable = true;
    vale = {
      enable = true;
      # only trigger on errors
      settings.flags = "--minAlertLevel error";
    };
  };
}
