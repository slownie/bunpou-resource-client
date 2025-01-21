import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("user", JSON.stringify(state.User));
  },
  { deep: true }
);

app.mount("#app");
