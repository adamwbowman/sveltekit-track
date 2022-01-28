<script>
	import {page} from '$app/stores';
	import { db } from '../../lib/firebase.js'
	import { collection, query, orderBy, getDocs, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore"; 

	let expenses = [];

	// firestore entire get collection
	const expensesCol = collection(db, 'expenses');
	const queryAll = query(expensesCol,
		orderBy("createdAt", "asc")
	);

	// listener for collection reactivity
	const listenCol = onSnapshot(queryAll, (querySnapshot) => {
		expenses = querySnapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		});
	console.log(expenses);
	});
</script>

<section>
	{#each expenses.filter(el => el.tag == $page.params.tag) as expense}
		<p><a href="/detail/{expense.tag}">{expense.tag}</a>{expense.location}</p>
	{/each}
</section>