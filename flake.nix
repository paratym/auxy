{
  inputs = {
    nixpkgs.url = "nixpkgs/release-23.11";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };
  outputs = { nixpkgs, flake-utils, rust-overlay, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ (import rust-overlay) ];
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            (rust-bin.stable.latest.default.override {
              extensions = [ "rustfmt" ];
            })
            sqlx-cli
            cargo-watch
            systemfd
          ];
          buildInputs = with pkgs; [
            openssl
            pkg-config
            cairo
            gdk-pixbuf
            libsoup_3
            webkitgtk_4_1
          ];
        };
      });
}
