<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { assert } from '$lib/assert';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { session, supabase } = $derived(data);
	let name = $state('');

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
		assert(!!name, 'name cannot be empty');
		let user_id = session?.user?.id;
		if (!session) {
			const { data, error } = await supabase.auth.signInAnonymously();
			assert(!error && !!data.user, 'error signing in anonymously');
			user_id = data.user!.id;
		}
		console.log(`updating name of player with id {${user_id}} to ${name}`);
		const { data, error } = await supabase
			.from('players')
			.update({ name })
			.eq('id', user_id)
			.select();
		console.log('updated user: ', data);
		assert(!error, 'error updating player name');
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
		<label class="form-control w-full max-w-xs block">
			<div class="label">
				<span class="label-text">What is your name?</span>
			</div>
			<input
				bind:value={name}
				type="text"
				placeholder="John Doe"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>
	<button onclick={createLobby} class="btn btn-primary text-2xl"> Create Lobby </button>
</div>
