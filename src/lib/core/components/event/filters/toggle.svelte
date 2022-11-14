<script lang="ts">
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';

	let options = [
		{
			value: 1,
			content: `Events from organizers I follow`,
			disabled: false
		},
		{
			value: 2,
			content: `Online events`,
			disabled: false
		}
	];
	let selected: any[] = [];
</script>

{#each options as option}
	<div class="check-group">
		<span class="mt-2">{option.content}{option.disabled ? ' (disabled)' : ''}</span>
		<span>
			<FormField align="end">
				<Switch
					icons={false}
					bind:group={selected}
					value={option.value}
					disabled={option.disabled}
				/>
				<!-- <span slot="label">{option.content}{option.disabled ? ' (disabled)' : ''}</span> -->
			</FormField>
		</span>
	</div>
{/each}

<style>
	.check-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding-right: 0px;
		margin-right: -69px;
	}
</style>
