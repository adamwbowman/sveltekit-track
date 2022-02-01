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

	getExpensesByTag();

	async function getExpensesByTag() {
		const querySnapshot = await getDocs(queryTag);
		expensesByTag = querySnapshot.docs.map(doc => doc.data());
		console.log(expensesByTag);
		years = expensesByTag.map(el => el.year);
		years = [...new Set(years)];
		months = expensesByTag.map(el => el.monthShort);
		months = [...new Set(months)];
		days = expensesByTag.map(el => el.dayShort);
		days = [...new Set(days)];
		console.log(years);
		console.log(months);
		console.log(days);
	}
</script>

<h1>{ tagName }</h1>

<div class="container">
</div>