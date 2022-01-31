<script>
	import { page } from '$app/stores';

	let Total = 500;
	let urlPath = $page.url.pathname;
	console.log("layoutload");
	console.log(urlPath);
let currentRange = "current";
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
					<a class="nav-link {currentRange === 'previous' ? 'active' : ''}" href="/previousWeek"
						on:click="{() => currentRange = 'previous'}" 
					>Previous Week</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {currentRange === 'current' ? 'active' : ''}" href="/"
						on:click="{() => currentRange = 'current'}" 
					>Current Week</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<slot></slot>