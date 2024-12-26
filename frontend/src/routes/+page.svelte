<script lang="ts">
	import { goto } from "$app/navigation";

	function assert(predicate: boolean, message: string){
		if (predicate) return
		throw new Error(message)
	}

  async function createLobby(){
    const res = await fetch("/api/functions/v1/create-lobby")
    const lobby = await res.json()
		assert(lobby.id, "something went wrong creating the lobby")
		goto(`/game/${lobby.id}`)
  }
</script>

<div class="flex justify-center h-80">
<img src="orderly.png" alt="brand"/>
</div>
<div class="mt-12 flex justify-center">
	<form>
		<div class="mb-2">
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">What is your name?</span>
				</div>
				<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
			</label>
		</div>
		<button onclick={createLobby} class="btn btn-primary text-2xl"> Create Lobby </button>
	</form>
</div>
