<script>
import { page } from '$app/stores';
import Expenses from '../expenses.svelte';
</script>

<h1>{ $page.params.tag }</h1>

<Expenses let:expenses>
	{#each expenses.filter(el => el.tag == $page.params.tag) as expense}
		<p>{expense.tag} - {expense.location}: {expense.amount}</p>
	{/each}
</Expenses>