<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';
  import IconButton from './IconButton.svelte';
  import { type Props } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

  let className: Props['class'] = undefined;
  export let variant: Props['variant'] = 'default';
  export let size: Props['size'] = 'default';
  export let iconSize: number = 24;
  export let builders: Props['builders'] = [];
  export let icon: ComponentType<SvelteComponent> | undefined = undefined;
  export let color: string | undefined = undefined;
  export let strokeWidth: number = 2.5;
  export let popover: string | undefined = undefined;
  export let small: boolean = false;
  export let outline: boolean = true;
  export { className as class };
</script>

{#if popover}
  <svelte:self
    class={className}
    {variant}
    {builders}
    {iconSize}
    {size}
    {icon}
    {color}
    {strokeWidth}
    {outline}
    {...$$restProps}
    popover={null}
    on:click
    on:mouseenter
    on:mouseleave
    on:keydown
  />
{:else}
  <IconButton
    class={cn(
      outline && 'border-2 border-solid border-primary p-1.5',
      'text-primary-foreground font-bold',
      className
    )}
    {variant}
    {builders}
    {iconSize}
    {size}
    {icon}
    {color}
    {strokeWidth}
    {...$$restProps}
    on:click
    on:mouseenter
    on:mouseleave
    on:keydown
  >
    <span class={cn('hidden', !small && 'block', 'md:block')}>
      <slot />
    </span>
  </IconButton>
{/if}
