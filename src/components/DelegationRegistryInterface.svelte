<script lang="ts">
import { contracts, connected } from 'svelte-ethers-store';
import DelegateForAll from './DelegateForAll.svelte';
import DelegateForContract from './DelegateForContract.svelte';
import DelegateForToken from './DelegateForToken.svelte';
</script>

{#if $connected && $contracts.delegationRegistry}
	<div class="container">
		<DelegateForAll />
		<DelegateForContract />
		<DelegateForToken />
	</div>
{:else}
	Please connect wallet
{/if}

<style>
.container {
	display: flex;
	flex-wrap: wrap;
}
</style>
