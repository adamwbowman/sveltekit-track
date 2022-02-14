<script>
	import { formatShortDate } from '$lib/dates';
	export let currentRange;
	export let setRange;
	export let startDate;
	export let endDate;
</script>

<slot {currentRange} {startDate} {endDate} {setRange} >
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="/#">$500</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link {currentRange === 'previousWeek' ? 'active' : ''}" href="/#"
							on:click="{() => setRange('previousWeek')}">Previous Week</a>
					</li>
					<li class="nav-item">
						<a class="nav-link {currentRange === 'currentWeek' ? 'active' : ''}" href="/#"
							on:click="{() => setRange('currentWeek')}">Current Week</a>
					</li>
					<li class="nav-item">
						<a class="nav-link {currentRange === 'analysis' ? 'active' : ''}" href="/analysis"
							on:click="{() => setRange('analysis')}">Analysis</a>
					</li>
				</ul>
				<span class="navbar-text">
					{formatShortDate(startDate)} - {formatShortDate(endDate)}
				</span>
			</div>
		</div>
	</nav>
</slot>