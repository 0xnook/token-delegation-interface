<script lang="ts">
/* Adapted from https://codepen.io/devesh8/pen/MWYEJEP */
export let label;
export let inputType = 'text';
export let placeholder = '';
export let value;
</script>

<div class="did-floating-label-content">
	{#if inputType === 'text'}
		<input class="did-floating-input" bind:value type="text" {placeholder} />
		<label class="did-floating-label">
			{label}
		</label>
	{:else if inputType === 'number'}
		<input class="did-floating-input" bind:value type="number" {placeholder} />
		<label class="did-floating-label">
			{label}
		</label>
	{/if}
</div>

<style>
.did-floating-label-content {
	position: relative;
	margin-bottom: 1.25rem;
}
.did-floating-label {
	color: black;
	font-size: 1rem;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 1rem;
	top: 0.85rem;
	padding: 0 0.3rem;
	background: #fff;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;
}
.did-floating-input {
	font-size: 1rem;
	display: block;
	width: 100%;
	height: 3rem;
	padding: 0 1.25rem;
	background: #fff;
	color: black;
	border: 1px solid black;
	box-sizing: border-box;
}
.did-floating-input:focus {
	outline: none;
}
.did-floating-input:focus ~ .did-floating-label {
	top: -0.5rem;
	font-size: 0.8rem;
}
.did-floating-input:not(:placeholder-shown) ~ .did-floating-label {
	top: -0.5rem;
	font-size: 0.8rem;
}
</style>
