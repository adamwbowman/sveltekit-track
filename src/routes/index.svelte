<script>
	import { db } from '$lib/firebase'
	import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; 
	import { currentWeek, previousWeek } from '$lib/dates';
	import NavBar from "./NavBar.svelte";
	import Expenses from "./Expenses.svelte";
	import Detail from "./Detail.svelte";

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
	});

	let currentRange = "currentWeek";
	let theWeek = currentWeek;

	function setRange(range) {
		resetSubTotal();
		currentRange = range;
		if (range == "previousWeek") {
			theWeek = previousWeek;
		} else {
			theWeek = currentWeek;
		}
	}
	$: startDate = new Date(theWeek.start);
	$: endDate = new Date(theWeek.end);

	let subTotal = 0;

	function getSubTotal(amount) {
		if (subTotal == 0) {
			subTotal = parseFloat((500-amount).toFixed(2));
		} else {
			subTotal = parseFloat((subTotal-amount).toFixed(2));
		}
		return subTotal;
	}

	async function deleteExpense(index) {
		resetSubTotal();
		await deleteDoc(doc(db, "expenses", index));
	}

	function resetSubTotal(){ subTotal = 0; }

	let tag = "testable";
</script>

<NavBar {currentRange} {startDate} {endDate} {setRange} />
<br /><br />

<Expenses {expenses} {startDate} {endDate} {getSubTotal} {deleteExpense} />

<Detail {tag} {expenses} />