<script>
	import Expenses from "./expenses.svelte";
	import { previousWeek } from "$lib/dates";
	
	console.log(previousWeek);
	
	let theWeek = previousWeek;
	
	
	</script>
	
	<h1>Previous Week</h1>
	
	<Expenses let:expenses>
		{#each expenses as expense}
		<div>
			<a href="/detail/{expense.tag}">{expense.tag}</a> - {expense.dayShort}: {expense.location}
		</div>
		{/each}
	</Expenses>