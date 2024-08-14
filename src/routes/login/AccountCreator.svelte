<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
</script>

<form
  method="POST"
  use:enhance={() => {
    return async ({ result, update }) => {
      await update();
      if (result.status >= 400) {
        toast('Error ' + result.status + ': ' + result.data.message);
      }
    };
  }}
>
  <div class="flex flex-col gap-1.5">
    <Label for="username">Nickname</Label>
    <Input
      name="username"
      id="username"
      placeholder={$page.data.username}
      value={$page.data.username ?? ''}
      class="border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
    />
    <p class="text-sm text-muted-foreground">Enter your desired nickname (max. 60 char.)</p>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="handle">Username</Label>
    <Input
      name="handle"
      id="handle"
      placeholder={'@' + $page.data.handle}
      value={$page.data.handle ? '@' + $page.data.handle : ''}
      class="border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
    />
    <p class="text-sm text-muted-foreground">Enter your permanent username (max. 32 char.)</p>
    <p class="text-xs text-muted-foreground">
      Only alphabetical lowercase letters (a-z) work, including '-'.
    </p>
  </div>

  <IconButton type="submit">Submit</IconButton>
</form>
