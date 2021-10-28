import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  // Load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // Detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'de',
    debug: false,

    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },

    // Note down missing keys, later report them to a backend fn
    saveMissing: true,
    // eslint-disable-next-line no-console
    missingKeyHandler: (l, n, k) => console.log('Translation missing: ' + l + ':' + n + ':' + k),
    load: 'languageOnly',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
