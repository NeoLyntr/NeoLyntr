<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';
  import IconButton from './IconButton.svelte';
  import { type Props } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

  type $$Props = Props & {
    icon?: ComponentType<SvelteComponent> | undefined;
    iconSize?: number;
    color?: string | undefined;
    strokeWidth?: number;
    popover?: string | null;
    small?: boolean;
    outline?: boolean;
  };

  let className: $$Props['class'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
  export let iconSize: $$Props['iconSize'] = 24;
  export let builders: $$Props['builders'] = [];
  export let icon: $$Props['icon'] = undefined;
  export let color: $$Props['color'] = undefined;
  export let strokeWidth: $$Props['strokeWidth'] = 2.5;
  export let popover: $$Props['popover'] = null;
  export let small: $$Props['small'] = false;
  export let outline: $$Props['small'] = true;
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
