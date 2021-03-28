import store from '@/store';
import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import { Profile } from '@/store/profile.model';

@Module({ dynamic: true, store, name: 'profile', namespaced: true })
class ProfileModule extends VuexModule {
  private profile: Profile | null = null;
}

export const profileStore = getModule(ProfileModule);
