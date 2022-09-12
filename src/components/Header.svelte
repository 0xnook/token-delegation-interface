<script lang="ts">
import { signerAddress, chainData } from 'svelte-ethers-store';
import { accountModalHidden } from '../store';
import { toShortAddress } from '../utils';
</script>

<header class="header">
	<h1>Token Delegation</h1>
	<div>
		{$chainData?.name ? $chainData.name : ''}
		&nbsp;
		<button
			on:click={() => {
				$accountModalHidden = false;
			}}>{$signerAddress ? toShortAddress($signerAddress) : 'Conectar'}</button
		>
	</div>
</header>

<style>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem;
	color: var(--outline-color);
}

button {
	align-self: center;
	border: 2px dotted var(--outline-color);
	padding: 0.2rem 1rem 0.2rem 1rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	margin-top: 0.2rem;
}
</style>
