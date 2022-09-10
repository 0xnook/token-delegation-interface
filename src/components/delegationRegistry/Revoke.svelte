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
		delegateContractPromise =
			$contracts.delegationRegistry.getContractLevelDelegations($signerAddress);
	} else if (revokeKind === 'token') {
		delegateTokenPromise = $contracts.delegationRegistry.getTokenLevelDelegations($signerAddress);
	}

	// fire up event listeners for ui update
	$contracts.delegationRegistry.on('DelegateForAll', (vault: string) => {
		if (vault === $signerAddress) {
			delegateWalletPromise = $contracts.delegationRegistry.getDelegatesForAll($signerAddress);
		}
	});
	$contracts.delegationRegistry.on('DelegateForContract', (vault: string) => {
		if (vault === $signerAddress) {
			delegateContractPromise =
				$contracts.delegationRegistry.getContractLevelDelegations($signerAddress);
		}
	});
	$contracts.delegationRegistry.on('DelegateForToken', (vault: string) => {
		if (vault === $signerAddress) {
			delegateTokenPromise = $contracts.delegationRegistry.getTokenLevelDelegations($signerAddress);
		}
	});
}
</script>

<div class="revoke-item">
	! {#if revokeKind === 'wallet'}
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
					{#each delegates as delegate}
						<RevokeListItem
							delegateAddress={delegate.delegate}
							contractAddress={delegate.contract_}
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
					{#each delegates as delegate}
						<RevokeListItem
							delegateAddress={delegate.delegate}
							contractAddress={delegate.contract_}
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
