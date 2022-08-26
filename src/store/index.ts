import type {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree,
  StoreOptions,
} from 'vuex';
import {createStore} from '@logue/vue2-helpers/vuex';
import VuexPersistence from 'vuex-persist';

// Modules
import ConfigModule from './ConfigModule';
import AuthModule from "@/store/AuthModule";

/** Root State Interface */
export interface RootState {
  loading: boolean;
  progress: number;
  message?: string;
  error?: string;
}

/** State Default value */
const state: RootState = {
  loading: false,
  progress: 0,
  message: undefined,
  error: undefined,
};

/** Getters */
const getters: GetterTree<RootState, RootState> = {
  loading: (s): boolean => s.loading,
  progress: (s): number => s.progress,
  message: (s): string | undefined => s.message,
  error: (s): string | undefined => s.error,
};

/** Mutations */
const mutations: MutationTree<RootState> = {
  storeLoading(s, display: boolean) {
    s.loading = display;
  },
  storeProgress(s, progress: number) {
    s.progress = progress;
    s.loading = true;
  },
  storeMessage(s, message: string) {
    s.message = message;
  },
  storeError(s, error: string) {
    s.error = error;
  },
};

/** Actions */
const actions: ActionTree<RootState, RootState> = {
  setLoading(context: ActionContext<RootState, RootState>, display: boolean = false) {
    context.commit('storeLoading', display);
  },
  setProgress(
    context: ActionContext<RootState, RootState>,
    progress: number = 0
  ) {
    context.commit('storeProgress', progress);
  },
  setMessage(context: ActionContext<RootState, RootState>, message?: string) {
    context.commit('storeMessage', message);
  },
  setError(context: ActionContext<RootState, RootState>, error) {
    context.commit('storeError', error);
  },
};

/** VuexStore */
const store: StoreOptions<RootState> = {
  // https://vuex.vuejs.org/guide/strict.html#development-vs-production
  strict: import.meta.env.DEV,
  state,
  getters,
  mutations,
  actions,
  modules: {
    ConfigModule,
    AuthModule,
  },
  plugins: [
    new VuexPersistence({
      key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuex',
      storage: window.localStorage,
      modules: ['ConfigModule'],
    }).plugin,
    /*
    // store as session storage
    new VuexPersistence({
      key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE,
      storage: window.sessionStorage,
      modules: ['SomeModule'],
    }).plugin,
    // store as Indexed DB (using vuex-persist-indexeddb)
    createPersistedState({
      key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE,
      paths: ['SomeLargeModule'],
    }),
    */
  ],
};

export default createStore(store);
