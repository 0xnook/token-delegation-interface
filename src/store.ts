import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import { chainId } from 'svelte-ethers-store';

import { contractAddresses } from './constants';

export const accountModalHidden = writable(true);
export const providerType = writable(browser ? localStorage.getItem('providertype') : '');
export const connectedToSupportedChain = derived(
	chainId,
	($chainId) => $chainId in contractAddresses
);
