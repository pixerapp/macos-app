'use strict';

import i18n from 'i18next';

const LANG = 'en';

export default i18n.init({
  whitelist: [LANG],
  fallbackLng: LANG,

  // have a common namespace used around the full app
  ns: 'app',
  defaultNS: 'app',

  debug: process.env.NODE_ENV !== 'production',

  interpolation: {
    escapeValue: false // not needed for react!!
  },

  preload: [LANG]
});
