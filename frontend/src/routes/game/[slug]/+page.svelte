<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-3xl text-center mt-4">Lobby</h1>
{data.id}
