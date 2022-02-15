<script>
	import { goto } from "$app/navigation";

	export let expense;
	export let getSubTotal;
	export let deleteExpense;

	function showDetail(tag) {
		goto('/detail/'+tag);
	}
</script>

<slot {expense} {getSubTotal} {deleteExpense} >
	<div class="row gx-3">
		<div class="col-1 col-lg-3"></div>
		<!-- tag -->
		<div class="col-1 pull-left">
				<button type="button" class="btn btn-{expense.tagColor} btn-sm"
					on:click="{() => showDetail(expense.tag)}"
				>
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
</slot>