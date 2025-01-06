<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-full min-h-screen w-full bg-ctp-base text-ctp-text">
	<div class="navbar bg-base-300">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl"> 
				<img class="h-full" src="orderly.png" alt="brand" />
				Orderly
			</a>
		</div>
		<div class="flex-none">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-5 w-5 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					></path>
				</svg>
			</button>
		</div>
	</div>
	{@render children()}
</div>
