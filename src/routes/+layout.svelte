<script lang="ts">
  import '@fontsource/lexend/latin.css';
  import '../app.css';

  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { page } from '$app/stores';
  import Navigation from './Navigation.svelte';
</script>

<ModeWatcher />
<Toaster />

<div class="grid grid-rows-[minmax(0,_1fr),_auto] md:flex h-dvh w-full">
  {#if !$page.data.hideNavigation}
    <div
      class="row-start-2 p-2 flex flex-row gap-2 border-border border-t md:border-t-0 md:border-r"
    >
      <Navigation />
    </div>
  {/if}

  <div class="row-start-1 flex-1">
    <slot />
  </div>
</div>
