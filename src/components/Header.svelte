<script lang="ts">
import { signerAddress, chainData, chainId } from 'svelte-ethers-store';
import { accountModalHidden } from '../store';
import { toShortAddress, changeNetwork } from '../utils'; 
import { chainOptions } from '../constants';

import Select from './Select.svelte';

$: chainHex = 'chainId' in $chainData ? '0x' + $chainData.chainId.toString(16) : '0x1';
</script>

<header class="header">
	<h1>Token Delegation</h1>
	<div class="right">
		{#if $chainId}
			<Select options={chainOptions} defaultValue={$chainId.toString()} handleClickFunc={changeNetwork} fallBackPlaceHolder={$chainData?.name ? $chainData.name : ''}/>
		{/if}
		<button
			on:click={() => {
				$accountModalHidden = false;
			}}>{$signerAddress ? toShortAddress($signerAddress, 4) : 'Connect'}</button
		>
	</div>
</header>

<style>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0 1rem 0 1rem;
	color: var(--outline-color);
}

button {
	width: 9.2rem;
	/* height: 2.5rem; */
	align-self: center;
	border: 2px dotted var(--outline-color);
	padding: 0.5rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	/* margin-top: 0.1rem; */
	color: var(--outline-color);
	background-color: var(--background-color);
}

button:hover {
	font-weight: bold;
  filter: brightness(150%);
}

.right {
	display: inline-flex;
	justify-content: flex-end;
	gap: 0.5rem;
	flex-wrap: wrap-reverse;
	align-items: baseline;
}

@media(max-width: 581px) {
	.right {
		gap: 0;
	}
}
</style>
