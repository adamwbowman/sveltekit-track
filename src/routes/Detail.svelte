<script>
export let tag;
export let expenses = [];
console.log(tag);
console.log(expenses);
</script>

<slot {tag} {expenses} ></slot>

<p>outside</p>
{#each expenses as expense}
	<p>{expense.location}: {expense.amount}</p>
{/each}
