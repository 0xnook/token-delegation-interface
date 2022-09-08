<script>
	import {accountModalHidden} from '../store';
	import Header from '../components/Header.svelte';
	import AccountModal from '../components/AccountModal.svelte';
</script>

<Header />
{#key $accountModalHidden}
	<AccountModal bind:hide={$accountModalHidden} />
{/key}

<!-- Page contents -->
<slot />
