{ pkgs, ... }:
{
  # Used to find the project root
  projectRootFile = "flake.nix";
  settings = {
    on-unmatched = "debug";
  };

  programs = {
    jsonfmt.enable = true;
    just.enable = true;
    mdformat.enable = true;
    nixfmt.enable = pkgs.lib.meta.availableOn pkgs.stdenv.buildPlatform pkgs.nixfmt-rfc-style.compiler;
    nixfmt.package = pkgs.nixfmt-rfc-style;
    taplo.enable = true;
    yamlfmt.enable = true;
  };
}
