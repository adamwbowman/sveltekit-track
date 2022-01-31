<script>
	import { fly } from 'svelte/transition';
	import { currentWeek, formatShortDate } from '$lib/dates';
	import Expenses from './expenses.svelte';

	let theWeek = currentWeek;
	let startDate = new Date(theWeek.start);
	let endDate = new Date(theWeek.end);

	let subTotal = 0;

	function getSubTotal(amount) {
		if (subTotal == 0) {
			subTotal = parseFloat((500-amount).toFixed(2));
		} else {
			subTotal = parseFloat((subTotal-amount).toFixed(2));
		}
		return subTotal;
	}
</script>

<h5>{formatShortDate(startDate)} - {formatShortDate(endDate)}</h5>

<div class="container">
	<Expenses let:expenses let:deleteExpense>
	{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
		<div class="row gx-3" 
			in:fly="{{ y: 200, duration: 2000 }}"
		>
			<div class="col-1 col-lg-3"></div>
			<!-- tag -->
			<div class="col-1 pull-left">
					<button type="button" class="btn btn-{expense.tagColor} btn-sm"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
						<ion-icon name="{expense.tag}"></ion-icon>
					</button>
				</div>
			<div class="col-5 col-lg-3">
				<p class="ps-2 p-md-0">{expense.dayShort}: {expense.location}</p>
			</div>
			<div class="col-2 col-lg-1 overflow-auto">
				<p class="text-end">-{expense.amount}</p>
			</div>
			<div class="col-2 col-lg-1 overflow-auto">
				<p class="text-secondary text-end">{getSubTotal(expense.amount)}</p>
			</div>
			<!-- delete button -->
			<div class="col-1 d-none d-md-block">
				<button type="button" class="btn btn-outline-secondary btn-sm"
					on:click="{() => deleteExpense(expense.id)}"
				>
					<ion-icon name="trash"></ion-icon>
				</button>
			</div>
		</div>
	{/each}
	</Expenses>
</div>
