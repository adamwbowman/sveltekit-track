<script>
import Expenses from "./contacts.svelte";
import { slide } from 'svelte/transition';
import { fade } from 'svelte/transition';
</script>

<h1>Home</h1>

<Expenses let:expenses>
	{#each expenses as expense}
		<div in:slide out:fade>
			{expense.location}, {expense.tag}
		</div>
	{/each}
</Expenses>