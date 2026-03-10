import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Disclaimer from '@/pages/Disclaimer.vue';
import PermitLookup from '@/pages/PermitLookup.vue';

const appName = 'Parking Services';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/permit-lookup' },
  { path: '/permit-lookup', component: PermitLookup, meta: { title: `Permit Lookup - ${appName}` } },
  { path: '/disclaimer', component: Disclaimer, meta: { title: `Legal Disclaimer - ${appName}` } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined;
  if (title) {
    document.title = title;
  }
});

export default router;
