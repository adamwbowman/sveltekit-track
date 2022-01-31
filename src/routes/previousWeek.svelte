<script>
import Expenses from "./expenses.svelte";
import { previousWeek, formatShortDate } from "$lib/dates";

let theWeek = previousWeek;
let startDate = new Date(theWeek.start);
let endDate = new Date(theWeek.end);
</script>

<h1>Previous Week</h1>
<h5>{formatShortDate(startDate)} - {formatShortDate(endDate)}</h5>
<Expenses let:expenses>
	{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
	<div>
		<a href="/detail/{expense.tag}">{expense.tag}</a> - {expense.dayShort}{expense.date}: {expense.location}
	</div>
	{/each}
</Expenses>