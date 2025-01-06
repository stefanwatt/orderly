<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { assert } from '$lib/assert';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (_, newSession) => {
			console.log('auth state changed');
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	async function createLobby() {
		let user_id = session?.user?.id;
		if (!session) {
			const { data, error } = await supabase.auth.signInAnonymously();
			assert(!error && !!data.user, 'error signing in anonymously');
			user_id = data.user!.id;
		}
    const {data,error} = await supabase.functions.invoke("create-lobby",{})
    assert(!error && data.id, 'error creating lobby');
		goto(`/game/${data.id}`);
	}
</script>

<div class="mt-12 flex justify-center">
	<div class="mb-2"></div>
	<button onclick={createLobby} class="btn btn-primary text-2xl">Play</button>
</div>
