<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { assert } from '$lib/assert';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			console.log('auth state changed');
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	async function createLobby() {
		const res = await fetch('/game/create-lobby');
		const id = await res.text();
		assert(res.ok, 'error creating lobby');
		goto(`/game/${id}`);
	}
</script>

<div class="flex h-80 justify-center">
	<img src="orderly.png" alt="brand" />
</div>
<div class="mt-12 flex justify-center">
	<div class="mb-2">
	</div>
	<button onclick={createLobby} class="btn btn-primary text-2xl"> Create Lobby </button>
</div>
