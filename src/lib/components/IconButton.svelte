<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';
  import { Button, type Props } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

  type $$Props = Props & {
    icon?: ComponentType<SvelteComponent> | undefined;
    iconSize?: number;
    color?: string | undefined;
    strokeWidth?: number;
  };

  let className: $$Props['class'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
  export let iconSize: $$Props['iconSize'] = 24;
  export let builders: $$Props['builders'] = [];
  export let icon: $$Props['icon'] = undefined;
  export let color: $$Props['color'] = undefined;
  export let strokeWidth: $$Props['strokeWidth'] = 2.5;
  export { className as class };
</script>

<Button
  class={cn('flex flex-row gap-2', className)}
  {variant}
  {size}
  {builders}
  {...$$restProps}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
>
  {#if icon}
    <svelte:component
      this={icon}
      style="color: {color}; font-size: {iconSize}px; --svg-stroke-width: {strokeWidth};"
    />
  {/if}
  <slot />
</Button>

<style>
  :global(svg > *) {
    stroke-width: var(--svg-stroke-width, 2);
  }
</style>
