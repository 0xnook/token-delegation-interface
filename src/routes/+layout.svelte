<script lang="ts">
import { accountModalHidden } from '../store';
import Header from '../components/Header.svelte';
import AccountModal from '../components/AccountModal.svelte';
import ChainWarning from '../components/ChainWarning.svelte';
import Footer from '../components/Footer.svelte';
</script>

<ChainWarning />
{#key $accountModalHidden}
	<AccountModal bind:hide={$accountModalHidden} />
{/key}

<div class="wrapper">
	<Header />
	<!-- Page contents -->
	<slot />
	<Footer />
</div>

<style>
/* TODO: bundle fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');
@font-face {
	font-family: 'Noto Sans', sans-serif;
	font-style: normal;
	font-weight: 500;
	src: url('/fonts/NotoSans-Medium.ttf.ttf') format('truetype'),
		url('/fonts/NotoSans-Bold.ttf.ttf') format('truetype');
}

:global(body) {
	font-family: 'Noto Sans', sans-serif;
	padding: 0;
	margin: 0;
	height: 100%;
	background-color: var(--background-color);
	color: var(--outline-color);
}

.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	width: 100vw;
}
</style>
