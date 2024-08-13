<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte';
  import LogosDiscordIcon from 'virtual:icons/logos/discord-icon';
  import { Label } from '$lib/components/ui/label';
  import { PUBLIC_BRAND } from '$env/static/public';
  import { goto } from '$app/navigation';
</script>

<div class="flex flex-col gap-2 justify-center items-center w-full h-dvh">
  <div class="flex flex-row items-center gap-4">
    <img src="/logo.svg" alt={PUBLIC_BRAND} class="w-[25vmin] h-[25vmin]" />
    <span class="text-[13vmin] select-none">{PUBLIC_BRAND}</span>
  </div>

  <Label class="text-[5vmin]">Please log in to begin.</Label>

  <IconButton icon={LogosDiscordIcon} on:click={() => goto('/login/discord')}
    >Login With Discord</IconButton
  >
</div>
