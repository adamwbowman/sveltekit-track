<script>

let Total = 500;
</script>

<div>
	<a href="/previousWeek">previous week</a> | 
	<a href="/">current week</a> |
	<a href="/analysis">analysis</a>
</div>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/#">${Total}</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" href="/previousWeek">Previous Week</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active" href="/">Current Week</a>
				</li>
			</ul>
			<span class="navbar-text">
				formattedStartDate - formattedEndDate
				<!-- {formatShortDate(startDate)} - {formatShortDate(endDate)} -->
			</span>
		</div>
	</div>
</nav>

<slot></slot>