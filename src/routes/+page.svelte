<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
</script>

<div class="grid grid-rows-[auto,_minmax(0,_1fr)] md:w-[600px] h-full p-2">
  <div>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
  </div>

  <div>
    <div class="flex flex-col justify-end h-full">
      {JSON.stringify($page.data.user, null, 2)}
      <form
        method="post"
        use:enhance={() => {
          return async ({ result, update }) => {
            await update();
            if (result.status >= 400) {
              toast(result.data.message);
            }
          };
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  </div>
</div>
