<script lang="ts">
import type {NavOption} from '../../app.d.ts';

export let options: NavOption;

export let selected = options[0].key;
</script>

<nav>
	<ul>
		{#each options as option}
			<li class:selected={selected===option.key} on:click={()=>selected=option.key}>{option.value}</li>
		{/each}
	</ul>
</nav>

<style>
ul {
	display: flex;
	margin-left: 1rem;
}

li {
 font-size: 2rem;
 list-style-type: none;
 /* margin: 0.3rem; */
 margin-left: 3rem;
 color: grey;
 cursor: pointer;
}


li:hover {
 color: black;
}

.selected {
	font-weight: 700;
	color: black;
 	list-style-type: '⋄';
	text-decoration: underline;
}

</style>
