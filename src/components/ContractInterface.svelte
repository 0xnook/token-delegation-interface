<script lang="ts">
import { contracts, connected, signerAddress, defaultEvmStores, provider } from 'svelte-ethers-store'

import { IDelegationRegistryABI } from '../abis/abis';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

defaultEvmStores.attachContract('delegationRegistry', contractAddress, IDelegationRegistryABI);

let newDelegateAddress;

function addNewDelegate() {
	$contracts.delegationRegistry.delegateForAll(newDelegateAddress, true);
}

let delegates;

async function fetchDelegates() {
	delegates = await $contracts.delegationRegistry.getDelegatesForAll($signerAddress)
};

$: if(connected && 'delegationRegistry' in $contracts) {
	$contracts.delegationRegistry.on("DelegateForAll", (vault, delegate, value) => {
			console.log(vault, delegate, value);
			fetchDelegates();
	});
}

$provider
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 60%;
	margin: auto;
}
</style>

<div class="container">
{#if $connected && delegates}
<h1>Delegates</h1>
{#await delegates}
	<span>waiting...</span>
{:then values}
	{#each values as value}
		<span>Current delegates : { value != '' ? value : 'none' } </span>
	{/each}
{:catch err}
	There was an error, is the contract deployed?
	{err}
{/await}
{:else}
	please connect wallet
{/if}

<label for="addressInput">New delegate: </label>
<input id="addressInput" type="text" bind:value={newDelegateAddress}/>
<button on:click={addNewDelegate}>Set delegate for all</button>
</div>
