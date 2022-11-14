<script lang="ts">
	import { HREF_VOID } from '$lib/core/constants';
	import { getContext } from 'svelte';
	import Filters from '../dialog/filters.svelte';

	const { open } = getContext('simple-modal');

	function handleFilters(article: any) {
		open(Filters, { article });
	}
</script>

<div class="search-header mt-4 mb-4">
	<div class="search-input">
		<div class="input-group mb-3">
			<input
				type="text"
				class="form-control"
				placeholder="Search anything"
				aria-label="Search anything"
				aria-describedby="search-anything"
			/>
			<button type="button" class="btn btn--primary btn-air text-left" style="width: 117px" on:click={handleFilters}>
				Filters
			</button>
		</div>
	</div>

	<div class="location-input">
		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Location"
				aria-label="Text input with segmented dropdown button"
			/>
			<button type="button" class="btn btn--primary btn-air text-left">Location</button>
			<button
				type="button"
				class="btn btn--primary dropdown-toggle dropdown-toggle-split"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span class="visually-hidden">Toggle Dropdown</span>
			</button>
			<ul class="dropdown-menu dropdown-menu-end">
				<li><a class="dropdown-item" href={HREF_VOID}>Action</a></li>
				<li><a class="dropdown-item" href={HREF_VOID}>Another action</a></li>
				<li><a class="dropdown-item" href={HREF_VOID}>Something else here</a></li>
				<li><hr class="dropdown-divider" /></li>
				<li><a class="dropdown-item" href={HREF_VOID}>Separated link</a></li>
			</ul>
		</div>
	</div>
</div>
