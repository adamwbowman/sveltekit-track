<script>
import Expenses from "./expenses.svelte";

function setTag() {
// todo
}
function getSubTotal() {
// todo
}
function deleteExpense() {
// todo
}
</script>

<h1>Home</h1>

<Expenses let:expenses>
	{#each expenses as expense}
	<div>
		<a href="/detail/{expense.tag}">{expense.tag}</a> - {expense.dayShort}: {expense.location}
	</div>
	{/each}
</Expenses>