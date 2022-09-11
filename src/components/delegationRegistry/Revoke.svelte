<script lang="ts">
import { contracts, connected, signerAddress } from 'svelte-ethers-store';

import InputFloatingLabel from '../InputFloatingLabel.svelte';

import RevokeItemPaginator from './RevokeItemPaginator.svelte';

import type { RevokeKind } from '../../app.d.ts';

let delegateWalletPromise: Promise<string[]>;
let delegateTokenPromise: Promise<string[][]>;
let delegateContractPromise: Promise<string[][]>;

export let revokeKind: RevokeKind;

let revokeVault: string;

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
	{#if revokeKind === 'wallet'}
		{#await delegateWalletPromise}
			<span>waiting...</span>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No wallet delegates' : ''}
				<RevokeItemPaginator {delegates}/>
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
				<RevokeItemPaginator {delegates}/>
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
				<RevokeItemPaginator {delegates}/>
			{/if}
		{:catch err}
			Error fetching delegates {err.code}
		{/await}
	{:else if revokeKind === 'other'}
		<div class="other-tab">
			<div class="revoke-self">
				<InputFloatingLabel
					bind:value={revokeVault}
					label="Vault address"
					inputType="text"
					placeholder="nook.eth"
				/>
				<button on:click={$contracts.delegationRegistry.revokeSelf(revokeVault)}>Revoke self</button>
			</div>

			<button on:click={$contracts.delegationRegistry.revokeAllDelegates()}>Revoke all delegates</button>
		</div>
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

.other-tab {
	display: flex;
	width: 30rem;
	height: 100%;
	margin: 1rem auto;
	flex-direction: column;
	justify-content: space-between;
	/* align-items: center; */
}
.revoke-self {
	height:17rem;
}

button {
	background: black;
	color: white;
	border: 2px solid grey;
	padding: 0.2rem 1rem 0.2rem 1rem;
	width: 30rem;
	height: 3rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	margin: auto;
}
</style>
