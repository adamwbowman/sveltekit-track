<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where } from 'firebase/firestore';

	let tagName = $page.params.tag;

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol, 
		where("tag", "==", tagName)
	);

	let expensesByTag = [];
	let years = [], months = [], days = []
	let bigTagName, bigTagColor, bigTagLabel

	getExpensesByTag();

	async function getExpensesByTag() {
		const querySnapshot = await getDocs(queryTag);
		expensesByTag = querySnapshot.docs.map(doc => doc.data());
		console.log(expensesByTag);
		years = expensesByTag.map(el => el.year);
		years = [...new Set(years)];
		months = expensesByTag.map(el => el.monthVerbose);
		months = [...new Set(months)];
		days = expensesByTag.map(el => el.dayShort);
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
</script>


<div class="container">
	<div class="row mt-2">
		<div class="col-12">
	<h5>
		<button type="button" class="btn btn-{bigTagColor}"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
			<ion-icon name="{bigTagName}"></ion-icon>
		</button>&nbsp; {bigTagLabel}
	</h5>
</div>
</div>
	<div class="accordion accordion-flush" id="accordionFlushExample">
	{#each years as year}
		{#each months as month, index}
			<div class="accordion-item">
				<h2 class="accordion-header" id="flush-heading{index}">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse{index}" aria-expanded="false" aria-controls="flush-collapse{index}">
						{year} {month}
					</button>
				</h2>
				<div id="flush-collapse{index}" class="accordion-collapse collapse" aria-labelledby="flush-heading{index}" data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						<div class="container">
						{#each expensesByTag.filter(el => el.monthVerbose == month) as expense}
							<div class="row">
								<div class="col-12">
									{expense.location}: ${expense.amount}
								</div>
							</div>
						{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/each}
	</div>
</div>