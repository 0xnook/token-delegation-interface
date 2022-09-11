<script lang="ts">
import { signerAddress, chainData, chainId } from 'svelte-ethers-store';
import { accountModalHidden } from '../store';
import { toShortAddress } from '../utils';
</script>

<header class="header">
	<h1>Token Delegation</h1>
	<div>
		{$chainData?.name} 
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
}



button {
	align-self: center;
	border: 2px dotted black;
	padding: 0.2rem 1rem 0.2rem 1rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	margin-top: 0.2rem;
}

</style>
