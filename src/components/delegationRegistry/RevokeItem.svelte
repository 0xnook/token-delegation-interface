<script lang="ts">
import { contracts, chainId, chainData } from 'svelte-ethers-store';
import { utils } from 'ethers';
import { toShortAddress } from '../../utils';

export let delegateAddress;
export let contractAddress = undefined;
export let tokenId = undefined;

$: contractKey = 'delegationRegistry' + $chainId;

function revoke() {
	$contracts[contractKey].revokeDelegate(delegateAddress);
}
</script>

<div class="box">
	<b>Delegate</b>
	<div
		class="address"
		on:click={() =>
			window.open($chainData.explorers[0].url + '/address/' + delegateAddress, '_blank')}
	>
		{toShortAddress(delegateAddress, 4)}
	</div>

	{#if contractAddress !== undefined}
		<b>Contract</b>
		<div
			class="address"
			on:click={() =>
				window.open($chainData.explorers[0].url + '/address/' + contractAddress, '_blank')}
		>
			{toShortAddress(contractAddress, 4)}
		</div>
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
	border: 4px dotted var(--outline-color);
	width: 14rem;
	height: 11rem;
}

.box > b,
.box > div {
	margin-left: 1rem;
}

.address {
	cursor: pointer;
}

.address:hover {
	font-weight: 600;
	text-decoration: underline;
}

b {
	text-decoration: underline;
}

button {
	align-self: center;
	background: var(--outline-color);
	color: var(--background-color);
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
