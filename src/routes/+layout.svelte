<script lang="ts">
  import '@fontsource/lexend/latin.css';
  import '../app.css';

  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { page } from '$app/stores';
  import Navigation from './Navigation.svelte';
  import { PUBLIC_BRAND } from '$env/static/public';
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

<svelte:head>
  <title>{$page.data?.seo?.title ?? PUBLIC_BRAND}</title>
  <meta property="og:title" content="{$page.data?.seo?.title ?? PUBLIC_BRAND}" />
  <meta property="og:description" content="{$page.data?.seo?.description}" />
  <meta name="description" content="{$page.data?.seo?.description}" />
  <meta property="og:type" content="website" />
</svelte:head>
