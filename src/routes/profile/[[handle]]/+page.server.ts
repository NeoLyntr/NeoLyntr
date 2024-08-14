import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

import { lucia } from '$lib/server/auth';
import { db } from '@/server/db';
import { users, followers } from '@/server/schema';
import { eq, or, sql } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  const data = await event.parent();

  if (!event.params.handle && !event.locals.user) redirect(302, '/login');
  return {
    ...data,
    profile: db
      .select({
        id: users.id,
        username: users.username,
        handle: users.handle,
        bio: users.bio,
        iq: users.iq,
        verified: users.verified,
        banned: users.banned,
        created_at: users.created_at,
        followers: sql<number>`(SELECT COUNT(*) FROM ${followers} WHERE user_id = ${users.id}) AS followers_count`,
        following: sql<number>`(SELECT COUNT(*) FROM ${followers} WHERE follower_id = ${users.id}) AS following_count`
      })
      .from(users)
      .where(
        or(
          eq(users.handle, event.params.handle?.replace(/^@/, '') ?? null),
          eq(users.id, event.locals.user?.id ?? null)
        )
      )
      .limit(1)
  };
};
