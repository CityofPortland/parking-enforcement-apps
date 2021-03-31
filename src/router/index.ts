import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import PermitLookup from '@/pages/PermitLookup.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/permit-lookup' },
  { path: '/permit-lookup', component: PermitLookup }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
