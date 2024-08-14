<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="grid grid-rows-[auto,_minmax(0,_1fr),_auto] md:w-[600px] h-full p-2">
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

  <form method="post" use:enhance>
    <Button type="submit">Sign out</Button>
  </form>
</div>
