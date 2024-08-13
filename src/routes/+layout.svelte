<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { page } from '$app/stores';
</script>

<ModeWatcher />

{#if !$page.data.hideNavigation}{/if}

<slot />
