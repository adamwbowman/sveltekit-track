<script>
import Expenses from "./expenses.svelte";
import { currentWeek } from "$lib/dates";

console.log(currentWeek);

let theWeek = currentWeek;


</script>

<h1>Current Week</h1>

<Expenses let:expenses>
	{#each expenses as expense}
	<div>
		<a href="/detail/{expense.tag}">{expense.tag}</a> - {expense.dayShort}: {expense.location}
	</div>
	{/each}
</Expenses>