import { OAuth2RequestError } from 'arctic';
import { discord, lucia } from '@/server/auth';
import { dev } from '$app/environment';

import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Actions } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { redirect, fail, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { users } from '@/server/schema';

type AccountInfo = {
  discordId: string;
};

type DiscordUser = {
  id: string;
  username: string;
  global_name: string;
};

function getRedirectUrl(cookies: Parameters<PageServerLoad>[0]['cookies']) {
  const redirect_url = cookies.get('redirect_url');
  if (!redirect_url || !redirect_url.startsWith('/')) return '/';
  return redirect_url ?? '/';
}

export const load: PageServerLoad = async (event) => {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('discord_oauth_state') ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return error(400);
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch('https://discord.com/api/v10/oauth2/@me', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const discordUser: DiscordUser = (await discordUserResponse.json()).user;

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.discordId, discordUser.id))
      .limit(1);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });

      throw redirect(302, getRedirectUrl(event.cookies));
    } else {
      event.cookies.set(
        'tmp_discord',
        JSON.stringify({
          discordId: discordUser.id
        }),
        {
          path: '/',
          httpOnly: true,
          secure: !dev,
          sameSite: 'lax'
        }
      );

      return {
        handle: discordUser.username,
        username: discordUser.global_name
      };
    }
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw error(400);
    }

    throw e;
  }
};

export const actions = {
  default: async ({ cookies, request }) => {
    try {
      const tmp: AccountInfo = JSON.parse(cookies.get('tmp_discord')!);

      const data = await request.formData();
      const username = data.get('username') as string | null;
      const handle = data.get('handle') as string | null;

      // todo get iq

      if (!handle || !username) {
        return fail(400, { message: 'Invalid request - missing fields.' });
      }

      if (handle.length > 32 || username.length > 60) {
        return fail(400, { message: 'Handle (32) or username (60) are over the character limit.' });
      }

      if (handle.length < 1 || username.length < 1) {
        return fail(400, { message: 'Handle or username is under the minimum character limit.' });
      }

      const userId = generateIdFromEntropySize(10);
      const cleanedHandle = handle.replace(/[^0-9a-z_-]/gi, '').toLowerCase();

      await db.insert(users).values({
        id: userId,
        discordId: tmp.discordId,
        username: username.trim(),
        handle: cleanedHandle.trim(),
        iq: 80
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });

      redirect(302, getRedirectUrl(cookies));
    } catch (e) {
      console.log(e);
      redirect(302, '/login');
    }
  }
} satisfies Actions;
