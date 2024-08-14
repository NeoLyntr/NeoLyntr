<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte';
  import LogosDiscordIcon from 'virtual:icons/logos/discord-icon';
  import { Label } from '$lib/components/ui/label';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { PUBLIC_BRAND } from '$env/static/public';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let bannedDialog = false;
</script>

<AlertDialog.Root bind:open={bannedDialog}>
  <AlertDialog.Trigger />
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>You are banned from {PUBLIC_BRAND}</AlertDialog.Title>
      <AlertDialog.Description class="flex flex-col gap-2">
        <span
          >You were banned from {PUBLIC_BRAND} because you violated our
          <a href="/tos" target="_blank">terms of service</a></span
        >
        <span class="text-lg">Ban Reason:</span>
        <div class="whitespace-pre-wrap bg-border p-2 rounded-3xl">{$page.data.banned.reason}</div>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Action>Ok</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<div class="flex flex-col gap-2 justify-center items-center w-full h-dvh">
  <div class="flex flex-row items-center gap-4">
    <img src="/logo.svg" alt={PUBLIC_BRAND} class="w-[25vmin] h-[25vmin]" />
    <span class="text-[13vmin] select-none">{PUBLIC_BRAND}</span>
  </div>

  <Label class="text-[5vmin]">Please log in to begin.</Label>

  <IconButton
    icon={LogosDiscordIcon}
    iconSize={16}
    on:click={() => {
      if ($page.data.banned) {
        //toast("Sorry you can not logged in as you are banned for: " + $page.data.banned.reason);
        bannedDialog = true;
      } else {
        goto(`/login/discord?${$page.url.searchParams}`);
      }
    }}>Login With Discord</IconButton
  >
</div>
