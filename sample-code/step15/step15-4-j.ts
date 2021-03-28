import store from '@/store';
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
} from 'vuex-module-decorators';
import { Profile } from '@/store/profile.model';

@Module({ dynamic: true, store, name: 'profile', namespaced: true })
class ProfileModule extends VuexModule {
  private profile: Profile | null = null;

  /**
   * プロフィールを取得します。
   */
  public get getProfile() {
    return this.profile;
  }

  /**
   * 新しいユーザー名を State に保存します。
   * @param userName ユーザー名
   */
  @Mutation
  private updateUserName(userName: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.profile!.userName = userName;
  }

  /**
   * 新しいニックネームを State に保存します。
   * @param nickname ニックネーム
   */
  @Mutation
  private updateNickname(nickname: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.profile!.nickname = nickname;
  }

  /**
   * 新しいテーマカラーを State に保存します。
   * @param userName テーマカラー
   */
  @Mutation
  private updateThemeColor(themeColor: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.profile!.themeColor = themeColor;
  }

  /**
   * プロフィールを State に保存します。
   */
  @Mutation
  private saveProfile(profile: Profile) {
    this.profile = profile;
  }

  /**
   * State からプロフィールをクリアします。
   */
  @Mutation
  private clearProfile() {
    this.profile = null;
  }
}

export const profileStore = getModule(ProfileModule);
