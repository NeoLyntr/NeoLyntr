import {
  pgTable,
  varchar,
  timestamp,
  text,
  smallint,
  boolean,
  primaryKey
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', {
    length: 255
  }).primaryKey(),
  discordId: text('discord_id'),
  username: varchar('username', { length: 60 }).notNull(),
  handle: varchar('handle', { length: 32 }).notNull().unique(),
  bio: varchar('bio', { length: 256 }).default('Nothing here yet...'),
  iq: smallint('iq').notNull(),
  verified: boolean('verified').default(false),
  banned: boolean('banned').default(false),
  ban_reason: varchar('ban_reason', { length: 1000 }),
  created_at: timestamp('created_at').defaultNow()
});

export const sessions = pgTable('sessions', {
  id: varchar('id', {
    length: 255
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 255
  })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull()
});

export const followers = pgTable(
  'followers',
  {
    user_id: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    follower_id: text('follower_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.user_id, table.follower_id], name: 'followers_pkey' })
    };
  }
);
