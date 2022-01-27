
<!-- src/routes/__layout.svelte -->

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
</nav> -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/#">$500</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" href="/about">About</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/settings">Settings</a>
				</li>
					<!-- <a class="nav-link {currentRange === 'previous' ? 'active' : ''}" href="/#" 
						on:click="{() => currentRange = 'previous'}" 
						on:click="{() => filterExpenses(2)}"
						>Previous Week</a>
				</li> -->
				<!-- <li class="nav-item">
					<a class="nav-link {currentRange === 'current' ? 'active' : ''}" href="/#" 
						on:click="{() => currentRange = 'current'}" 
						on:click="{() => filterExpenses(1)}"
					>Current Week</a>
				</li> -->
			</ul>
			<!-- <span class="navbar-text">
				{formatShortDate(startDate)} - {formatShortDate(endDate)}
			</span> -->
		</div>
	</div>
</nav>

<slot></slot>