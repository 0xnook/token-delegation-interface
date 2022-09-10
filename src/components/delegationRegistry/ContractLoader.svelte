<script lang="ts">
import { contracts, connected } from 'svelte-ethers-store';
import Card from './Card.svelte';
import Delegate from './Delegate.svelte';
import Revoke from './Revoke.svelte';

import type { DelegateKind, RevokeKind } from '../../app.d.ts';

let selectedDelegateTab: DelegateKind;
let selectedRevokeTab: RevokeKind = 'self';

const delegateNavOptions = [
	{
		key: 'wallet',
		value: 'Wallet'
	},
	{
		key: 'contract',
		value: 'Contract'
	},
	{
		key: 'token',
		value: 'Token'
	}
];

const revokeNavOptions = [...delegateNavOptions, { key: 'other', value: 'Other' }];
</script>

{#if $connected && $contracts.delegationRegistry}
	<div class="container">
		<Card
			shadow="left"
			header="DÊLEGATE"
			navOptions={delegateNavOptions}
			bind:selectedTab={selectedDelegateTab}
		>
			<Delegate delegateKind={selectedDelegateTab} />
		</Card>

		<Card
			shadow="right"
			header="REVƠKE"
			bind:selectedTab={selectedRevokeTab}
			navOptions={revokeNavOptions}
		>
			<Revoke revokeKind={selectedRevokeTab} />
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
