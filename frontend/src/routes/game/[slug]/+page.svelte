<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<h1 class="mt-4 text-center text-3xl">{data.admin.name}'s Lobby</h1>
<div>
	<h2 class="text-xl">
		Players:
	</h2>
	{#each data.players as item, i}
		<div>
			<span class="mr-2">{i + 1}.</span>
			<span>
				{item.player.name}
			</span>
			{#if data.admin.id == item.player.id}
				(Admin)
			{/if}
		</div>
	{/each}
</div>
