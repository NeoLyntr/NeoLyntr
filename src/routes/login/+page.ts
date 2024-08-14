import type { PageLoad } from './$types';
import { PUBLIC_BRAND } from '$env/static/public';

export const load: PageLoad = async ({ parent, data }) => {
  await parent();

  return {
    ...data,
    hideNavigation: true,
    seo: {
      title: 'Login | ' + PUBLIC_BRAND,
      description: 'Login into ' + PUBLIC_BRAND + '. ' + PUBLIC_BRAND +  ' is a micro-blogging social media with an IQ test.'
    }
  };
};
