<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { assert } from '$lib/assert';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	let { session, supabase } = $derived(data);
	let name = $state('');
	let player = $state(data.player);
	async function setName(e: SubmitEvent) {
		e.preventDefault();
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
		player.name = name;
	}
</script>

{#if !player.name}
  <h1>Where not sure what to call you...</h1>
	<form onsubmit={setName}>
		<label class="form-control block w-full max-w-xs">
			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input
				bind:value={name}
				type="text"
				placeholder="John Doe"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</form>
{:else}
	{@render children()}
{/if}
