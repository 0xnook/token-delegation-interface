import { get } from 'svelte/store';
import { defaultEvmStores, chainId } from 'svelte-ethers-store';

import { IDelegationRegistryABI } from './abis/abis';
import { contractAddresses } from './constants';
import { providerType } from './store';

// input: 0x50c57894c3b9bf022d10b94b9d940a48a93cd8c0
// output: 0x50...d8c0
export function toShortAddress(address: string, slice = 4): string {
	if (address) {
		return address.slice(0, slice) + '...' + address.slice(-slice);
	} else return '';
}

// custom svelte directive, usage <Component use:clickOutside={handleClick} />
export function clickOutside(node: HTMLElement, onEventFunction: () => void) {
	const handleClick = (event: Event) => {
		const path = event.composedPath();
		if (!path.includes(node)) {
			onEventFunction();
		}
	};
	document.addEventListener('click', handleClick);
	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}

export async function handleConnect(type: string) {
	if (type === 'metamask') {
		await handleMetamaskConnect();
	}
	attachContracts();
}

export async function handleMetamaskConnect() {
	await defaultEvmStores.setProvider();
	console.log(get(defaultEvmStores.provider));
	providerType.set('metamask');
	localStorage.setItem('providertype', 'metamask');
}

export async function attachContracts() {
	await defaultEvmStores.attachContract(
		'delegationRegistry',
		contractAddresses[get(chainId)].delegationRegistry,
		IDelegationRegistryABI
	);
}

// export async function handleWalletConnectProvider() {
// 	//  Enable session (triggers QR Code modal)
// 	const wcProvider = new WalletConnectProvider({
// 		rpc: {
// 			4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
// 			42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
// 			// ...
// 		},
// 	});
// 	//  Enable session (triggers QR Code modal)
// 	await wcProvider.enable();

// 	//  Wrap with Web3Provider from ethers.js
// 	const web3Provider = new providers.Web3Provider(wcProvider);
// 	await defaultEvmStores.setProvider(web3Provider.provider as Provider);
// }
