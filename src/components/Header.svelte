<script lang="ts">
import { signerAddress } from 'svelte-ethers-store';
import { accountModalHidden } from '../store';
import { toShortAddress } from '../utils';
</script>

<header class="header">
	<h1>Token Delegation</h1>
	<button
		on:click={() => {
			$accountModalHidden = false;
		}}>{$signerAddress ? toShortAddress($signerAddress) : 'Conectar'}</button
	>
</header>

<style>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem;
}
</style>
