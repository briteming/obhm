const CONFIG = require('./config');

export default {
  titleTemplate: `%s | ${CONFIG.TITLE}`,
  defaultTitle: CONFIG.TITLE,
  description: CONFIG.DESCRIPTION,
  url: CONFIG.URL,
  openGraph: {
    title: CONFIG.TITLE,
    description: CONFIG.DESCRIPTION,
    url: CONFIG.URL,
    images: [
      {
        url: CONFIG.URL + CONFIG.OG_IMAGE,
      },
    ],
    type: 'website',
    locale: CONFIG.LOCALE,
    site_name: CONFIG.TITLE,
  },
};
