/** Config store */
import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

import type { RootState } from '.';


export interface ConfigState {
  themeDark: boolean;
  locale: string;
}

const state: ConfigState = {
  themeDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  locale:
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language,
};

const getters: GetterTree<ConfigState, RootState> = {
  themeDark: (s): boolean => s.themeDark,
  locale: (s): string => s.locale,
};

const mutations: MutationTree<ConfigState> = {
  storeThemeDark(s) {
    s.themeDark = !s.themeDark;
  },
  storeLocale(s, locale: string) {
    s.locale = locale;
  },
};

const actions: ActionTree<ConfigState, RootState> = {
  setThemeDark(context: ActionContext<ConfigState, RootState>, mode: boolean) {
    context.commit('storeThemeDark', mode);
  },
  setLocale(context: ActionContext<ConfigState, RootState>, locale: string) {
    context.commit('storeLocale', locale);
  },
};

const ConfigModule: Module<ConfigState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default ConfigModule;
