<script lang="ts">
import { contracts } from 'svelte-ethers-store';
import { utils } from 'ethers';
import { toShortAddress } from '../../utils';

export let delegateAddress;
export let contractAddress = undefined;
export let tokenId = undefined;

function revoke() {
	$contracts.delegationRegistry.revokeDelegate(delegateAddress);
}
</script>

<div class="box">
	<b>Delegate</b>
	<div>{toShortAddress(delegateAddress, 4)}</div>
	{#if contractAddress !== undefined}
		<b>Contract</b>
		<div>{toShortAddress(contractAddress, 4)}</div>
	{/if}
	{#if tokenId !== undefined}
		<b>Token ID</b>
		<div>{utils.formatUnits(tokenId, 0)}</div>
	{/if}
	<button on:click={() => revoke()}>Revoke</button>
</div>

<style>
.box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	text-align: center;
	border: 4px dotted black;
	width: 14rem;
	height: 11rem;
}

.box > b,
.box > div {
	margin-left: 1rem;
}

b {
	text-decoration: underline;
}

button {
	align-self: center;
	background: black;
	color: white;
	border: 2px solid grey;
	padding: 0.2rem 1rem 0.2rem 1rem;
	width: 8rem;
	height: 2rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	margin-top: 0.2rem;
}


@media (max-width: 750px) {

	.box {
		width: 11rem;
		cursor: pointer;
	}
}
</style>
