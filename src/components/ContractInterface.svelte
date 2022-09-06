<script lang="ts">
import { contracts, connected, signerAddress, defaultEvmStores } from 'svelte-ethers-store'

import { IDelegationRegistryABI } from '../abis/abis';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

defaultEvmStores.attachContract('delegationRegistry', contractAddress, IDelegationRegistryABI);

let delegateAddress;

function addNewDelegate() {
	$contracts.delegationRegistry.delegateForAll(delegateAddress, true);
}
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
{#if $connected }
<h1>Delegates</h1>
{#await $contracts.delegationRegistry.getDelegatesForAll($signerAddress)}
	<span>waiting...</span>
{:then values}
	{#each values as value}
		<span>Current delegates : { value != '' ? value : 'none' } </span>
	{/each}
{/await}
{:else}
	please connect wallet
{/if}

<label for="addressInput">New delegate: </label>
<input id="addressInput" type="text" bind:value={delegateAddress}/>
<button on:click={addNewDelegate}>Set delegate for all</button>
</div>
