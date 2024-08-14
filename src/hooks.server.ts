import { lucia } from '@/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    event.locals.banned = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (user && user.banned) {
    event.locals.user = null;
    event.locals.session = null;
    event.locals.banned = { reason: user.ban_reason };
    return resolve(event);
  }

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  event.locals.banned = null;
  return resolve(event);
};
