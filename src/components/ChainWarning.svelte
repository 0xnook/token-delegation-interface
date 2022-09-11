<script lang="ts">
import { connectedToSupportedChain } from '../store';
</script>

<div class:hidden={$connectedToSupportedChain}>
	Connected to unsupported chain!
</div>

<style>
div {
	text-align: center;
	border-bottom: 4px dotted;
	padding: 1rem 0 1rem 0;
	background-color: #DCDCDC;
}

.hidden {
	display: none;
}
</style>

