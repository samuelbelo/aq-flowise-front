import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';
import type { RootState } from '.';

interface AuthState {
  isAuthenticated: boolean
  authToken: string | null
  refreshToken: string | null
  user: IUser | null
}

interface IUser {
  userId: string | null
  firstName: string | null
  lastName: string | null
  userName: string | null
  profilePicture: string | null
}{}

const state: AuthState = {
  isAuthenticated: false,
  authToken: null,
  refreshToken: null,
  user: null
}

const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (s) => s.isAuthenticated,
  authToken: (s) => s.authToken,
  refreshToken: (s) => s.refreshToken,
  user: (s) => s.user,
}

const mutations: MutationTree<AuthState> = {
  setAuthenticated: (s, payload) => {
    s.isAuthenticated = payload;
  },
  setAuthToken: (s, payload) => {
    s.authToken = payload;
    localStorage.setItem('flowise.session.authToken', payload);
  },
  setRefreshToken: (s, payload) => {
    s.refreshToken = payload;
    localStorage.setItem('flowise.session.refreshToken', payload);
  },
  setUser: (s, payload: IUser) => {
    s.user = payload;
  }
}

const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, payload) {
    commit('setAuthenticated', true);
    commit('setUser', payload);
  },
  async logout({ commit }) {
    commit('setAuthenticated', false);
    commit('setAuthToken', null);
    commit('setRefreshToken', null);
    commit('setUser', null);
  }
}

const AuthModule: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default AuthModule;
