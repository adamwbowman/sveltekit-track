<script>
import Expenses from "./expenses.svelte";
import { previousWeek, formatShortDate } from "$lib/dates";
import { fly } from 'svelte/transition';

let theWeek = previousWeek;
let startDate = new Date(theWeek.start);
let endDate = new Date(theWeek.end);
</script>

<h1>Previous Week</h1>
<h5>{formatShortDate(startDate)} - {formatShortDate(endDate)}</h5>

<Expenses let:expenses>
	<div class="container">
		{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
			<div class="row gx-3" 
				in:fly="{{ y: 200, duration: 2000 }}" 
			>				<!-- tag -->
				<div class="col-1 pull-left">
					<button type="button" class="btn btn-{expense.tagColor} btn-sm"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
						<ion-icon name="{expense.tag}"></ion-icon>
					</button>
				</div>
				<div class="col-3">
					<p class="">{expense.location} &nbsp; -{expense.amount}</p>
				</div>
			</div>
		{/each}
	</div>
</Expenses>