<script>
	import { fly } from 'svelte/transition';

	export let expenses;
	export let startDate;
	export let endDate;
	export let getSubTotal;
	export let deleteExpense;
</script>

<slot {expenses} {startDate} {endDate} {getSubTotal} {deleteExpense} >
	<div class="container">
		{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
			<div class="row gx-3" 
				in:fly="{{ y: 200, duration: 2000 }}"
			>
				<div class="col-1 col-lg-3"></div>
				<!-- tag -->
				<div class="col-1 pull-left">
						<button type="button" class="btn btn-{expense.tagColor} btn-sm">
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
	</div>
</slot>