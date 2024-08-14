<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { cn } from '$lib/utils';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import OutlineButton from '$lib/components/OutlineButton.svelte';
  import Verified from 'virtual:icons/lucide/verified';
  import Brain from 'virtual:icons/lucide/brain';
  import CalendarDays from 'virtual:icons/lucide/calendar-days';
  import dayjs from '@/dayjs';

  let className: string | undefined = undefined;
  export let small: boolean = false;
  export let profile:
    | {
        id: string;
        username: string;
        handle: string;
        bio: string;
        iq: number;
        verified: boolean;
        created_at: string;
        followers: number;
        following: number;
      }
    | undefined;
  export { className as class };
</script>

{#if profile}
  <div
    class={cn(
      'grid grid-cols-[auto,_minmax(0,_1fr)] gap-x-4 gap-y-2 p-2 bg-secondary/70 rounded-2xl',
      className
    )}
  >
    <Avatar.Root
      class={cn(
        !small ? 'w-32 h-32 text-3xl' : 'w-16 h-16 text-lg',
        'border-2 border-muted-foreground/70 p-1'
      )}
    >
      <Avatar.Image src="" alt={'@' + profile.handle} />
      <Avatar.Fallback
        >{profile.username.match(/[A-Z\-]/g)?.join('') ?? profile.username[0]}</Avatar.Fallback
      >
    </Avatar.Root>
    <div
      class="flex flex-col gap-2 max-w-[250px] md:max-w-full overflow-hidden truncate justify-center"
    >
      <span class={cn(small ? 'text-lg' : 'text-2xl', 'flex flex-row gap-1 font-bold')}>
        {profile.username}
        {#if profile.verified}
          <Verified />
        {/if}
      </span>
      <span class={cn(!small && 'text-lg', 'text-muted-foreground font-bold')}
        >@{profile.handle}</span
      >

      <div class="col-span-2" class:hidden={small}>
        {#if profile.id === $page.data.user?.id}
          <OutlineButton class="px-8">Edit Profile</OutlineButton>
        {:else if $page.data.user}
          <OutlineButton class="px-8">Follow</OutlineButton>
        {:else}
          <OutlineButton
            on:click={() => goto(`/login?redirect_url=${'/profile/@' + profile.handle}`)}
            >Login to Follow!</OutlineButton
          >
        {/if}

        <slot />
      </div>
    </div>

    {#if !small}
      <div class="col-span-2 flex flex-col gap-2">
        <div class="flex flex-row gap-3">
          <button>{profile.followers} followers</button>
          <button>{profile.following} following</button>
        </div>

        <div class="bg-border rounded-r-lg border-l-4 border-l-primary/70 p-4 flex flex-col gap-2">
          <span class="font-bold text-lg">About Me</span>
          <div class="flex flex-col gap-1">
            <span>{profile.bio}</span>
            <div class="flex flex-row justify-between gap-1 w-full">
              <Badge class="flex flex-row gap-1 items-center text-base">
                <Brain class="w-6 h-6" />
                {profile.iq}
              </Badge>
              <Badge class="flex flex-row gap-1 items-center text-base">
                <CalendarDays class="w-6 h-6" />
                Joined:
                {dayjs(profile.created_at).tz().format('DD/MM/YYYY')}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
