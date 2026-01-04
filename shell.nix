{ self, pkgs, ... }:
pkgs.mkShellNoCC {
  inherit (self.checks.${pkgs.system}.pre-commit-check) shellHook;
  buildInputs = self.checks.${pkgs.system}.pre-commit-check.enabledPackages;

  packages = with pkgs; [
    git
    hugo
    just
  ];
}
