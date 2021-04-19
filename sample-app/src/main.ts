import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 追加
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
