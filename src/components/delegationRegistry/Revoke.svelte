<script lang="ts">
import { contracts, connected, signerAddress } from 'svelte-ethers-store';
import RevokeListItem from './RevokeListItem.svelte';

import type { RevokeKind } from '../../app.d.ts';

let delegateWalletPromise: Promise<string[]>;
let delegateTokenPromise: Promise<string[][]>;
let delegateContractPromise: Promise<string[][]>;

export let revokeKind: RevokeKind;

$: if ($connected && $contracts.delegationRegistry) {
	// fetch initial data
	if (revokeKind === 'wallet') {
		delegateWalletPromise = $contracts.delegationRegistry.getDelegatesForAll($signerAddress);
	} else if (revokeKind === 'contract') {
		console.log('getting contract delegates');
		delegateContractPromise =
			$contracts.delegationRegistry.getContractLevelDelegations($signerAddress);
	} else if (revokeKind === 'token') {
		delegateTokenPromise = $contracts.delegationRegistry.getTokenLevelDelegations($signerAddress);
	}

	// fire up event listeners for ui update
	$contracts.delegationRegistry.on('DelegateForAll', () => {
		delegateWalletPromise = $contracts.delegationRegistry.getDelegatesForAll($signerAddress);
	});
}

// easier to iterate format for delegateContractPromise and delegateTokenPromise
function normalizeData(delegates) {
	let result = [];
	for (let i = 0; i < delegates[0].length; i++) {
		if (delegates.length === 2) {
			result.push({
				delegate: delegates.delegates[i],
				contract: delegates.contracts[i]
			});
		} else if (delegates.length === 3) {
			result.push({
				delegate: delegates.delegates[i],
				contract: delegates.contracts[i],
				tokenId: delegates.tokenIds[i]
			});
		}
	}
	return result;
}
</script>

<div class="revoke-item">
	{#if revokeKind === 'wallet'}
		{#await delegateWalletPromise}
			<span>waiting...</span>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No wallet delegates' : ''}
				<div class="container">
					{#each delegates as delegate}
						<RevokeListItem delegateAddress={delegate} />
					{/each}
				</div>
			{/if}
		{:catch err}
			Error fetching delegates {err.code}
		{/await}
	{:else if revokeKind === 'contract'}
		{#await delegateContractPromise}
			<span>waiting...</span>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No contract delegates' : ''}
				<div class="container">
					{#each normalizeData(delegates) as delegate}
						<RevokeListItem
							delegateAddress={delegate.delegate}
							contractAddress={delegate.contract}
						/>
					{/each}
				</div>
			{/if}
		{:catch err}
			Error fetching delegates {err.code}
		{/await}
	{:else if revokeKind === 'token'}
		{#await delegateTokenPromise}
			<span>waiting...</span>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No token delegates' : ''}
				<div class="container">
					{#each normalizeData(delegates) as delegate}
						<RevokeListItem
							delegateAddress={delegate.delegate}
							contractAddress={delegate.contract}
							tokenId={delegate.tokenId}
						/>
					{/each}
				</div>
			{/if}
		{:catch err}
			Error fetching delegates {err.code}
		{/await}
	{/if}
</div>

<style>
.container {
	display: flex;
	width: 30rem;
	margin: 1rem auto;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: flex-start;
}
</style>
