<script lang="ts">
import { contracts, connected, signerAddress, chainId } from 'svelte-ethers-store';

import { connectedToSupportedChain } from '../../store';
import HammerLoader from '../HammerLoader.svelte';
import InputFloatingLabel from '../InputFloatingLabel.svelte';
import RevokeItemPaginator from './RevokeItemPaginator.svelte';

import type { RevokeKind } from '../../app.d.ts';

let delegateWalletPromise: Promise<string[]>;
let delegateTokenPromise: Promise<string[][]>;
let delegateContractPromise: Promise<string[][]>;

export let revokeKind: RevokeKind;

let revokeVault: string;

$: contractKey = 'delegationRegistry' + $chainId;

$: if ($connectedToSupportedChain && $contracts[contractKey]) {
	// fetch initial data
	if (revokeKind === 'wallet') {
		delegateWalletPromise = $contracts[contractKey].getDelegatesForAll($signerAddress);
	} else if (revokeKind === 'contract') {
		delegateContractPromise = $contracts[contractKey].getContractLevelDelegations($signerAddress);
	} else if (revokeKind === 'token') {
		delegateTokenPromise = $contracts[contractKey].getTokenLevelDelegations($signerAddress);
	}

	// fire up event listeners for ui update
	$contracts[contractKey].on('DelegateForAll', (vault: string) => {
		if (vault === $signerAddress) {
			delegateWalletPromise = $contracts[contractKey].getDelegatesForAll($signerAddress);
		}
	});
	$contracts[contractKey].on('DelegateForContract', (vault: string) => {
		if (vault === $signerAddress) {
			delegateContractPromise = $contracts[contractKey].getContractLevelDelegations($signerAddress);
		}
	});
	$contracts[contractKey].on('DelegateForToken', (vault: string) => {
		if (vault === $signerAddress) {
			delegateTokenPromise = $contracts[contractKey].getTokenLevelDelegations($signerAddress);
		}
	});
}
</script>

<div class="container">
	{#if revokeKind === 'wallet'}
		{#await delegateWalletPromise}
			<div class="loader"><HammerLoader /></div>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No wallet delegates' : ''}
				<RevokeItemPaginator {delegates} />
			{/if}
		{:catch err}
			Error fetching delegates {err.code}
		{/await}
	{:else if revokeKind === 'contract'}
		{#await delegateContractPromise}
			<div class="loader"><HammerLoader /></div>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No contract delegates' : ''}
				<RevokeItemPaginator {delegates} />
			{/if}
		{:catch err}
			sdasdsa
			{$chainId}
			{$contracts[contractKey].address}
			Error fetching delegates {err.code}
		{/await}
	{:else if revokeKind === 'token'}
		{#await delegateTokenPromise}
			<div class="loader"><HammerLoader /></div>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{delegates.length === 0 ? 'No token delegates' : ''}
				<RevokeItemPaginator {delegates} />
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
				<button
					disabled={!$connectedToSupportedChain}
					on:click={$contracts[contractKey].revokeSelf(revokeVault)}>Revoke self</button
				>
			</div>

			<button
				disabled={!$connectedToSupportedChain}
				on:click={$contracts[contractKey].revokeAllDelegates()}>Revoke all delegates</button
			>
		</div>
	{/if}
</div>

<style>
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
	height: 17rem;
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

button:disabled {
	cursor: not-allowed !important;
}

.loader {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 3rem auto;
}

@media (max-width: 750px) {
	.container {
		width: 100%;
	}
	.other-tab {
		width: 80%;
	}
	.revoke-self {
		width: 100%;
		margin: auto;
	}
	button {
		width: 100%;
	}
}
</style>
