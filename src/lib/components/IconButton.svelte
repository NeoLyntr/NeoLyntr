<script lang="ts">
  import { Button, type Props } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

  type $$Props = Props & {
    icon?: any | undefined;
    color?: string | undefined;
    strokeWidth?: number;
  };

  let className: $$Props['class'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
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
    <svelte:component this={icon} {strokeWidth} style="color: {color};" />
  {/if}
  <slot />
</Button>
