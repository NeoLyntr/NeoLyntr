import type { PageLoad } from './$types';
import { PUBLIC_BRAND } from '$env/static/public';

export const load: PageLoad = async ({ parent, data }) => {
  await parent();

  const profile = await data.profile;

  return {
    ...data,
    seo: {
      title: profile ? `${profile.username} (@${profile.handle}) |  🧠: ${profile.iq}` : 'Profile not found | ' + PUBLIC_BRAND,
      description: profile ? profile.bio : null
    }
  };
};
