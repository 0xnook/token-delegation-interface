<script lang="ts">
import { contracts, connected, signerAddress } from 'svelte-ethers-store';

let newDelegateAddress: string;
let newDelegateContractAddress: string;
let newDelegateTokenId: number;

let queryInputContract: string;
let queryInputTokenId: number;

let queryParamContract: string;
let queryParamTokenId: number;

let delegatePromise: Promise<string[]>;
$: if (
	$connected &&
	$contracts.delegationRegistry &&
	queryParamContract &&
	queryParamTokenId !== undefined
) {
	console.log($signerAddress, queryParamContract, queryParamTokenId);
	delegatePromise = $contracts.delegationRegistry.getDelegatesForToken(
		$signerAddress,
		queryParamContract,
		queryParamTokenId
	);
}

function addNewDelegate() {
	$contracts.delegationRegistry.delegateForToken(
		newDelegateAddress,
		newDelegateContractAddress,
		newDelegateTokenId,
		true
	);
}

$: if (
	$connected &&
	$contracts.delegationRegistry &&
	queryParamContract &&
	queryParamTokenId !== undefined
) {
	$contracts.delegationRegistry.on('DelegateForToken', () => {
		delegatePromise = $contracts.delegationRegistry.getDelegatesForToken(
			$signerAddress,
			queryParamContract,
			queryParamTokenId
		);
	});
}
</script>

<div class="box">
	<h1>Token delegates</h1>
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
	<h5>Token id: {queryParamTokenId !== undefined ? queryParamTokenId : 'please set'}</h5>

	<label for="query-contract-input">Query contract: </label>
	<input id="query-contract-input" type="text" bind:value={queryInputContract} />

	<label for="query-tokenid-input">Query tokenID: </label>
	<input id="query-tokenid-input" type="number" bind:value={queryInputTokenId} />

	<button
		on:click={() => {
			queryParamContract = queryInputContract;
			queryParamTokenId = queryInputTokenId;
		}}>Submit</button
	>

	<h5>New delegate</h5>
	<label for="address-input">Delegate address: </label>
	<input id="address-input" type="text" bind:value={newDelegateAddress} />

	<label for="contract-input">Contract: </label>
	<input id="contract-input" type="text" bind:value={newDelegateContractAddress} />

	<label for="tokenid-input">TokenID: </label>
	<input id="tokenid-input" type="text" bind:value={newDelegateTokenId} />
	<button on:click={addNewDelegate}>Set token delegate</button>
</div>

<style>
.box {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 0.5rem;
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
