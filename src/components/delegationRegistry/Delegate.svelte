<script lang="ts">
import { contracts } from 'svelte-ethers-store';
import InputFloatingLabel from '../InputFloatingLabel.svelte';

import type { DelegateKind } from '../../app.d.ts';

export let delegateKind: DelegateKind;

let newDelegateAddress;
let	newDelegateContractAddress;
let	newDelegateTokenId;

function addNewDelegate() {
	if (delegateKind === 'wallet') {
		$contracts.delegationRegistry.delegateForAll(
			newDelegateAddress,
			true
		);
	} else if (delegateKind === 'contract') {
		$contracts.delegationRegistry.delegateForContract(
			newDelegateAddress,
			newDelegateContractAddress,
			true
		);
	} else if (delegateKind === 'token') {
		$contracts.delegationRegistry.delegateForToken(
			newDelegateAddress,
			newDelegateContractAddress,
			newDelegateTokenId,
			true
		);
	}
}

</script>

<div class="container">
	<div class="inputs">
		<InputFloatingLabel bind:value={newDelegateAddress} label="Delegate address" placeholder="nook.eth"/>

		{#if delegateKind === 'contract' || delegateKind === 'token'}
			<InputFloatingLabel bind:value={newDelegateContractAddress} label="Contract address" placeholder="0x50c57894C3..."/>
		{/if}

		{#if delegateKind === 'token'}
			<InputFloatingLabel bind:value={newDelegateTokenId} label="TokenID" inputType="number" placeholder="0"/>
		{/if}
	</div>

	<button on:click={addNewDelegate}>Create new delegate for token</button>
</div>

<style>
.container {
	width: 30rem;
	margin: 1rem auto;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	/* min-height: 40rem; */
}

.inputs {
	height: 17rem
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
