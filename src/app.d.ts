import 'unplugin-icons/types/svelte';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
      banned: { reason: string | null } | null;
    }
    interface PageData {
      user?: import('lucia').User | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
