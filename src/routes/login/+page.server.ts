import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const data = await event.parent();

  if (event.locals.user) redirect(302, '/');
  return data;
};
