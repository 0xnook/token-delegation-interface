# token-delegation-interface

An interface for [token-delegation](https://github.com/0xfoobar/token-delegation), built with [svelte-kit](https://svelte.dev/).

# Getting started

A nix dev environment with all the needed dependencies for running the frontend and compiling the contracts is included for convenience

0. Clone the project with submodules `git clone --recurse-submodules git@github.com:0xnook/token-delegation-interface.git`
1. Install [nix](https://nix.dev/tutorials/install-nix)
2. Enable [flake support](https://nixos.wiki/wiki/Flakes#Enable_flakes)
3. Run `nix develop`, this will install all npm deps and compile the contracts
4. (optional) install [direnv](https://direnv.net/) and run `echo "use flake > .envrc` to automatically load all deps when entering the folder
5. On a new terminal enter `anvil --chain-id 1337` to run an ethereum local node, copy one of the private keys and import to metamask to be able to sign transactions
6. On a separate terminal enter `./deploy-contracts.sh` to deploy the contracts to a local fork
7. Run `npm run dev` to start a frontend dev server
