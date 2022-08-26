/** Vuetify Plugin */
import type { UserVuetifyPreset } from 'vuetify';
import type { VuetifyParsedTheme } from 'vuetify/types/services/theme';
import Vuetify from 'vuetify/lib/framework';
import Vue from 'vue';

/*
// Locale
import i18n from './i18n';
import { en, ja } from 'vuetify/lib/locale';
*/

import '@mdi/font/css/materialdesignicons.css';
import { loadFonts } from './webfontloader';

loadFonts();

export default createVuetify({
  icons: {
    iconfont: 'mdi',
  },
  /*
  lang: {
    current: navigator.language,
    locales: { ja, en },
    t: (key, ...params) => i18n.t(key, params) as string,
  },
*/
  theme: {
    themes: {
      light: {
        primary: '#60c5cf',
        secondary: '#60c5cf',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        mainBar: '#D4D4D4',
        viewTitle: '#60c5cf',
        secondaryBarBackground: '#f1f1f1'
      },
    },
    options: {
      themeCache: {
        // https://vuetifyjs.com/features/theme/#section-30ad30e330c330b730e5
        get: (key: VuetifyParsedTheme) => {
          return localStorage.getItem(JSON.stringify(key));
        },
        set: (key: VuetifyParsedTheme, value: string) => {
          localStorage.setItem(JSON.stringify(key), value);
        },
      },
      customProperties: true,
    },
  },
});

/** Create Vuetify */
export function createVuetify(options: UserVuetifyPreset): Vuetify {
  Vue.use(Vuetify);
  return new Vuetify(options);
}
