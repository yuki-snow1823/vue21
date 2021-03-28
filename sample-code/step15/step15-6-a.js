import Vue from 'vue';
import Vuex from 'vuex';
import { profileModule } from '@/store/profile/profile';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    profile: profileModule,
  },
});
