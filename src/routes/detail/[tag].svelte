<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where } from 'firebase/firestore';
import Expenses from '../expenses.svelte';

	let tagName = $page.params.tag;

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol, 
		where("tag", "==", tagName)
	);

	let expensesByTag = [];
	let years = [], months = [], days = [];
	let bigTagName = "ellipsis-horizontal-circle-outline", bigTagColor = "secondary", bigTagLabel = "";

	async function getExpensesByTag() {
		const querySnapshot = await getDocs(queryTag);
		expensesByTag = querySnapshot.docs.map(doc => doc.data());
		console.log(expensesByTag);
		years = expensesByTag.map(el => el.year);
		years = [...new Set(years)];
		months = expensesByTag.map(el => el.monthVerbose);
		months = [...new Set(months)];
		days = expensesByTag.map(el => el.day);
		days = [...new Set(days)];
		console.log(years);
		console.log(months);
		console.log(days);
		bigTagName = tagName;
		bigTagColor = expensesByTag[0].tagColor;
		switch (tagName) {
			case "cart": return bigTagLabel = "Groceries"; break;
			case "logo-amazon": return bigTagLabel = "Amazon"; break;
			case "home": return bigTagLabel = "House Stuff"; break;
			case "restaurant": return bigTagLabel = "Eating"; break;
			case "subway": return bigTagLabel = "Transit"; break;
			case "shirt": return bigTagLabel = "Clothes"; break;
			default: return bigTagLabel = "Error"; break;
		}
	}

	getExpensesByTag();
</script>


<div class="container">
	<div class="row mb-3 mt-3">
		<div class="col-3"></div>
		<div class="col-6">
			<button type="button" class="btn btn-{bigTagColor}">
				<ion-icon name="{bigTagName}"></ion-icon>
			</button>&nbsp; {bigTagLabel}
		</div>
		<div class="col-3"></div>
	</div>
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
							{#each expensesByTag.filter(el => el.monthVerbose == month) as expense}
								{expense.month}.{expense.date} - {expense.location} ${expense.amount} <br />
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