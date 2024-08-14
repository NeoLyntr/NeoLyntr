<div class="flex h-full animate-pulse">
  <div class="m-auto">
    <img src="/logo.svg" alt="Loading" class="w-[45vmin] object-contain aspect-square" />
  </div>
</div>

<style>
  @keyframes custom-pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .animate-pulse {
    animation: custom-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
