<script>
export let expenses
</script>

<slot {expenses} >
	{#each expenses as expense}
		<p>:: ${expense.amount}</p>
	{/each}
</slot>