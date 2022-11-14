<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { scrollTop } from '../utils/scroll.utils';

	afterNavigate(() => {
		scrollTop();
	});
</script>
