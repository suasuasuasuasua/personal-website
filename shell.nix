{ self, pkgs, ... }:
let
  inherit (pkgs.stdenv.hostPlatform) system;
in
pkgs.mkShellNoCC {
  inherit (self.checks.${system}.git-hooks-check) shellHook;
  buildInputs = self.checks.${system}.git-hooks-check.enabledPackages;

  packages = with pkgs; [
    commitizen
    dart-sass
    git
    go_1_25
    hugo
    just
    netcat
    nodejs_24
    openssh
    rsync
    vale
  ];
}
