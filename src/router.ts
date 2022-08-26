/** Vue Router Configure */
import { nextTick } from 'vue';
import type {NavigationGuardNext, Route, RouteRecord} from 'vue-router';
import type { Position, PositionResult } from 'vue-router/types/router';
import {
  createRouter,
  type Router,
  type RouteRecordRaw,
} from '@logue/vue2-helpers/vue-router';

import type { VuetifyGoToTarget } from 'vuetify/types/services/goto';
import goTo from 'vuetify/lib/services/goto';
import store from '@/store';

/** Router Config */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      guest: true,
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/administration',
    name: 'Administration',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Administration/Administration.vue'),
  },
  {
    path: '/events',
    name: 'Events',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Events/Events.vue'),
  },
  {
    path: '/areas',
    name: 'Areas',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Areas/Areas.vue'),
  },
  {
    path: '/meters',
    name: 'Meters',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Meters/Meters.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Reports/Reports.vue'),
  },
  {
    path: '/water-balance',
    name: 'Water Balance',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/WaterBalance/WaterBalance.vue'),
  },
  {
    path: '/administration',
    name: 'Administration',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Administration/Administration.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Settings/Settings.vue'),
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('@/views/ErrorPage.vue'),
  }
];

const router: Router = createRouter({
  base: import.meta.env.BASE_URL,
  mode: 'history', // abstract, hash, history
  scrollBehavior: async (
    to: Route,
    _from: Route,
    savedPosition: void | Position
  ): Promise<PositionResult> => {
    // https://vuetifyjs.com/features/scrolling/#router3067306e4f7f7528
    let scrollTo: VuetifyGoToTarget = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return { x: 0, y: await goTo(scrollTo) };
  },
  routes,
});

router.beforeEach(
  async (_to: Route, _from: Route, next: NavigationGuardNext<Vue>) => {
    if(_to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
      if(store.getters['AuthModule/isAuthenticated']){
        next()
        store.dispatch('setLoading', false);
        return
      }
      next('/login')
    } else {
      next()
    }
    await nextTick();

    // @see https://github.com/championswimmer/vuex-persist#how-to-know-when-async-store-has-been-replaced
    // await store.restored;

    next();
  }

);
router.beforeEach((to:Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.matched.some((record: RouteRecord) => record.meta.guest)) {
    if (store.getters['AuthModule/isAuthenticated']) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});


router.afterEach(() => {
  // Hide Loading
});

export default router;
