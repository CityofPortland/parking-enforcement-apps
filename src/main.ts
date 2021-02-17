import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";
import store from "./store";

createApp(App)
  .use(store)
  .mount("#app");
