import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  legacy: false
});

createApp(App)
  .use(i18n)
  .use(router)
  .use(store)
  .mount('#app');
