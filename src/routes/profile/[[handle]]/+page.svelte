<script lang="ts">
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { page } from '$app/stores';
</script>

{#await $page.data.profile}
  <LoadingSpinner />
{:then profile}
  {#if profile.banned}
    <span>This profile is banned.</span>
  {:else}
    <div
      class="flex flex-col p-2 w-full md:min-w-[600px] md:max-w-[600px] h-full overflow-y-auto overflow-x-hidden"
    >
      <ProfileCard {profile} class="w-full rounded-b-none" />
      <div class="bg-border w-full h-[1px] mb-4"></div>
    </div>
  {/if}
{:catch error}
  {error.message}
{/await}
