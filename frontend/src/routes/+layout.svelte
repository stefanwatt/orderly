<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-full h-full min-h-screen bg-ctp-base text-ctp-text">
{@render children()}
</div>
