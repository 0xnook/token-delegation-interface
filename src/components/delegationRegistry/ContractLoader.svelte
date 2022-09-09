<script lang="ts">
import { contracts, connected } from 'svelte-ethers-store';
import Card from './Card.svelte';
import Delegate from './Delegate.svelte';
import Revoke from './Revoke.svelte';

import type { DelegateKind } from '../../app.d.ts';

let selectedDelegateTab: DelegateKind;
let selectedRevokeTab: DelegateKind;
</script>

{#if $connected && $contracts.delegationRegistry}
	<div class="container">
		<Card shadow="left" header="DÊLEGATE" bind:selectedTab={selectedDelegateTab} >
			{#if selectedDelegateTab === 'wallet'}
				<Delegate delegateKind="wallet"/>
			{:else if selectedDelegateTab === 'contract'}
				<Delegate delegateKind="contract"/>
			{:else}
				<Delegate delegateKind="token"/>
			{/if}
		</Card>

		<Card shadow="right" header="REVƠKE" bind:selectedTab={selectedRevokeTab}>
			{#if selectedRevokeTab === 'wallet'}
				<Revoke delegateKind="wallet"/>
			{:else if selectedRevokeTab === 'contract'}
				<Revoke delegateKind="contract"/>
			{:else}
				<Revoke delegateKind="token"/>
			{/if}
		</Card>
	</div>
{:else}
	Please connect wallet to get started
{/if}

<style>
.container {
	display: flex;
	margin: auto;
	gap: 3rem;
	justify-content: center;
}
</style>

