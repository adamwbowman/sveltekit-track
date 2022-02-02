<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, orderBy } from 'firebase/firestore';

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol,
		orderBy("createdAt", "asc")
	);

	let expenses = [];
	const tags = ["cart", "home", "logo-amazon", "restaurant", "shirt", "subway"];

	async function getExpenses() {
		const querySnapshot = await getDocs(queryTag);
		expenses = querySnapshot.docs.map(doc => doc.data());
		console.log(expenses);
		// years = expensesByTag.map(el => el.year);
		// years = [...new Set(years)];
		// months = expensesByTag.map(el => el.monthVerbose);
		// months = [...new Set(months)];
		// days = expensesByTag.map(el => el.day);
		// days = [...new Set(days)];
		// console.log(years);
		// console.log(months);
		// console.log(days);
		// bigTagName = tagName;
		// bigTagColor = expensesByTag[0].tagColor;
		// switch (tagName) {
		// 	case "cart": return bigTagLabel = "Groceries"; break;
		// 	case "logo-amazon": return bigTagLabel = "Amazon"; break;
		// 	case "home": return bigTagLabel = "House Stuff"; break;
		// 	case "restaurant": return bigTagLabel = "Eating"; break;
		// 	case "subway": return bigTagLabel = "Transit"; break;
		// 	case "shirt": return bigTagLabel = "Clothes"; break;
		// 	default: return bigTagLabel = "Error"; break;
		// }
	}

	getExpenses();
</script>

<div class="container">
	<div class="row">
		<div class="col">
		{#each tags as tag}
			{tag}<br />
			{#each expenses.filter(el => el.tag == tag) as expense}
				{expense.location} - {expense.tag} - {expense.amount}<br />
			{/each}
			<br />
		{/each}
		</div>
	</div>
</div>