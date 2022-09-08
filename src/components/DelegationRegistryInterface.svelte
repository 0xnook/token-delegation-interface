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
		$contracts.delegationRegistry.getDelegatesForAll($signerAddress);
	});
}
</script>

<div class="container">
	{#if $connected && $contracts.delegationRegistry}
		{$contracts.delegationRegistry.listenerCount()}
		<h1>Wallet delegates</h1>
		{#await delegatePromise}
			<span>waiting...</span>
		{:then delegates}
			{#if delegates && 'length' in delegates}
				{#each delegates as delegate}
					<span>{delegate}</span>
				{/each}
			{/if}
		{:catch err}
			There was an error, is the contract deployed?
			{err}
		{/await}
	{:else}
		Please connect wallet
	{/if}

	<label for="address-input">New delegate: </label>
	<input id="address-input" type="text" bind:value={newDelegateAddress} />
	<button on:click={addNewDelegate}>Set wallet delegate</button>
</div>

<style>
.container {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	width: 30rem;
	margin: auto;
}

#address-input {
	width: 30rem;
}
</style>
