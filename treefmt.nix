{ pkgs, ... }:
{
  # Used to find the project root
  projectRootFile = "flake.nix";
  settings = {
    on-unmatched = "debug";
  };

  programs = {
    just.enable = true;
    mdformat = {
      enable = true;
      # https://mdformat.readthedocs.io/en/stable/users/plugins.html
      plugins = ps: [
        ps.mdformat-footnote
        ps.mdformat-frontmatter
        ps.mdformat-gfm
        ps.mdformat-gfm-alerts
        ps.mdformat-simple-breaks
      ];
    };
    nixfmt.enable = pkgs.lib.meta.availableOn pkgs.stdenv.buildPlatform pkgs.nixfmt-rfc-style.compiler;
    nixfmt.package = pkgs.nixfmt-rfc-style;
    prettier = {
      enable = true;
      settings.plugins = [
        "${pkgs.prettier-plugin-go-template}/lib/node_modules/prettier-plugin-go-template/lib/index.js"
      ];
    };
    taplo.enable = true;
  };
}
