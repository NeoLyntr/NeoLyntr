import { Lucia } from 'lucia';
import { Discord } from 'arctic';
import { dev } from '$app/environment';
import { users, sessions } from '@/server/schema';
import { db } from '@/server/db';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL } from '$env/static/private';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const discord = new Discord(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    console.log(attributes);
    return {
      discordId: attributes.discordId,
      username: attributes.username,
      handle: attributes.handle,
      bio: attributes.bio,
      iq: attributes.iq,
      verified: attributes.verified,
      banned: attributes.banned,
      created_at: attributes.created_at
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type UserSelect = typeof users.$inferSelect;

interface DatabaseUserAttributes extends UserSelect {
  discordId: string;
}
