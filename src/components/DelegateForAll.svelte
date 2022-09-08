<script lang="ts">
import { contracts, connected, signerAddress } from 'svelte-ethers-store';

let newDelegateAddress: string;

let delegatePromise: Promise<string[]>;
$: if ($connected && $contracts.delegationRegistry) {
	delegatePromise = $contracts.delegationRegistry.getDelegatesForAll($signerAddress);
}

function addNewDelegate() {
	$contracts.delegationRegistry.delegateForAll(newDelegateAddress, true);
}

$: if ($connected && $contracts.delegationRegistry) {
	$contracts.delegationRegistry.on('DelegateForAll', (vault, delegate, value) => {
		console.log(vault, delegate, value);
		delegatePromise = $contracts.delegationRegistry.getDelegatesForAll($signerAddress);
	});
}
</script>

<div class="box">
	<h1>Wallet delegates</h1>
	{#await delegatePromise}
		<span>waiting...</span>
	{:then delegates}
		{#if delegates && 'length' in delegates}
			{delegates.length === 0 ? "No wallet delegates" : ""}
			{#each delegates as delegate}
				<li>{delegate}</li>
			{/each}
		{/if}
	{:catch err}
		{err.code}
	{/await}

	<h5>New delegate</h5>
	<label for="address-input">Delegate address: </label>
	<input id="address-input" type="text" bind:value={newDelegateAddress} />
	<button on:click={addNewDelegate}>Set wallet delegate</button>
</div>

<style>
.box {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 0.5rem;
	margin: auto;

	height: 55rem;
	width: 35rem;
	padding: 1rem;
	border: 1px solid black;
}
#address-input {
	width: 30rem;
}
</style>
