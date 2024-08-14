import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { discord } from '@/server/auth';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify']
  });

  event.cookies.set('discord_oauth_state', state, {
    path: '/',
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  event.cookies.set('redirect_url', event.url.searchParams.get('redirect_url') ?? '/', {
    path: '/',
    secure: !dev,
    httpOnly: false,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  redirect(302, url.toString());
}
