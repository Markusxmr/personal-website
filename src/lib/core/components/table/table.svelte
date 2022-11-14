<script lang="ts">
	import Handsontable from 'handsontable';
	import 'handsontable/dist/handsontable.min.css';
	import { debounce } from 'lodash';
	import 'pikaday/css/pikaday.css';
	import { onMount } from 'svelte';

	import { data } from './constants';
	import { progressBarRenderer, starsRenderer } from './custom-renderers';

	import { alignHeaders, drawCheckboxInRowHeaders, addClassesToRows, changeCheckboxCell } from './hooks-callbacks';
	import { create, find, remove, update } from './services';

	let search = '';
	const _debounce = {
		data() {
			return { name: '' };
		},

		methods: {
			handleInput: debounce(async function (event) {
				// getCustomers();
			}, 300)
		}
	};

	onMount(() => {
		const example = document.getElementById('table');
		// @ts-ignore
		new Handsontable(example, {
			data,
			height: '70vh',
			colWidths: [140, 126, 192, 100, 100, 90, 90, 110, 97],
			colHeaders: ['Company name', 'Country', 'Name', 'Sell date', 'Order ID', 'In stock', 'Qty', 'Progress', 'Rating'],
			columns: [
				{ data: 1, type: 'text' },
				{ data: 2, type: 'text' },
				{ data: 3, type: 'text' },
				{
					data: 4,
					type: 'date',
					allowInvalid: false
				},
				{ data: 5, type: 'text' },
				{
					data: 6,
					type: 'checkbox',
					className: 'htCenter'
				},
				{
					data: 7,
					type: 'numeric'
				},
				{
					data: 8,
					renderer: progressBarRenderer,
					readOnly: true,
					className: 'htMiddle'
				},
				{
					data: 9,
					renderer: starsRenderer,
					readOnly: true,
					className: 'star htCenter'
				}
			],
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true
			},
			collapsibleColumns: true,
			contextMenu: true,
			filters: true,
			multiColumnSorting: true,
			nestedRows: true,
			manualColumnResize: true,
			manualRowResize: true,
			rowHeaders: true,
			afterChange: function (changes, source) {
				if (!changes) return;

				for (const change of changes) {
					let [index, column, prevVal, newVal] = change ?? [];
					if (source === 'loadData') {
						return; // don't save this change
					}
					let item: Handsontable.RowObject = {
						...(data[index]?.data ?? data[index]),
						[column]: newVal
					};

					if (item?.id) update(item);
					if (!item?.id) create(item).then(() => find());
				}
			},
			beforeRemoveRow: function (
				index: number,
				amount: number,
				physicalRows: number[],
				source: Handsontable.ChangeSource
			) {
				const promptVal = confirm(`Izbrisati ${amount} ${amount === 1 ? 'stupac' : 'stupca'}?`);
				if (!promptVal) return;

				for (const row of physicalRows) {
					let item: Handsontable.RowObject = data[row];

					if (item?.id)
						remove(item?.id).then(() => {
							if (row + 1 === amount) {
								find();
							}
						});
				}
			},
			afterGetColHeader: alignHeaders,
			afterGetRowHeader: drawCheckboxInRowHeaders,
			afterOnCellMouseDown: changeCheckboxCell,
			beforeRenderer: addClassesToRows,
			licenseKey: 'non-commercial-and-evaluation'
		});
	});
</script>

<div>
	<form class="d-flex" style="margin-top: 21px" on:submit|preventDefault={() => {}}>
		<input
			class="form-control me-2"
			type="search"
			placeholder="Pretraži"
			aria-label="Search"
			on:input={_debounce.methods.handleInput}
			bind:value={search}
		/>
	</form>

	<div id="table" />

	{#if !data}
		<h3 class="text-center">Nema Podataka</h3>
	{/if}
</div>
