<script>
import Expenses from "./expenses.svelte";
import { currentWeek } from "$lib/dates";

let theWeek = currentWeek;
let startDate = new Date(theWeek.start);
let endDate = new Date(theWeek.end);
</script>

<h1>Current Week</h1>
<h5>{startDate}<br />{endDate}</h5>
<Expenses let:expenses>
	{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
	<div>
		<a href="/detail/{expense.tag}">{expense.tag}</a> - {expense.dayShort}{expense.date}: {expense.location}
	</div>
	{/each}
</Expenses>