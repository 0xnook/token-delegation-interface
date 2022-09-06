{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = [ pkgs.cargo ];
    shellHook = ''
        # check if foundry is installed
        if [ ! -f ~/.cargo/bin/forge ] || [ ! -f ~/.cargo/bin/anvil ]
        then
            echo "Foundry not found, installing"
            cargo install --git https://github.com/foundry-rs/foundry --profile local --locked foundry-cli anvil
        fi

        # add cargo binaries to path
        export PATH=$PATH:~/.cargo/bin/

        # to deploy contracts:
        # forge create --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/DelegationRegistry.sol:DelegationRegistry
    '';
}

