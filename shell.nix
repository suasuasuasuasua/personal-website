{ self, pkgs, ... }:
let
  inherit (pkgs.stdenv.hostPlatform) system;
in
pkgs.mkShellNoCC {
  inherit (self.checks.${system}.git-hooks-check) shellHook;
  buildInputs = self.checks.${system}.git-hooks-check.enabledPackages;

  packages = with pkgs; [
    commitizen
    (dart-sass.overrideAttrs (_: {
      src = fetchFromGitHub {
        owner = "sass";
        repo = "dart-sass";
        tag = "1.97.1";
        hash = "sha256-3Pf4+RSzVH0nRo+rSCJwzEdpZqjzSsvpr1S8qsFuRZ4=";
      };
    }))
    git
    go_1_25
    hugo
    just
    nodejs_24
    vale
  ];
}
