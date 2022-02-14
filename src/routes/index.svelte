<script>
	import { db } from '$lib/firebase'
	import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; 
	import { currentWeek, previousWeek } from '$lib/dates';
	import { fly } from 'svelte/transition';
	import Detail from "./Detail.svelte";
	import NavBar from "./NavBar.svelte";

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

	let subTotal = 0;
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

<NavBar {currentRange} {setRange} {startDate} {endDate} />

<br /><br />

<div class="container">
	{#each expenses.filter(el => {var dbDate = el.createdAt.toDate(); return (dbDate >= startDate && dbDate <= endDate)}) as expense}
		<div class="row gx-3" 
			in:fly="{{ y: 200, duration: 2000 }}"
		>
			<div class="col-1 col-lg-3"></div>
			<!-- tag -->
			<div class="col-1 pull-left">
					<button type="button" class="btn btn-{expense.tagColor} btn-sm">
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
	{/each}
</div>

<Detail {tag} {expenses} />