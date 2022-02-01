<script>
	import { goto } from '$app/navigation';
	import { previousWeek, formatShortDate } from '$lib/dates';
	import Expenses from './expenses.svelte';

	let theWeek = previousWeek;
	let startDate = new Date(theWeek.start);
	let endDate = new Date(theWeek.end);
</script>

<h5>{formatShortDate(startDate)} - {formatShortDate(endDate)}</h5>

<div class="container">
	<Expenses let:expenses>
	{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
		<div class="row gx-3">
			<!-- tag -->
			<div class="col-1 pull-left">
				<button type="button" class="btn btn-{expense.tagColor} btn-sm"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"
					on:click="{() => goto('/detail/'+expense.tag)}"
				>
					<ion-icon name="{expense.tag}"></ion-icon>
				</button>
			</div>
			<div class="col-3">
				<p class="">{expense.location} &nbsp; -{expense.amount}</p>
			</div>
		</div>
	{/each}
	</Expenses>
</div>