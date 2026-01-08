{ self, pkgs, ... }:
let
  inherit (pkgs.stdenv.hostPlatform) system;
in
pkgs.mkShellNoCC {
  inherit (self.checks.${system}.git-hooks-check) shellHook;
  buildInputs = self.checks.${system}.git-hooks-check.enabledPackages;

  packages = with pkgs; [
    commitizen
    git
    go_1_25
    hugo
    just
    vale
  ];
}
