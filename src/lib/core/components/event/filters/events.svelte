<script>
	import Toggle from './toggle.svelte';
</script>

<div class="row" style="width: 100%">
	<div class="col-12">
		<h2>Filters</h2>
		<ul class="nav nav-1 flex-column">
			<li class="nav-item">
				<Toggle />
			</li>
		</ul>
		<ul class="nav nav-2 flex-column mt-3">
			<li class="nav-item">
				<a class="nav-link" href="#">Price</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Date</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Category</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Format</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Language</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Currency</a>
			</li>
		</ul>
	</div>
</div>

<style>
	.nav-2 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
