<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, orderBy } from 'firebase/firestore';
	import { extent, mean, sum } from "d3-array";

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol,
		orderBy("createdAt", "asc")
	);

	let expenses = [];
	let years = [];
	let months = [];
	let days = [];
	const tags = ["cart", "home", "logo-amazon", "restaurant", "shirt", "subway"];

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

	let tagFilter = [];
	let tagCount = 0, tagTotal = 0, tagAverage = 0, tagTopOne = 0;
	let tagTopFive = []; 

	function getTagCalcs(tag) {
		tagFilter = expenses.filter(el => (el.tag == tag));
		tagCount = tagFilter.length;
		tagTotal = sum(tagFilter, (el) => el.amount);
		tagAverage = mean(tagFilter, (el) => el.amount);
		tagTopFive = tagFilter.sort((a,b) => b.amount - a.amount).slice(0,5);
	

		tagFilter = tagFilter.map(el => {
			return { x: el.day, y: el.amount }
		});
	} 
</script>

<div class="container">
	<div class="row">
		<div class="col-6"><br />
			{#each tags as tag}
				<button type="button" class="btn btn-outline-secondary btn-sm"
				on:click={() => getTagCalcs(tag)}
				>{tag}</button> &nbsp; &nbsp;
			{/each}
			<br />count: {tagCount}, total: ${tagTotal}, average: ${tagAverage}<br />
			topFive: {#each tagTopFive as top} {top.location}: ${top.amount} {/each}<br />
		</div>



		<div class="col-3">
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
		
		<div class="col-3">
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

<style>
	/* .chart {
		width: 100%;
		max-width: 640px;
		height: calc(100% - 4em);
		min-height: 5000px;
		max-height: 500px;
		margin: 0 auto;
	} */
</style>