<script lang="ts">
import RevokeListItem from './RevokeItem.svelte';

import ArrowLeft from '../../../static/icons/arrow-left.svg';
import ArrowRight from '../../../static/icons/arrow-right.svg';


export let delegates;
let page = 0;

$: itemCount = delegates?.length ? delegates.length : 0;
$: pageCount = itemCount > 0 ? Math.ceil(itemCount/4)-1 : 0; 
$: firstPageItem = 4*(page)

</script>

<div class="outer-container">
	<div class="arrow" on:click={()=>page--} class:hidden={page===0}><ArrowLeft/></div>
	<div class="inner-container">
		{#each delegates.slice(firstPageItem, firstPageItem+4) as delegate}
			<RevokeListItem delegateAddress={delegate?.delegate ? delegate.delegate : delegate} contractAddress={delegate.contract_} tokenId={delegate.tokenId}/>
		{/each}
	</div>
	<div class="arrow" on:click={()=>page++} class:hidden={pageCount===page}><ArrowRight/></div>
</div>

<style>
.outer-container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 40rem;
	height: 30rem;
}

.inner-container {
	display: flex;
	margin: 9.5rem auto;
	flex-wrap: wrap;
	width: 30rem;
	gap: 1rem;
	justify-content: flex-start;
}

.arrow {
	width: 2.5rem;
	cursor: pointer;
}

.hidden {
	visibility: hidden;
}

@media (max-width: 750px) {
	.outer-container {
		width: 30rem;
		font-size: 0.8rem;
	}
  .inner-container {
    width: 25rem;
		/* font-size: 0.5rem; */
  }


}

</style>
