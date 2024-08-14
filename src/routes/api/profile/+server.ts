import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { db } from '@/server/db';
import { users, followers } from '@/server/schema';
import { eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async (event) => {
  const handle = event.url.searchParams.get('handle');
  const id = event.url.searchParams.get('id');

  if (!handle && !id) {
    return json({ error: 'Missing user handle or id.' }, { status: 400 });
  }

  return json((await db
      .select({
        id: users.id,
        username: users.username,
        handle: users.handle,
        bio: users.bio,
        iq: users.iq,
        verified: users.verified,
        banned: users.banned,
        created_at: users.created_at,
        followers: sql<number>`(SELECT COUNT(*) FROM ${followers}WHERE user_id = ${users.id}) AS followers_count`,
        following: sql<number>`(SELECT COUNT(*) FROM ${followers}WHERE follower_id = ${users.id}) AS following_count`
      })
      .from(users)
      .where(
        handle
          ? eq(users.handle, handle)
          : eq(users.id, id)
      )
      .limit(1))[0])
}
