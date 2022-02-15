<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where } from 'firebase/firestore';

	let tagName = $page.params.tag;

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol, 
		where("tag", "==", tagName)
	);

	let expenses = [];
	let years = [];
	let months = [];
	let days = [];

	async function getExpenses() {
		const querySnapshot = await getDocs(queryTag);
		expenses = querySnapshot.docs.map(doc => doc.data());
// console.log(expenses);
		years = expenses.map(el => el.year);
		years = [...new Set(years)];
		months = expenses.map(el => el.monthVerbose);
		months = [...new Set(months)];
		days = expenses.map(el => el.dayVerbose);
		days = [...new Set(days)];
	}
getExpenses();

</script>

<div class="container">
	<div class="row mb-3 mt-3">
		<div class="col-3"></div>
		<div class="col-6">
		<div class="accordion accordion-flush" id="accordionFlushExample">
		{#each years as year}
			{#each months as month}
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-heading{month}">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse{month}" aria-expanded="false" aria-controls="flush-collapse{month}">
							{year} {month}
						</button>
					</h2>
					<div id="flush-collapse{month}" class="accordion-collapse collapse" aria-labelledby="flush-heading{month}" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">
							{#each expenses.filter(el => el.monthVerbose == month) as expense}
							<div class="row gx-3">
								<div class="col-1"></div>
								<!-- tag -->
								<div class="col-1 pull-left">
										<button type="button" class="btn btn-{expense.tagColor} btn-sm">
											<ion-icon name="{expense.tag}"></ion-icon>
										</button>
									</div>
								<div class="col-5">
									<p class="ps-2 p-md-0">{expense.month}/{expense.date}: {expense.location}</p>
								</div>
								<div class="col-4 overflow-auto">
									<p class="text-end">${expense.amount}</p>
								</div>
								<div class="col-1"></div>
							</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		{/each}
		</div>
		</div>
		<div class="col-3"></div>
	</div>
</div>