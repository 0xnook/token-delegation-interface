<script lang="ts">
import { contracts, connected, signerAddress } from 'svelte-ethers-store';

let newDelegateAddress: string;
let newDelegateContractAddress: string;

let queryInputContract: string;
let queryParamContract: string;

let delegatePromise: Promise<string[]>;
$: if ($connected && $contracts.delegationRegistry && queryParamContract) {
	delegatePromise = $contracts.delegationRegistry.getDelegatesForContract($signerAddress, queryParamContract);
}

function addNewDelegate() {
	$contracts.delegationRegistry.delegateForContract(newDelegateAddress, newDelegateContractAddress, true);
}

$: if ($connected && $contracts.delegationRegistry) {
	$contracts.delegationRegistry.on('DelegateForContract', () => {
		delegatePromise = $contracts.delegationRegistry.getDelegatesForContract($signerAddress, queryParamContract);
	});
}
</script>

<div class="box">
	<h1>Contract delegates</h1>
	{#await delegatePromise}
		<span>waiting...</span>
	{:then delegates}
		{#if delegates && 'length' in delegates}
			{#each delegates as delegate}
				<li>{delegate}</li>
			{/each}
		{/if}
	{:catch err}
		{err.code}
	{/await}

	<h4>Query params</h4>

	<h5>Contract: {queryParamContract ? queryParamContract : 'please set'}</h5>

	<label for="address-input">Query contract: </label>
	<input id="address-input" type="text" bind:value={queryInputContract} />

	<button on:click={()=>queryParamContract=queryInputContract}>Submit</button>

	<h5>New delegate</h5>

	<label for="address-input">Delegate address: </label>
	<input id="address-input" type="text" bind:value={newDelegateAddress} />

	<label for="contract-input">Contract: </label>
	<input id="contract-input" type="text" bind:value={newDelegateContractAddress} />
	<button on:click={addNewDelegate}>Set contract delegate</button>
</div>


<style>
.box {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	margin: auto;

	width: 35rem;
	height: 55rem;
	padding: 1rem;
	border: 1px solid black;
}
input {
	width: 30rem;
}
</style>
