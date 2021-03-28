import store from '@/store';
import { Module, VuexModule, getModule } from 'vuex-module-decorators';

@Module({ dynamic: true, store, name: 'profile', namespaced: true })
class ProfileModule extends VuexModule {}

export const profileStore = getModule(ProfileModule);
