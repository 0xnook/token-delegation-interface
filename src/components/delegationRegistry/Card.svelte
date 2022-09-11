<script lang="ts">
import NavBar from './NavBar.svelte';

export let header;
export let selectedTab;
export let shadow = 'left';

export let navOptions;
</script>

<section class:shadow-left={shadow === 'left'} class:shadow-right={shadow === 'right'} class="card">
	<h1 class="header">{header}</h1>
	<NavBar options={navOptions} bind:selected={selectedTab} />
	<div class="graphic" />
	<slot />
</section>

<style>
.card {
	border: 2px solid;
	width: 45rem;
	/* margin: auto; */
	min-height: 50rem;
}

.shadow-left {
	box-shadow: -1px 0px 0px black, -2px 2px 0px black, -3px 3px 0px black, -4px 4px 0px black,
		-5px 5px 0px black, -6px 6px 0px black, -7px 7px 0px black, -8px 8px 0px black,
		-9px 9px 0px black, -10px 10px 0px black, -11px 11px 0px black, -12px 12px 12px 0px black;
}

.shadow-right {
	box-shadow: 1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black,
		5px 5px 0px black, 6px 6px 0px black, 7px 7px 0px black, 8px 8px 0px black, 9px 9px 0px black,
		10px 10px 0px black, 11px 11px 0px black, 12px 12px 12px 0px black;
}

.header {
	font-weight: 700;
	font-size: 4rem;
	text-decoration: underline 5px;
	width: 90%;
	margin: 2rem auto auto auto;
	justify-self: flex-end;
}

.graphic {
	display: border;
	height: 10rem;
	background-color: grey;
	width: 90%;
	margin: auto;
}
</style>
