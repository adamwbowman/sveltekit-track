<script>
	import { db } from '$lib/firebase'
	import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; 
	import { fly } from 'svelte/transition';
	import { currentWeek, formatShortDate, previousWeek } from '$lib/dates';
	import Detail from "./Detail.svelte";

	let Total = 500;
	let currentRange = "current";

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

	let theWeek = currentWeek;
	let subTotal = 0;

	function setRange(range) {
		resetSubTotal();
		currentRange = range;
		if (range == "previous") {
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

	let tag = "test";
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/#">${Total}</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link {currentRange === 'previous' ? 'active' : ''}" href="/#"
						on:click="{() => setRange('previous')}">Previous Week</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {currentRange === 'current' ? 'active' : ''}" href="/#"
						on:click="{() => setRange('current')}">Current Week</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {currentRange === 'analysis' ? 'active' : ''}" href="/#"
						on:click="{() => setRange('analysis')}">Analysis</a>
				</li>
			</ul>
			<span class="navbar-text">
				{formatShortDate(startDate)} - {formatShortDate(endDate)}
			</span>
		</div>
	</div>
</nav>

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

<Detail {tag} />