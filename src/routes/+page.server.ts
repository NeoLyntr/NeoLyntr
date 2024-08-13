import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
  const data = await event.parent();

  if (!event.locals.user) redirect(302, '/login');
  return data;
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }

    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    redirect(302, '/login');
  }
};
