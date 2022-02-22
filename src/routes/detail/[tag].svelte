<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import { extent, least, mean, sum } from "d3-array";
	import { scaleLinear } from "d3-scale";

	let tagName = $page.params.tag;

	const expensesCol = collection(db, 'expenses');
	const queryTag = query(expensesCol, 
		where("tag", "==", tagName)
	);

	let tagCount = 0, tagTotal = 0, tagAverage = 0;
	let expenses = [];
	let years = [];
	let months = [];
	let days = [];
	let tagTopFive = []; 
	let tagMin = {};

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
		tagCount = expenses.length;
		tagTotal = sum(expenses, d => d.amount);
		tagAverage = mean(expenses, d => d.amount);
		tagTopFive = expenses.sort((a,b) => b.amount - a.amount).slice(0,5);
		tagMin = least(expenses, d => d.amount);
	}
getExpenses();

	const height = 100;
	const width = 600;
	const buffer = 10;
	const axisSpace = 50;
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	$: xExtent = [0,11];
	$: yExtent = extent(expenses, (d) => d.amount);
	$: xScale = scaleLinear().domain(xExtent).range([buffer + axisSpace, width - buffer]);
	$: yScale = scaleLinear().domain(yExtent).range([height - buffer - axisSpace, buffer]);
</script>


<div class="container">

	<div class="row mb-3 mt-3">
		<div class="col-3 d-flex align-items-center">
			<h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
				<button type="button" class="btn btn-{tagMin.tagColor}"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
					<ion-icon name="{tagMin.tag}"></ion-icon>
				</button>
				&nbsp; {tagMin.tag}
			</h5>
		</div>
		<div class="col-6">

			{#each xScale.ticks(10) as tick}
				{tick}, 
			{/each}
			<br />
			{#each yScale.ticks(10) as tick}
				{tick}, 
			{/each}


			<svg {height} {width}>
				<!-- <g transform="translate(0 70)">
					<rect width="50" height="25" fill="red" />
				</g>
				<g transform="translate(51 60)">
					<rect width="50" height="35" fill="red" />
				</g>
				<g transform="translate(102 45)">
					<rect width="50" height="50" fill="red" />
				</g> -->

				<g class='bars' transform="translate(-50 50)">
					{#each months as month}
						{#each expenses.filter(el => el.monthVerbose == month) as expense, i}
							<rect
							x="{xScale(i) + 2}"
							y="{yScale(expense.amount)}"
							width="{50 - 4}"
							height="{yScale(0) - yScale(expense.amount)}"
							></rect>
						{/each}
					{/each}
				</g>

				{#each xScale.ticks(10) as tick}
				<g transform={`translate(${xScale(tick)-30} ${height - 0})`}>
					<!-- <text x="-15" y="-3">{labels[tick]}</text> -->
					<text x="-15" y="-3">xxxxx</text>
					<!-- <line y1="-5" y2="0" stroke="black" /> -->
				</g>
				{/each}

			</svg>

		</div>
		<div class="col-3"></div>
	</div>
	<div class="row mb-3 mt-3">
		<div height="100%" class="col-3">
			<br />
			<b>Total # of Purchases:</b> {tagCount}<br /><br />
			<b>Sum of All Purchases:</b> ${tagTotal.toFixed(2)}<br /><br />
			<b>Average Purchase Amount:</b> ${tagAverage.toFixed(2)}<br /><br />
			<b>Top Five Purchases:</b><br />{#each tagTopFive as top} {top.location}: ${top.amount.toFixed(2)}<br /> {/each}
		</div>
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
							{#each expenses.filter(el => el.monthVerbose == month) as expense}
							<div class="row gx-3">
								<div class="col-1"></div>
								<!-- tag -->
								<div class="col-1 pull-left">
										<button type="button" class="btn btn-{expense.tagColor} btn-sm">
											<ion-icon name="{expense.tag}"></ion-icon>
										</button>
									</div>
								<div class="col-5">
									<p class="ps-2 p-md-0">{expense.month}/{expense.date}: {expense.location}</p>
								</div>
								<div class="col-4 overflow-auto">
									<p class="text-end">${expense.amount}</p>
								</div>
								<div class="col-1"></div>
							</div>
							{/each}
							<div class="row gx-3">
								<div class="col-7"></div>
								<div class="col-4 overflow-auto">
									<p class="text-end">Total: &nbsp; ${sum((expenses.filter(el => el.monthVerbose == month)), el => el.amount)}</p>
								</div>
								<div class="col-1"></div>
							</div>
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

<style>
	svg {
		border: 1px solid #ddd;
		/* width: 100%;
		height: 100px; */
		}
</style>