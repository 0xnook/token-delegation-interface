<script lang="ts">
import Card from './Card.svelte';
import Delegate from './Delegate.svelte';
import Revoke from './Revoke.svelte';

import type { DelegateKind, RevokeKind } from '../../app.d.ts';

let selectedDelegateTab: DelegateKind = 'wallet';
let selectedRevokeTab: RevokeKind = 'wallet';

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

$: outerWidth = 0;
</script>

<svelte:window bind:outerWidth />

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
		shadow={outerWidth > 1495 ? 'right' : 'left'}
		header="REVƠKE"
		bind:selectedTab={selectedRevokeTab}
		navOptions={revokeNavOptions}
	>
		<Revoke revokeKind={selectedRevokeTab} />
	</Card>
</div>

<style>
.container {
	display: flex;
	flex-wrap: wrap;
	margin: auto auto 3rem;
	gap: 3rem;
	justify-content: center;
}

@media (max-width: 750px) {
	.container {
		width: 95%;
		cursor: pointer;
	}
}
</style>
