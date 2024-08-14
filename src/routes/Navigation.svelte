<script lang="ts">
  import OutlineButton from '$lib/components/OutlineButton.svelte';
  import House from 'virtual:icons/lucide/house';
  import Search from 'virtual:icons/lucide/search';
  import Bell from 'virtual:icons/lucide/bell';
  import User from 'virtual:icons/lucide/user';
  import Plus from 'virtual:icons/lucide/plus';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PUBLIC_BRAND } from '$env/static/public';

  let navItems = [
    { icon: House, label: 'Home', page: '/', className: 'hidden md:flex' },
    { icon: Search, label: 'Search', page: '/search' },
    { icon: Bell, label: 'Notification', page: '/notifications' },
    { icon: User, label: 'Profile', page: '/profile' }
  ];
</script>

<div class="flex flex-col w-full gap-1">
  <button class="aspect-square w-[15vmin] hidden md:block" on:click={() => goto('/')}>
    <img src="/logo.svg" alt={PUBLIC_BRAND} />
  </button>

  <div
    class="flex flex-row w-full md:min-w-[250px] md:h-fit md:flex-col gap-1 md:items-start p-2.5 bg-border rounded-[12px]"
  >
    <button class="flex items-center justify-center flex-1 md:hidden" on:click={() => goto('/')}>
      <img src="/logo.svg" alt={PUBLIC_BRAND} class="max-h-6" />
    </button>

    {#each navItems as item}
      <OutlineButton
        variant="ghost"
        class="p-4 text-lg flex-1 md:flex-initial md:w-full md:justify-start text-primary {item.className}"
        icon={item.icon}
        small={true}
        outline={false}
        iconSize={20}
        on:click={() => goto(item.page)}
      >
        {item.label}
      </OutlineButton>
    {/each}
  </div>
</div>

<OutlineButton class="h-full aspect-square text-primary-foreground md:hidden">
  <Plus class="text-lg" />
</OutlineButton>
