<script lang="ts">
import { onMount } from 'svelte';
import { connected, chainId } from 'svelte-ethers-store';

import { handleConnect, attachContracts } from '../utils';
import { providerType, connectedToSupportedChain } from '../store';

import ContractLoader from '../components/delegationRegistry/ContractLoader.svelte';

// reattach contracts on chainId change
$: $connectedToSupportedChain && attachContracts();

onMount(async () => {
	if (!$connected) {
		if ($providerType === 'metamask') {
			handleConnect('metamask');
		} else if ($providerType === 'walletconnect') {
			/* handleWalletConnectProvider(); */
		}
	}
});
</script>

<ContractLoader />
