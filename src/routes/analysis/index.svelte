<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, orderBy } from 'firebase/firestore';

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol,
		orderBy("createdAt", "asc")
	);

	let expenses = [];
	let years = [], months = [], days = [];
	const tags = ["cart", "home", "logo-amazon", "restaurant", "shirt", "subway"];

	async function getExpenses() {
		const querySnapshot = await getDocs(queryTag);
		expenses = querySnapshot.docs.map(doc => doc.data());
		console.log(expenses);
		years = expenses.map(el => el.year);
		years = [...new Set(years)];
		months = expenses.map(el => el.monthVerbose);
		months = [...new Set(months)];
		days = expenses.map(el => el.day);
		days = [...new Set(days)];
	}

	getExpenses();
</script>

<div class="container">
	<div class="row">
		<div class="col-4">
		<br /><b><u>Expenses by tag</u></b><br /><br />
		{#each tags as tag}
			<b>{tag} - count:{expenses.filter(el => (el.tag == tag)).length}</b><br />
			{#each expenses.filter(el => el.tag == tag) as expense}
				{expense.tag}:{expense.location} ${expense.amount}<br />
			{/each}
			<i>total:{expenses.filter(el => (el.tag == tag)).reduce((accum, item) => accum + item.amount, 0)}, 
			avg: {(expenses.filter(el => (el.tag == tag)).reduce((accum, item) => accum + item.amount, 0)) / (expenses.filter(el => (el.tag == tag)).length)}</i>
			<br /><br />
		{/each}
		</div>
		<div class="col-4">
			<br /><b><u>Expenses by day</u></b><br /><br />
			{#each days as day}
				<b>{day} - count:{expenses.filter(el => (el.day == day)).length}</b><br />
				{#each expenses.filter(el => el.day == day) as expense}
					{expense.location} - {expense.tag} - {expense.amount}<br />
				{/each}
				<i>total:{expenses.filter(el => (el.day == day)).reduce((accum, item) => accum + item.amount, 0)},
				avg: {(expenses.filter(el => (el.day == day)).reduce((accum, item) => accum + item.amount, 0)) / (expenses.filter(el => (el.day == day)).length)}</i>
				<br /><br />
			{/each}
		</div>
	</div>
</div>