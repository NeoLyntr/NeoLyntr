import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
  const data = await event.parent();

  if (!event.params.handle && !event.locals.user) {
    throw redirect(302, '/login');
  }

  return {
    ...data,
    profile: event.fetch('/api/profile' + (event.params.handle 
          ? '?handle=' + event.params.handle.replace(/^@/, '')
          : '?id=' + event.locals.user!.id)).then((res) => res.json())
  };
};
